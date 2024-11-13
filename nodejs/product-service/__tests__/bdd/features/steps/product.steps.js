const { When, Then } = require("cucumber");
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../../../app");

let response;

When("we request the products list", async () => {
  // Send request to the API
  const server = request.agent(app);
  response = await server
    .get("/api/products")
    .send()
    .set("x-access-token", process.env.ACCESS_TOKEN);
});

Then("we should receive", async (dataTable) => {
  expect(response.status).eq(200);
  expect(response.body.length).eq(3);
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
  expect(result.valid).to.be.true;
  // Check data from expected data table
  const expectedData = dataTable.hashes();
  for (let i = 0; i < expectedData.length; i++) {
    const expected = expectedData[i];
    const actual = response.body[i];
    expect(actual.name).eq(expected.name);
    expect(actual.description).eq(expected.description);
    expect(actual.price).eq(parseFloat(expected.price));
  }
});
