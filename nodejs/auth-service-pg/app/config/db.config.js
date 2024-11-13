module.exports = {
  // Read from environment variables
  HOST: process.env.DB_HOST || "localhost",
  PORT: process.env.DB_PORT || 5432,
  USER: process.env.DB_USER || "user01",
  PASSWORD: process.env.DB_PASSWORD || "password01",
  DB: "hellodb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
