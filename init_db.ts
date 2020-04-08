const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("test.db");
const schema = fs.readFileSync("./schema.sql").toString();

let commands = schema.toString().split(";");
db.serialize(() => {
  db.run("BEGIN TRANSACTION;");

  for (let i = 0; i < commands.length; i++) {
    db.run(commands[i] + ";", err => {});
  }

  db.run("COMMIT;");
});

db.close();
