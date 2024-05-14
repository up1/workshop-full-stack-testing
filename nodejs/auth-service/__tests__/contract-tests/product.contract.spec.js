const productGateway = require("../../app/gateways/product.gateway");
const path = require("path");
const {
  PactV3,
  MatchersV3,
  SpecificationVersion,
} = require("@pact-foundation/pact");
const { like, eachLike } = MatchersV3;

const provider = new PactV3({
  consumer: "auth-service",
  provider: "product-service",
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  logLevel: "warn",
  dir: path.resolve(process.cwd(), "pacts"),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
});

test("Success to get all products", async () => {
  // set up Pact interactions
  await provider.addInteraction({
    states: [{ description: "Valid JWT token" }],
    uponReceiving: "Get all products",
    withRequest: {
      method: "GET",
      path: "/api/products",
    },
    willRespondWith: {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        blogCount: like(2),
        body: eachLike({
          id: like(1),
          title: like("Mock Blog 1"),
          description: like("Description of blog 1"),
          tags: eachLike("tag 1"),
          username: like("Somkiat Pui"),
          createdDate: like("2024/05/02"),
          favoritesCount: like(100),
        }),
      },
    },
  });

  await provider.executeTest(async (mockService) => {
    const products = await productGateway.callGetAllProducts(
      mockService.url,
      "mock token"
    );
    expect(products.blogCount).toEqual(2);
    // Check json schema
    expect(products.body[0]).toEqual({
      id: expect.any(Number),
      title: expect.any(String),
      description: expect.any(String),
      tags: expect.any(Array),
      username: expect.any(String),
      createdDate: expect.any(String),
      favoritesCount: expect.any(Number),
    });
  });
});
