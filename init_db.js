const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

db.serialize(() => {
    // Create a table
    db.run(`CREATE TABLE IF NOT EXISTS data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        value TEXT
    )`);

    // Insert some sample data
    const stmt = db.prepare("INSERT INTO data (name, value) VALUES (?, ?)");
    stmt.run("Sample1", "Value1");
    stmt.run("Sample2", "Value2");
    stmt.run("Sample3", "Value3");
    stmt.finalize();
});

db.close();
