import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getCoupons = async () => {
  const response = await axios.get(`${base_url}/coupon`);

  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axios.post(`${base_url}/coupon/`, coupon, config);

  return response.data;
};

const getSingleCoupon = async (id) => {
  const response = await axios.get(`${base_url}/coupon/${id}`, config);

  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}/coupon/${id}`, config);

  return response.data;
};

const updateCoupon = async (coupon) => {
  const response = await axios.put(`${base_url}/coupon/${coupon.id}`, {
    name: coupon.couponData.name,
    expiry: coupon.couponData.expiry,
    discount: coupon.couponData.discount,
  }, config);

  return response.data;
};

const CouponService = {
  getCoupons,
  createCoupon,
  getSingleCoupon,
  deleteCoupon,
  updateCoupon,
};

export default CouponService;