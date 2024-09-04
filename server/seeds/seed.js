const db = require('../config/connection');
const { Tech } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');

db.once('open', async () => {
  await cleanDB('User', 'users');

  await User.insertMany(userData);

  console.log('Technologies seeded!');
  process.exit(0);
});
