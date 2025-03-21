import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      navigate('/vehicles')
    }
  }, [user, navigate])

  return (
    <>
      <section className='heading'>
        <h1>Welcome to Vehicle Service Booking</h1>
        <p>Book your vehicle service with ease</p>
      </section>

      <section className='content'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Our Services</h5>
                  <p className='card-text'>
                    We offer a wide range of services for your vehicle including:
                  </p>
                  <ul>
                    <li>Regular Maintenance</li>
                    <li>Oil Change</li>
                    <li>Brake Service</li>
                    <li>Tire Rotation</li>
                    <li>Engine Diagnostics</li>
                    <li>And more...</li>
                  </ul>
                  <p>
                    Please login or register to book a service for your vehicle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard
