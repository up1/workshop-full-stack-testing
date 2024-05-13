const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");
const config = require("../../app/config/auth.config");

// Arrange :: Stub user repository
const userRepository = require("../../app/repositories/user.repository");

const bcrypt = require("bcrypt");
const mockPassword = bcrypt.hashSync("password01", 8);

// Mock the module
jest.mock("../../app/repositories/user.repository");
const mockUser = { 
  id: 1, 
  username: "mockuser01", 
  password: mockPassword,
  getRoles: jest.fn().mockResolvedValue([{ name: 'user' }]) };
userRepository.getUserByUsername.mockResolvedValue(mockUser);

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
  expect(response.status).toEqual(200);
  expect(response.body.username).toEqual("mockuser01");
  expect(response.body).toHaveProperty("accessToken");

  // Verify the token
  const decoded = jwt.verify(response.body.accessToken, config.secret);
  expect(decoded.id).toEqual(mockUser.id);
});
