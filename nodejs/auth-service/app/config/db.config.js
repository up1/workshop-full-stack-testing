module.exports = {
  // Read from environment variables
  HOST:  process.env.DB_HOST || "localhost",
  USER: "user01",
  PASSWORD: "password01",
  DB: "hellodb",
  // dialect: "mysql",
  dialect: "sqlite",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
