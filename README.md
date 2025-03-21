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

## Cloning and Running the Application

### Cloning from GitHub

1. Clone the repository:
   ```bash
   git clone https://github.com/frazakram/vechile_booking.git
   cd vechile_booking
   ```

### Running on macOS/Linux

1. Set up and run the backend:
   ```bash
   cd server
   dotnet restore
   dotnet run
   ```
   The server will start at http://localhost:5000

2. In a new terminal, set up and run the frontend:
   ```bash
   cd client
   npm install
   npm start
   ```
   The React app will start at http://localhost:3000

3. Initialize the database (if needed):
   ```bash
   cd database
   chmod +x run-migrations.sh
   ./run-migrations.sh
   ```

### Running on Windows

1. Prerequisites:
   - Install [.NET 5.0 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)
   - Install [Node.js](https://nodejs.org/) (includes npm)
   - Install [Git for Windows](https://git-scm.com/download/win)

2. Set up and run the backend:
   ```cmd
   cd server
   dotnet restore
   dotnet run
   ```
   The server will start at http://localhost:5000

3. In a new Command Prompt or PowerShell window, set up and run the frontend:
   ```cmd
   cd client
   npm install
   npm start
   ```
   The React app will start at http://localhost:3000

4. Initialize the database (if needed):
   - If SQLite is not installed, download it from [SQLite Download Page](https://www.sqlite.org/download.html)
   - Run the migration script:
   ```cmd
   cd database
   type migrations\InitialMigration.sql | sqlite3 ..\server\vehicleservice.db
   ```

### Troubleshooting

1. **Port Conflicts**:
   - If ports 5000 or 3000 are already in use, you can change them:
     - For the backend: Edit `server/Properties/launchSettings.json`
     - For the frontend: Use `npm start -- --port 3001`

2. **CORS Issues**:
   - If you see CORS errors, make sure the backend CORS policy allows requests from your frontend URL

3. **Database Issues**:
   - Check that the connection string in `server/appsettings.json` is correct
   - Make sure the database directory exists and is writable

4. **Node.js/npm Issues**:
   - Try `npm cache clean --force` before reinstalling packages
