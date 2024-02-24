import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}/blog-category/`);

  return response.data;
};

// TODO: first time of class 09

const createBlogCategory = async (blogCategory) => {
  const response = await axios.post(`${base_url}/blog-category/`, blogCategory, config);

  return response.data;
};

// TODO: class 15

const getSingleBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}/blog-category/${id}`, config);

  return response.data;
};

// TODO: class 15

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${base_url}/blog-category/${id}`, config);

  return response.data;
};

// TODO: class 15

const updateBlogCategory = async (blogCategory) => {
  const response = await axios.put(`${base_url}/blog-category/${blogCategory.id}`, {title: blogCategory.blogCategoryData.title}, config);

  return response.data;
};

const blogCategoryService = {
  getBlogCategories,
  createBlogCategory,
  getSingleBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
};

export default blogCategoryService;