import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const uploadProductImg = async (data) => {
  console.log('service upload -> ', data);
  const response = await axios.post(`${base_url}/upload/products`, data, config);

  return response.data;
};

const uploadService = {
  uploadProductImg,
};

export default uploadService;
