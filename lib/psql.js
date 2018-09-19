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
  getBirdId: birdScience =>
    db.any('SELECT id FROM birds WHERE scientific_name = $1', [birdScience]),
  getUserId: username =>
    db.any('SELECT id FROM users WHERE username = $1', [username]),
  getLocId: ({ lat, lng }) =>
    db.any('SELECT id FROM locations WHERE lat = $1 AND lng = $2', [lat, lng]),
  getUserLocId: (userId, locId) =>
    db.any('SELECT id FROM users_locations WHERE id_locations = $2 AND id_users = $1', [userId, locId]),
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

  // insert into the joined tables which includes the birds_location thats
  // helps with figuring rarity by keeping firstSeen
  storeFirstSeen: (birdId, locId, firstSeen, rarity) =>
    db.any('INERT INTO birds_location (id_loc, id_bird, first_seen, rarity, sightings) VALUES ($1, $2, $3, $4, $5)', [locId, birdId, firstSeen, rarity, 1]),

  // need to maintain the joined tables
  addToUserLocations: (userId, locId) =>
    db.any('INSERT INTO users_locations (id_locations, id_users) VALUES ($1, $2)', [userId, locId]),

  // adds a bird sighting to the global checklist. checklist is a birding term
  addToChecklist: (birdId, userLocID, lastSeen, flockSize) =>
    db.any('INSERT INTO birds_users_locs (id_bird, id_user_loc, last_seen, recent_group_size) VALUES ($1, $2, $3, $4), ', [birdId, userLocID, lastSeen, flockSize]),

  // need to update the number of sightings
  updateSightings: (birdId, locId) =>
    db.any('UPDATE birds_location SET sightings = sightings + 1 WHERE id_loc = $1 AND id_bird = $2', [locId, birdId]),

  // grab the first seen so as to be used to determine rarity
  getFirstSeen: (birdScience, { lat, lng }) =>
    db.any('SELECT first_seen FROM birds_location WHERE id_bird = (SELECT id FROM birds WHERE scientific_name = $1) AND id_loc = (SELECT id FROM locations WHERE lat = $2 AND lng = $3)', [birdScience, lat, lng]),

  // grab the sightings
  getSightings: (birdId, locId) =>
    db.any('SELECT sightings FROM birds_location WHERE id_loc = $1 AND id_bird = $2', [locId, birdId]),

  // update the last time was seen and the flock size
  updateLastSeenAndFlock: (birdId, userLocID, lastSeen, flockSize) =>
    db.any('UPDATE birds_users_locs SET last_seen = $3, recent_group_size = $4 WHERE id_bird = $1 AND id_user_loc = $2', [birdId, userLocID, lastSeen, flockSize]),

};
