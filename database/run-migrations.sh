#!/bin/bash

# Get the path to the SQLite database from the appsettings.json
DB_PATH=$(grep -o '"DefaultConnection".*"Data Source=.*\.db' ../server/appsettings.json | grep -o 'Data Source=.*\.db' | sed 's/Data Source=//')

echo "Using database at: $DB_PATH"

# Create the database directory if it doesn't exist
mkdir -p $(dirname "$DB_PATH")

# Run all migration scripts
for migration in migrations/*.sql; do
  echo "Running migration: $migration"
  sqlite3 "$DB_PATH" < "$migration"
done

echo "Migrations completed successfully!"
