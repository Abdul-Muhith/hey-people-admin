import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getColors = async () => {
  const response = await axios.get(`${base_url}/color`);

  return response.data;
};

// TODO: first time of class 09

const createColor = async (color) => {
  const response = await axios.post(`${base_url}/color/`, color, config);

  return response.data;
};

// TODO: following brandService -> deleteBrand

const getSingleColor = async (id) => {
  const response = await axios.get(`${base_url}/color/${id}`, config);

  return response.data;
};

// TODO: following brandService -> deleteBrand

const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}/color/${id}`, config);

  return response.data;
};

// TODO: following brandService -> updateBrand

const updateColor = async (color) => {
  const response = await axios.put(`${base_url}/color/${color.id}`, {title: color.colorData.title}, config);

  return response.data;
};

const colorService = {
  getColors,
  createColor,
  getSingleColor,
  deleteColor,
  updateColor,
};

export default colorService;