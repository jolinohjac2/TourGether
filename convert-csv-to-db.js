const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');

const dbPath = path.join(__dirname, 'data', 'singapore.db');
const csvFilePath = path.join(__dirname, 'data', 'Singapore.csv');

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
    return;
  }
  console.log('Connected to database');

  // Create the table
  db.run(`CREATE TABLE IF NOT EXISTS attractions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sn TEXT NOT NULL,
    attraction TEXT NOT NULL,
    short_description TEXT NOT NULL,
    category TEXT NOT NULL,
    avg_time_spent TEXT NOT NULL,
    google_ratings TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Error creating table', err);
      return;
    }
    console.log('Table created');

    // Read CSV file and insert data into the database
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        db.run(`INSERT INTO attractions (sn, attraction, short_description, category, avg_time_spent, google_ratings) VALUES (?, ?, ?, ?, ?, ?)`, 
          [row['S/N'], row['Attraction'], row['Short Description'], row['Category'], row['Avg. Time Spent'], row['Google Ratings']], 
          (err) => {
            if (err) {
              console.error('Error inserting row', err);
            }
          });
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        db.close((err) => {
          if (err) {
            console.error('Error closing database', err);
          } else {
            console.log('Database connection closed');
          }
        });
      });
  });
});

// Error handling for database
db.on('error', (err) => {
  console.error('Database error:', err);
});

// Error handling for CSV parsing
fs.createReadStream(csvFilePath)
  .on('error', (err) => {
    console.error('Error reading CSV file:', err);
  });
