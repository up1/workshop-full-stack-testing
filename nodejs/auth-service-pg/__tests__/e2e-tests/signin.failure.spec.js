const request = require("supertest");
const app = require("../../app");

test("Failure with user02 not found :: return 404", async () => {
  // Arrange
  const server = request.agent(app);

  // Act
  const response = await server.post("/api/auth/signin").send({
    username: "user02",
    password: "password01",
  });

  // Assert
  expect(response.status).toEqual(404);
  expect(response.body.message).toEqual("User Not found.");
});

test("Failure with invalid password :: return 401", async () => {
  // Arrange
  const server = request.agent(app);

  // Act
  const response = await server.post("/api/auth/signin").send({
    username: "user01",
    password: "invalid-password",
  });

  // Assert
  expect(response.status).toEqual(401);
  expect(response.body.message).toEqual("Invalid Password!");
});

test("Failure with invalid body request :: return 500", async () => {
  // Arrange
  const server = request.agent(app);

  // Act
  const response = await server.post("/api/auth/signin").send({});

  // Assert
  expect(response.status).toEqual(500);
  expect(response.body).toHaveProperty("message");
});
