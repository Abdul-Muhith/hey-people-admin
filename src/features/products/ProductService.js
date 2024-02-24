import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getProducts = async () => {
  const response = await axios.get(`${base_url}/product/all-products`);

  return response.data;
};

// TODO: last time of class 08

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}/product/`, product, config);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;