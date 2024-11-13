const request = require("supertest");
const app = require("../../app");

test("Success to get all products", async () => {
  // Arrange
  const server = request.agent(app);

  // Act
  const response = await server
    .get("/api/products")
    .send()
    .set(
      "x-access-token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE1NjEzOTAwLCJleHAiOjE3MTU3MDAzMDB9.p7OdirwZniwpFmNYy2F8xOQyjW3D50QxEDiblIUg6Dk"
    );

  // Assert
  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(3);
  // check format of response.body with jsonschema
  const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
      },
      required: ["id", "name", "description", "price"],
    },
  };
  const Validator = require("jsonschema").Validator;
  const v = new Validator();
  const result = v.validate(response.body, schema);
  expect(result.valid).toBeTruthy();
});
