exports.getAllProducts = (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: "product 1",
      description: "product 1 description",
      price: 100,
    },
    {
      id: 2,
      name: "product 2",
      description: "product 2 description",
      price: 200,
    },
    {
      id: 3,
      name: "product 3",
      description: "product 3 description",
      price: 300,
    },
  ]);

};