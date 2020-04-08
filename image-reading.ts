const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

let buffer = fs.readFileSync("./test-images/baby-yoda.jpg");
console.log(buffer);

let db = new sqlite3.Database("test.db");

db.serialize(() => {
  db.run("BEGIN TRANSACTION;");

  db.run(
    "INSERT INTO BlueprintImages (image_id, b_id, content_type, image_blob) VALUES (?, ?, ?, ?)",
    1,
    1,
    "image/jpeg",
    buffer
  );

  db.run("COMMIT;");
});

db.close();
