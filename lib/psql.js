const Promise = require('bluebird');
const passport = require('passport');

const connectionString = process.env.PSQL;
const pgp = require('pg-promise')();

const cn = {
    host: 'pellefant.db.elephantsql.com', // server name or IP address;
    port: 5432,
    database: 'vtzaozly',
    user: 'vtzaozly',
    password: 'TrdAjdoi_Esmw5iojs7Z-WfPK0lZM0n9'
};

const db = pgp(cn);

// export an object with query functions, promisified
module.exports = {
  // get user by username
  getUser: (username) => 
    db.any('SELECT * FROM users WHERE username = $1', [username]),

  // create user
  createUser: (user, password, salt) =>
    db.any('INSERT INTO users (username, password, salt) VALUES ($1, $2, $3)', [user, password, salt]),

  // get list of birds from the DB, indicating max number
  getBirdsInDb: (max) =>
    db.any('SELECT b.id, b.bird, b.location, u.username, b.created FROM birds b INNER JOIN users u ON (u.id = b.user_id) ORDER BY created DESC LIMIT $1', [max]),
  
  //get birds by a particular user
  getBirdsByUser: (userId) =>
    db.any('SELECT * FROM birds where user_id = $1', [userId]),

  // insert new bird into DB, must have bird, user_id, lat, lng
  createBird: (bird, location, userId) =>
    db.any('INSERT INTO birds (bird, location, user_id) VALUES ($1, $2, $3)', [bird, location, userId])

};
