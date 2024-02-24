import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}/product-category/`);

  return response.data;
};

// TODO: first time of class 09

const createProductCategory = async (productCategory) => {
  const response = await axios.post(`${base_url}/product-category/`, productCategory, config);

  return response.data;
};

// TODO: class 13

const getSingleProductCategory = async (id) => {
  const response = await axios.get(`${base_url}/product-category/${id}`, config);

  return response.data;
};

// TODO: class 13

const deleteProductCategory= async (id) => {
  const response = await axios.delete(`${base_url}/product-category/${id}`, config);

  return response.data;
};

// TODO: class 13

const updateProductCategory = async (productCategory) => {
  const response = await axios.put(`${base_url}/product-category/${productCategory.id}`, {title: productCategory.productCategoryData.title}, config);

  return response.data;
};

const productCategoryService = {
  getProductCategories,
  createProductCategory,
  getSingleProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default productCategoryService;