import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getAllOrders = async () => {
  const response = await axios.get(`${base_url}/user/all-orders`, config);

  return response.data;
};

// TODO: CLASS 17

const getSingleUserOrders = async (id) => {
  // TODO: he did this work with POST route but I did with POST & GET both in
  // const response = await axios.post(`${base_url}/user/single-user-orders/${id}`, "", config);
  const response = await axios.get(`${base_url}/user/single-user-orders/${id}`, config);
// console.log('Orders called', response.data);
  return response.data;
};

// TODO: CLASS 18

const getMonthlyUserOrders = async () => {
  const response = await axios.get(`${base_url}/user/month-wise-orders`, config);
// console.log('Orders called', response.data);
  return response.data;
};

const getYearlyUserOrders = async () => {
  const response = await axios.get(`${base_url}/user/yearly-orders`, config);
// console.log('Orders called', response.data);
  return response.data;
};

const updateSingleOrderStatusByOrderId = async (data) => {
  // TODO: he did this work with POST route but I did with POST & GET both in
  // const response = await axios.put(`${base_url}/user/order/update-order-status/${data.id}`, data, config);
  const response = await axios.put(`${base_url}/user/order/update-order-status/${data.id}`, {status: data.status}, config);
  // console.log('Orders updated', data);
  return response.data;
};

// TODO: CLASS 18 i build this for my viewOrder.js

const getSingleOrderByOrderId = async (id) => {
  const response = await axios.get(`${base_url}/user/single-order/${id}`, config);
  return response.data;
};

const orderService = {
  getAllOrders,
  getSingleUserOrders,
  getMonthlyUserOrders,
  getYearlyUserOrders,
  getSingleOrderByOrderId,
  updateSingleOrderStatusByOrderId,
};

export default orderService;

// TODO: move to auth/AuthService.js