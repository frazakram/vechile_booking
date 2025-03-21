import axios from 'axios';

const API_URL = '/api/bookings/';

// Get user bookings
const getBookings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Create new booking
const createBooking = async (bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, bookingData, config);

  return response.data;
};

// Cancel booking
const cancelBooking = async (bookingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + bookingId + '/cancel',
    {},
    config
  );

  return response.data;
};

// Get service history
const getServiceHistory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'history', config);

  return response.data;
};

const bookingService = {
  getBookings,
  createBooking,
  cancelBooking,
  getServiceHistory,
};

export default bookingService;
