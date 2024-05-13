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
  // check format of response.body with jsonschema
  const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
      username: {
        type: "string",
        pattern: "^[a-zA-Z0-9]*$",
      },
      email: {
        type: "string",
        format: "email",
      },
      roles: {
        type: "array",
        items: {
          type: "string",
        },
      },
      accessToken: {
        type: "string",
        pattern: "^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_.+/=]*$",
      },
    },
    required: ["id", "username", "email", "roles", "accessToken"],
  };
  const Validator = require("jsonschema").Validator;
  const v = new Validator();
  const result = v.validate(response.body, schema);
  expect(result.valid).toBeTruthy();
});
