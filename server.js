const express = require('express');
const birdCall = require('./lib/birdApi');
const db = require('./lib/psql');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const { eBird, sciName, coords } = require('./utils/utils');


const PORT = process.env.PORT;
const app = express();

app.use((req, res, next) => {
  console.log(`serving ${req.method} request for uri: ${req.url}`);
  if (req.body) {
    console.log(req.body);
  }
  next();
});

app.listen(PORT || 8080, () => {
  console.log(`Listening at ${PORT}`);
});

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'it\'s a secret man',
  resave: false,
}));


app.post('/login', (req, res) => {
  console.log(req.session);
  db.getUser(req.body.username)
  .then((data) => {
    if (data.length) {
      console.log(data);

      // const salt = data[0].salt;
      // const servPassHash = data[0].password;
      // const sentPassHash = bcrypt.hashSync(req.body.password, salt);
      if (bcrypt.compareSync(req.body.password, data[0].password)) {
        req.session.regenerate(() => {
          req.session.user = req.body.username;
          res.writeHead(200);
          res.end();
        });
      } else {
        res.writeHead(401);
        res.end();
      }
    } else {
      res.writeHead(401);
      res.end();
    }
  })
  .catch(err => console.log(err));
});

app.post('/signup', (req, res) => {
  db.getUser(req.body.username)
  .then((data) => {
    if (data.length === 0) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(req.body.password, salt);
      db.createUser(req.body.username, hashedPass)
      .then(() => {
        req.session.regenerate(() => {
          req.session.user = req.body.username;
          res.writeHead(200);
          res.end();
        });
      });
    } else {
      res.writeHead(401);
      res.write('user exists');
      res.end();
    }
  })
  .catch(err => console.log(err));
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('hit');
    res.writeHead(200);
    res.write('loggedout');
    res.end();
  });
});
/**
 * so when a bird is added a lot of things have to happen in particular order
 * first we need to add the bird to the bird db and store the common name and scientific name
 * then we need to store where this particular bird was seen
 * so we need to add this lat and long to our location database
 * once we make sure we have the location stored we can then grab its id
 * and we then grab the bird id. with these we can then update the most recent sighting information
 * since this was given to us by a user we need to then store the users id and loc id in their
 * join table. after that we can then update our user's checklist or add to it
 */

 /*
 `{
    "birdCommon": "test-bird",
    "birdScience": "testus-birdus",
    "user": "test",
    "flockSize": 20,
    "location": {
        "lat": 30.000001,
        "lng": -90.095701
    }
}
 */
app.post('/birds', (req, res) => {
  console.log(req.body);
  const userBird = {};
  userBird.birdCommon = req.body.birdType;
  sciName(req.body.birdType, (err, response, body) => {
    if (err) {
      console.error(err);
    } const result = JSON.parse(body);
    const { gen, sp } = result.recordings[0];
    userBird.birdScience = `${gen} ${sp}`;
    coords(req.body.location, (error, resp, bod) => {
      if (err) {
        console.error(err);
      } const q = JSON.parse(bod);
      const { location } = q.results[0].geometry;
      userBird.location = location;
      console.log(userBird);
    });
  });

  const user = req.session.user || 'test';
  let userLocId;
  let birdId;
  let locId;

  // db.getUser(user)
  // .then((data) => {
  //   console.log('this is data', data);
  //   const userId = data[0].id;
  //   db.createBird(req.body.birdCommon, req.body.birdScience)
  //   .then(() => {
  //     db.storeLocation(req.body.location)
  //     .then(() => {
  //       db.getLocId(req.body.location)
  //       .then((location) => {
  //         console.log(location, ' line 112');
  //         locId = location[0].id;
  //         db.getBirdId(req.body.birdScience)
  //         .then((birdInfo) => {
  //           console.log(birdInfo, ' line 116');
  //           birdId = birdInfo[0].id;
  //           db.getSightings(birdId, locId)
  //           .then((sightingArray) => {
  //             console.log(sightingArray, ' line 120');
  //             if (sightingArray.length > 0) {
  //               db.updateSightings(birdId, locId);
  //             }
  //             db.addToUserLocations(userId, locId)
  //             .then(() => {
  //               db.getUserLocId(userId, locId)
  //               .then((userLocArr) => {
  //                 console.log(userLocArr, ' line 128');
  //                 userLocId = userLocArr[0].id;
  //                 db.addToChecklist(birdId, userLocId, req.body.lastSeen, req.body.flockSize);
  //                 db.updateLastSeenAndFlock(birdId, userLocId, req.body.lastSeen, req.body.flockSize);
  //                 res.writeHead(200);
  //                 res.write('bird added!');
  //                 res.end();
  //               });
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });

  res.end();
});

app.post('/map', (req, res) => {
  const latLng = req.body;
  const obj = latLng;
  const birdCatcher = (data) => {
    res.writeHead(200, { contentType: 'application/json' });
    res.write(data);
    res.end();
  };

  birdCall.call(obj, birdCatcher);
});

// get users most recent birds logged in db
app.get('/birds', (req, res) => {
  // db.getBirdsInDb()
  // .then((data) => {
  //   res.writeHead(200);
  //   res.write(JSON.stringify(data));
  //   res.end();
  // }).catch((err) => {
  //   console.error(err);
  // });
});

app.get('/profile', (req, res) => {

  db.getUser(req.session.user)
  .then((data) => {
    const id = data[0].id;
    db.getBirdsByUser(id)
    .then((info) => {
      res.writeHead(200);
      res.write(JSON.stringify(info));
      res.end();
    });
  });
});
/*
set route for get request from client to retreive markers of local siting
*/
app.get('/eBird', (req, res)=> {
  eBird((err, result, body) => {
    if (err) {
      console.error(err);
    } res.send(body);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
