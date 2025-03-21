import axios from 'axios'

// Configure axios
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const API_URL = 'http://localhost:5000/api/auth/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData)
  console.log('Register response:', response.data)

  // Create a user object with token
  const user = {
    ...response.data,
    token: response.data.token || null
  }

  localStorage.setItem('user', JSON.stringify(user))
  return user
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  console.log('Login response:', response.data)

  // Create a user object with token
  const user = {
    email: userData.email,
    token: response.data.token
  }

  localStorage.setItem('user', JSON.stringify(user))
  return user
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
