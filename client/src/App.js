import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Vehicles from './pages/Vehicles';
import Bookings from './pages/Bookings';
import BookingForm from './pages/BookingForm';
import ServiceHistory from './pages/ServiceHistory';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/vehicles' element={<PrivateRoute />}>
              <Route path='/vehicles' element={<Vehicles />} />
            </Route>
            <Route path='/bookings' element={<PrivateRoute />}>
              <Route path='/bookings' element={<Bookings />} />
            </Route>
            <Route path='/book-service' element={<PrivateRoute />}>
              <Route path='/book-service' element={<BookingForm />} />
            </Route>
            <Route path='/service-history' element={<PrivateRoute />}>
              <Route path='/service-history' element={<ServiceHistory />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
