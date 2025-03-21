# Vehicle Service Booking Application

A full-stack application for booking vehicle service appointments.

## Project Structure

The project is organized into the following structure:

```
FullStackApp/
├── client/                  # React frontend
│   ├── public/              # Public assets
│   └── src/                 # Source files
│       ├── components/      # Reusable components
│       ├── pages/           # Page components
│       ├── services/        # API service calls
│       └── store/           # Redux store
└── server/                  # .NET Core backend
    ├── Controllers/         # API controllers
    ├── Models/              # Data models
    ├── Services/            # Business logic
    ├── Data/                # Database context
    └── Middleware/          # Custom middleware
```

## Features

- User authentication and registration
- Vehicle management
- Service booking and scheduling
- Service history tracking
- Notifications

## Technologies Used

### Frontend
- React
- Redux for state management
- React Router for navigation
- Axios for API calls
- Bootstrap for styling

### Backend
- .NET Core
- Entity Framework Core
- JWT Authentication
- SQLite Database

## Getting Started

### Prerequisites
- Node.js and npm
- .NET SDK

### Running the Application

1. Start the backend server:
   ```
   cd server
   dotnet run
   ```

2. Start the frontend client:
   ```
   cd client
   npm install
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `/api/auth/register` - Register a new user
- `/api/auth/login` - Login a user
- `/api/vehicles` - Manage user vehicles
- `/api/bookings` - Manage service bookings
- `/api/services/types` - Get service types
- `/api/services/centers` - Get service centers
