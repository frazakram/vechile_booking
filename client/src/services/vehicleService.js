import axios from 'axios';

const API_URL = '/api/vehicles/';

// Get user vehicles
const getVehicles = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Add new vehicle
const addVehicle = async (vehicleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, vehicleData, config);

  return response.data;
};

// Delete vehicle
const deleteVehicle = async (vehicleId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + vehicleId, config);

  return response.data;
};

const vehicleService = {
  getVehicles,
  addVehicle,
  deleteVehicle,
};

export default vehicleService;
