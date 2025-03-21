import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaPlus } from 'react-icons/fa'
import Spinner from '../components/Spinner'

function Vehicles() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [vehicles, setVehicles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    // Simulated data for now
    const mockVehicles = [
      {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        registrationNumber: 'ABC123',
      },
      {
        id: 2,
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        registrationNumber: 'XYZ789',
      },
    ]

    setVehicles(mockVehicles)
    setIsLoading(false)
  }, [user, navigate])

  const handleAddVehicle = () => {
    // Navigate to add vehicle page
    // navigate('/add-vehicle')
    alert('Add vehicle functionality to be implemented')
  }

  const handleBookService = (vehicleId) => {
    navigate('/book-service', { state: { vehicleId } })
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>My Vehicles</h1>
        <p>Manage your vehicles</p>
        <button className='btn' onClick={handleAddVehicle}>
          <FaPlus /> Add Vehicle
        </button>
      </section>

      <section className='content'>
        {vehicles.length > 0 ? (
          <div className='vehicles'>
            {vehicles.map((vehicle) => (
              <div className='vehicle-card' key={vehicle.id}>
                <div className='vehicle-header'>
                  <h2>
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                  </h2>
                </div>
                <p>
                  <strong>Registration Number:</strong> {vehicle.registrationNumber}
                </p>
                <div className='vehicle-buttons'>
                  <button
                    className='btn'
                    onClick={() => handleBookService(vehicle.id)}
                  >
                    Book Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>You have not added any vehicles yet</h3>
        )}
      </section>
    </>
  )
}

export default Vehicles
