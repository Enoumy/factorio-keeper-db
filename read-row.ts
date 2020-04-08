const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("test.db");

db.serialize(() => {
  db.get("SELECT * FROM BlueprintImages WHERE image_id=1;", [], (err, row) => {
    console.log(row);
  });
});

db.close();
