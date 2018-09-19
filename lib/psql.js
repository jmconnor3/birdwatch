// const Promise = require('bluebird');
// const passport = require('passport');

// const connectionString = process.env.PSQL;
const pgp = require('pg-promise')();

const cn = {
  host: 'localhost', // server name or IP address;
  port: 5432,
  database: 'alexsfamurri',
  // user: 'vtzaozly',
  // password: 'TrdAjdoi_Esmw5iojs7Z-WfPK0lZM0n9',
};
const db = pgp(cn);

// export an object with query functions, promisified
module.exports = {
  // get user by username
  getUser: username =>
    db.any('SELECT * FROM users WHERE username = $1', [username]),

  // create user
  createUser: (user, password) =>
    db.any('INSERT INTO users (username, password) VALUES ($1, $2)', [user, password]),

  // get list of birds from the DB
  getBirdsInDb: () =>
    db.any('SELECT * FROM birds'),

  // need to get the three main tables id's
  getBirdId: (birdScience) =>
    db.any('SELECT id FROM birds WHERE scientific_name = $1', [birdScience]),
  getUserId: (username) =>
    db.any('SELECT id FROM users WHERE username = $1', [username]),
  getLocId: ({ lat, lng }) =>
    db.any('SELECT id FROM locations WHERE lat = $1 AND lng = $2', [lat, lng]),
  // get birds by a particular user
  getBirdsByUser: username =>
    db.any('SELECT * FROM birds WHERE id = (SELECT id_bird FROM birds_users_locs WHERE id_user_loc = (SELECT id FROM users_locations WHERE id_users = (SELECT id FROM users where username = $1)))', [username]),

  // adds a bird to the bird database
  createBird: (birdCommon, birdScience) =>
    db.any('INSERT INTO birds (common_name, scientific_name) VALUES ($1, $2)', [birdCommon, birdScience]),

  // gets one bird by scienceName
  getOneBird: birdScience =>
    db.any('SELECT * FROM birds WHERE scientific_name = $1', [birdScience]),

  // stores a lat and lng location
  storeLocation: ({ lat, lng }) =>
    db.any('INSERT INTO locations (lat, lng) VALUES ($1, $2)', [lat, lng]),

  // adds a bird sighting to the global checklist. checklist is a birding term
  addToChecklist: (birdId, userID, locId, lastSeen, flockSize) =>
    db.any(),

};
