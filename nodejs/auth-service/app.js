const express = require("express");
const cors = require("cors");

const app = express();
module.exports = app;

const bcrypt = require("bcrypt");
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const UserRoles = db.user_roles;

// Generate openapi
const expressOasGenerator = require("express-oas-generator");
expressOasGenerator.init(app, {});

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    initial();
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to workshop." });
});

require("./app/routes/auth.routes")(app);

function initial() {
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
}
