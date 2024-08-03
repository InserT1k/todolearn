require('dotenv').config();
const cors = require('cors');

const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
