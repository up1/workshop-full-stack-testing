const bcrypt = require("bcrypt");
const db = require("./app/models");
const Role = db.role;
const User = db.user;

const initDB = async () => {
  try {
    await db.sequelize.sync();
    initialDataForTest();
    console.log("Synced db.");
  } catch (err) {
    console.log("Failed to sync db: " + err.message);
  }
};

const initialDataForTest = () => {
  // Roles
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
  // Users and role = user
  const u1 = User.create({
    id: 1,
    username: "user01",
    email: "user01@gmail.com",
    password: bcrypt.hashSync("password01", 8),
  });

  u1.then((user) => {
    user.setRoles([1]);
  });
};

module.exports = initDB;
