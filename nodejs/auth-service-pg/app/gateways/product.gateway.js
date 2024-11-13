const axios = require('axios').default;

const callGetAllProducts = (api_server_url, token) => {
  const instance = axios.create({
    baseURL: `${api_server_url}`,
    timeout: 1000,
    headers: {
      "x-access-token": token,
    },
  });
  return instance
    .get(`/api/products`)
    .then((res) => res.data)
    .catch((e) => {
      return { message: "Product not found" };
    });
};

const callHome = (api_server_url) => {
  const instance = axios.create({
    baseURL: `${api_server_url}`,
    timeout: 1000
  });
  return instance
    .get(`/`)
    .then((res) => res.data)
    .catch((e) => {
      return { message: "Error" };
    });
};

module.exports = {
  callGetAllProducts,
  callHome
};
