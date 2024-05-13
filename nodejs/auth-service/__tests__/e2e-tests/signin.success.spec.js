const request = require("supertest");
const app = require("../../app");

test("Success response with jwttoken", async () => {
  // Arrange
  const server = request.agent(app);
  
  // require("../../initial")();
  // await new Promise((r) => setTimeout(r, 1000));

  // Act
  const response = await server.post("/api/auth/signin").send({
    username: "user01",
    password: "password01",
  });

  // Assert
  expect(response.status).toEqual(200);
  expect(response.body.username).toEqual("user01");
  expect(response.body).toHaveProperty("accessToken");
});
