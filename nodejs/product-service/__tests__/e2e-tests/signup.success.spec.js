const request = require("supertest");
const app = require("../../app");

test("Signup success", async () => {
  // Arrange
  const server = request.agent(app);

  // Act
  const response = await server.post("/api/auth/signup").send({
    username: "user02",
    password: "password02",
    email: "demo2@gmail.com",
    roles: ["user"],
  });

  // Assert
  expect(response.status).toEqual(200);
  expect(response.body.message).toEqual("User registered successfully!");
});
