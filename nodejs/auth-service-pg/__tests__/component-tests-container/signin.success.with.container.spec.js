const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");
const config = require("../../app/config/auth.config");
const bcrypt = require("bcrypt");
const mockPassword = bcrypt.hashSync("password01", 8);

// // Mock the module
// jest.mock("../../app/repositories/user.repository");
// const mockUser = { 
//   id: 1, 
//   username: "mockuser01", 
//   password: mockPassword,
//   getRoles: jest.fn().mockResolvedValue([{ name: 'user' }]) };
// userRepository.getUserByUsername.mockResolvedValue(mockUser);

// Arrange :: Create Postgres container
const { GenericContainer, Wait } = require("testcontainers");

let container;

beforeAll(async () => {
  container = await new GenericContainer('postgres')
    .withEnvironment({ POSTGRES_USER: 'user01' })
    .withEnvironment({ POSTGRES_PASSWORD: 'password01' })
    .withEnvironment({ POSTGRES_DB: 'hellodb' })
    .withCopyFilesToContainer([{
      source: "./__tests__/component-tests-container/db/tables.sql",
      target: "/docker-entrypoint-initdb.d/1.sql"
    }])
    .withCopyFilesToContainer([{
      source: "./__tests__/component-tests-container/db/data.sql",
      target: "/docker-entrypoint-initdb.d/2.sql"
    }])
    .withExposedPorts({
      container: 5432,
      host: 5432,
    })
    .withWaitStrategy(Wait.forListeningPorts())
    .start();

  process.env.DB_PORT = container.getMappedPort(5432);
});

afterAll(async () => {
  await container.stop();
});

test("Success to signin with test container", async () => {
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
