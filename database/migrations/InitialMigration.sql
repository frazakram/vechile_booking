-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    Phone TEXT NOT NULL,
    PasswordHash TEXT NOT NULL,
    CreatedAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- Create ServiceTypes table
CREATE TABLE IF NOT EXISTS ServiceTypes (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT NOT NULL,
    Price REAL NOT NULL,
    EstimatedHours INTEGER NOT NULL
);

-- Create Vehicles table
CREATE TABLE IF NOT EXISTS Vehicles (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER NOT NULL,
    Make TEXT NOT NULL,
    Model TEXT NOT NULL,
    Year INTEGER NOT NULL,
    LicensePlate TEXT NOT NULL,
    CreatedAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- Create Bookings table
CREATE TABLE IF NOT EXISTS Bookings (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER NOT NULL,
    VehicleId INTEGER NOT NULL,
    ServiceTypeId INTEGER NOT NULL,
    BookingDate TEXT NOT NULL,
    Status TEXT NOT NULL DEFAULT 'Pending',
    CreatedAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (VehicleId) REFERENCES Vehicles(Id),
    FOREIGN KEY (ServiceTypeId) REFERENCES ServiceTypes(Id)
);

-- Insert default service types
INSERT INTO ServiceTypes (Name, Description, Price, EstimatedHours)
VALUES 
    ('Oil Change', 'Complete oil change with filter replacement', 49.99, 1),
    ('Tire Rotation', 'Rotate tires to ensure even wear', 29.99, 1),
    ('Brake Service', 'Inspect and replace brake pads if needed', 149.99, 2),
    ('Engine Tune-up', 'Comprehensive engine tune-up', 199.99, 3),
    ('Full Inspection', 'Complete vehicle inspection', 89.99, 2);
