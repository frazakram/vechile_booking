import { FaSignInAlt, FaSignOutAlt, FaUser, FaCar, FaCalendarAlt, FaHistory } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../store/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Vehicle Service Booking</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to='/vehicles'>
                <FaCar /> My Vehicles
              </Link>
            </li>
            <li>
              <Link to='/bookings'>
                <FaCalendarAlt /> My Bookings
              </Link>
            </li>
            <li>
              <Link to='/service-history'>
                <FaHistory /> Service History
              </Link>
            </li>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
