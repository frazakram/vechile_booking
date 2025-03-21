import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function BookingForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const [vehicles, setVehicles] = useState([])
  const [serviceTypes, setServiceTypes] = useState([])
  const [serviceCenters, setServiceCenters] = useState([])

  const [formData, setFormData] = useState({
    vehicleId: location.state?.vehicleId || '',
    serviceTypeId: '',
    serviceCenterId: '',
    date: '',
    notes: '',
  })

  const { vehicleId, serviceTypeId, serviceCenterId, date, notes } = formData

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    // Simulated data for now
    const mockVehicles = [
      {
        id: 1,
        name: 'Toyota Camry (2020)',
      },
      {
        id: 2,
        name: 'Honda Civic (2019)',
      },
    ]

    const mockServiceTypes = [
      {
        id: 1,
        name: 'Regular Maintenance',
        description: 'Standard service checkup',
        price: 100,
      },
      {
        id: 2,
        name: 'Oil Change',
        description: 'Oil and filter replacement',
        price: 50,
      },
      {
        id: 3,
        name: 'Brake Service',
        description: 'Brake pad replacement and inspection',
        price: 150,
      },
    ]

    const mockServiceCenters = [
      {
        id: 1,
        name: 'Main Service Center',
        address: '123 Main St, City',
      },
      {
        id: 2,
        name: 'Downtown Service Center',
        address: '456 Downtown Ave, City',
      },
    ]

    setVehicles(mockVehicles)
    setServiceTypes(mockServiceTypes)
    setServiceCenters(mockServiceCenters)
  }, [user, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!vehicleId || !serviceTypeId || !serviceCenterId || !date) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsLoading(true)

    // Simulate booking creation
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Booking created successfully')
      navigate('/bookings')
    }, 1500)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Book a Service</h1>
        <p>Fill in the details to book a service for your vehicle</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='vehicleId'>Vehicle</label>
            <select
              name='vehicleId'
              id='vehicleId'
              value={vehicleId}
              onChange={onChange}
            >
              <option value=''>Select Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='serviceTypeId'>Service Type</label>
            <select
              name='serviceTypeId'
              id='serviceTypeId'
              value={serviceTypeId}
              onChange={onChange}
            >
              <option value=''>Select Service Type</option>
              {serviceTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} - ${type.price}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='serviceCenterId'>Service Center</label>
            <select
              name='serviceCenterId'
              id='serviceCenterId'
              value={serviceCenterId}
              onChange={onChange}
            >
              <option value=''>Select Service Center</option>
              {serviceCenters.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.name} - {center.address}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='date'>Service Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={date}
              onChange={onChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='notes'>Additional Notes</label>
            <textarea
              name='notes'
              id='notes'
              value={notes}
              onChange={onChange}
              placeholder='Any specific requirements or issues to address'
            ></textarea>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Book Service
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default BookingForm
