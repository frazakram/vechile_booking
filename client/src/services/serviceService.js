import axios from 'axios';

const API_URL = '/api/services/';

// Get service types
const getServiceTypes = async () => {
  const response = await axios.get(API_URL + 'types');
  return response.data;
};

// Get service centers
const getServiceCenters = async () => {
  const response = await axios.get(API_URL + 'centers');
  return response.data;
};

const serviceService = {
  getServiceTypes,
  getServiceCenters,
};

export default serviceService;
