import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../components/Spinner'

function ServiceHistory() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    // Simulated data for now
    const mockHistory = [
      {
        id: 1,
        vehicleName: 'Toyota Camry',
        serviceType: 'Regular Maintenance',
        serviceCenter: 'Main Service Center',
        date: '2023-06-10',
        status: 'Completed',
        cost: 100,
      },
      {
        id: 2,
        vehicleName: 'Toyota Camry',
        serviceType: 'Oil Change',
        serviceCenter: 'Downtown Service Center',
        date: '2023-05-15',
        status: 'Completed',
        cost: 50,
      },
      {
        id: 3,
        vehicleName: 'Honda Civic',
        serviceType: 'Brake Service',
        serviceCenter: 'Main Service Center',
        date: '2023-04-20',
        status: 'Completed',
        cost: 150,
      },
    ]

    setHistory(mockHistory)
    setIsLoading(false)
  }, [user, navigate])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Service History</h1>
        <p>View your past service records</p>
      </section>

      <section className='content'>
        {history.length > 0 ? (
          <div className='service-history'>
            {history.map((service) => (
              <div className='booking-card' key={service.id}>
                <div className='booking-header'>
                  <h2>{service.vehicleName}</h2>
                  <span className='status status-completed'>
                    {service.status}
                  </span>
                </div>
                <p>
                  <strong>Service Type:</strong> {service.serviceType}
                </p>
                <p>
                  <strong>Service Center:</strong> {service.serviceCenter}
                </p>
                <p>
                  <strong>Date:</strong> {service.date}
                </p>
                <p>
                  <strong>Cost:</strong> ${service.cost}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <h3>You have no service history yet</h3>
        )}
      </section>
    </>
  )
}

export default ServiceHistory
