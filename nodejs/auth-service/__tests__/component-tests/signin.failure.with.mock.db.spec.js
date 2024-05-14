const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");
const config = require("../../app/config/auth.config");

// Arrange :: Stub user repository
const userRepository = require("../../app/repositories/user.repository");
// Mock the module
jest.mock("../../app/repositories/user.repository");
// Mock with error
userRepository.getUserByUsername.mockRejectedValue(new Error("Database Error"));

test("Success response with jwttoken + Mock database with Jest Mock", async () => {
  // Arrange :: Start server
  const server = request.agent(app);

  // Act
  const response = await server.post("/api/auth/signin").send({
    username: "mockuser01",
    password: "password01",
  });

  // Assert
  expect(userRepository.getUserByUsername).toHaveBeenCalled();

  console.log(response.body);
  expect(response.status).toEqual(500);
  expect(response.body).toHaveProperty("message");
  expect(response.body.message).toEqual("Database Error");
});
