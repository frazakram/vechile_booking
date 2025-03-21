import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaCalendarPlus } from 'react-icons/fa'
import Spinner from '../components/Spinner'

function Bookings() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    // Simulated data for now
    const mockBookings = [
      {
        id: 1,
        vehicleName: 'Toyota Camry',
        serviceType: 'Regular Maintenance',
        serviceCenter: 'Main Service Center',
        date: '2023-07-15',
        status: 'Scheduled',
      },
      {
        id: 2,
        vehicleName: 'Honda Civic',
        serviceType: 'Oil Change',
        serviceCenter: 'Downtown Service Center',
        date: '2023-07-20',
        status: 'Pending',
      },
    ]

    setBookings(mockBookings)
    setIsLoading(false)
  }, [user, navigate])

  const handleNewBooking = () => {
    navigate('/book-service')
  }

  const handleCancelBooking = (bookingId) => {
    // Implement cancel booking functionality
    alert(`Booking ${bookingId} would be cancelled`)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>My Bookings</h1>
        <p>Manage your service bookings</p>
        <button className='btn' onClick={handleNewBooking}>
          <FaCalendarPlus /> New Booking
        </button>
      </section>

      <section className='content'>
        {bookings.length > 0 ? (
          <div className='bookings'>
            {bookings.map((booking) => (
              <div className='booking-card' key={booking.id}>
                <div className='booking-header'>
                  <h2>{booking.vehicleName}</h2>
                  <span className={`status status-${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </div>
                <p>
                  <strong>Service Type:</strong> {booking.serviceType}
                </p>
                <p>
                  <strong>Service Center:</strong> {booking.serviceCenter}
                </p>
                <p>
                  <strong>Date:</strong> {booking.date}
                </p>
                <div className='booking-buttons'>
                  {booking.status !== 'Completed' && (
                    <button
                      className='btn btn-reverse'
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>You have no bookings yet</h3>
        )}
      </section>
    </>
  )
}

export default Bookings
