import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getBrands = async () => {
  const response = await axios.get(`${base_url}/brand/`);

  return response.data;
};

// TODO: first time of class 09

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}/brand/`, brand, config);

  return response.data;
};

// TODO: class 11

const getSingleBrand = async (id) => {
  const response = await axios.get(`${base_url}/brand/${id}`, config);

  return response.data;
};

// TODO: class 12

const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}/brand/${id}`, config);

  return response.data;
};

// TODO: class 11

const updateBrand = async (brand) => {
  const response = await axios.put(`${base_url}/brand/${brand.id}`, {title: brand.brandData.title}, config);

  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getSingleBrand,
  deleteBrand,
  updateBrand,
};

export default brandService;