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

  // get list of birds from the DB, indicating max number
  getBirdsInDb: () =>
    db.any('SELECT * FROM birds'),

  // get birds by a particular user
  getBirdsByUser: username =>
    db.any('SELECT * FROM birds WHERE id = (SELECT id_bird FROM birds_users_locs WHERE id_user_loc = (SELECT id FROM users_locations WHERE id_users = (SELECT id FROM users where username = $1)))', [username]),

  // adds a bird to the bird database
  createBird: (birdCommon, birdScience) =>
    db.any('INSERT INTO birds (common_name, scientific_name) VALUES ($1, $2)', [birdCommon, birdScience]),

};
