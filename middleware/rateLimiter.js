const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, try again later",
});

module.exports = limiter;
