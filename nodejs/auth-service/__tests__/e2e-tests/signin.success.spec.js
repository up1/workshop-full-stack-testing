const request = require("supertest");
const app = require("../../app");

test("Success response with jwttoken", async () => {
  // Arrange
  const server = request.agent(app);

  // Act
  const response = await server.post("/api/auth/signin").send({
    username: "user01",
    password: "password01",
  });

  // Assert
  expect(response.status).toEqual(200);
  expect(response.body.username).toEqual("user01");
  expect(response.body).toHaveProperty("accessToken");
  // check response.body.accessToken is not null
  expect(response.body.accessToken).toBeTruthy();
  // check response.body.accessToken is jwt format
  expect(response.body.accessToken.split(".").length).toEqual(3);
});
