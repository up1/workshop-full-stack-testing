const db = require("../models");
const User = db.user;

const getUserByUsername = (username) => {
  return User.findOne({
    where: {
      username: username,
    },
  });
};

module.exports = {
  getUserByUsername,
};