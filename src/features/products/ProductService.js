import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';
import { removeTag } from '../../utils/removeTags';

const getProducts = async () => {
  const response = await axios.get(`${base_url}/product/all-products`);

  return response.data;
};

// TODO: last time of class 08

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}/product/`, product, config);

  return response.data;
};

// TODO: following updateBlogService I IMPLEMENTED THIS FEATURE

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}/product/${id}`, config);

  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(`${base_url}/product/${product.id}`, {
    title: product.productData.title,
    description: removeTag(product.productData.description),
    price: product.productData.price,
    category: product.productData.category,
    brand: product.productData.brand,
    quantity: product.productData.quantity,
    color: product.productData.color,
    tags: product.productData.tags,
  }, config);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
};

export default productService;