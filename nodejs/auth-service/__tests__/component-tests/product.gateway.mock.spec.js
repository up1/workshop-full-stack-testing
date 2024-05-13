const nock = require("nock");
const { callGetAllProducts } = require("../../app/gateways/product.gateway");

test("Success to call /api/products from product-service", async () => {
  // Arrange
  const mockData = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ];
  const api_server_url = "http://api.example.com";
  const token = "test-token";

  // Mocking the API
  nock(api_server_url).get("/api/products").reply(200, mockData);

  // Act
  const result = await callGetAllProducts(api_server_url, token);

  // Assert
  expect(result).toEqual(mockData);
});

test("Error to call /api/products from product-service", async () => {
  // Arrange
  const api_server_url = "http://api.example.com";
  const token = "test-token";

  const expectedResult = { message: "Product not found" };

  // Mocking the API
  nock(api_server_url).get("/api/products").reply(500);

  // Act
  const result = await callGetAllProducts(api_server_url, token);

  // Assert
  expect(result).toEqual(expectedResult);
});
