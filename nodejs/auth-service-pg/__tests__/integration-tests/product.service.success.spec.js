const { callHome } = require("../../app/gateways/product.gateway");

test("Success to call /api/products from product-service", async () => {
  // Arrange
  const product_url = "http://localhost:3002";

  // Act
  const result = await callHome(product_url);

  // Assert
  expect(result).toEqual({ message: "Welcome to product service."});
});
