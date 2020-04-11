const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

function executeCommands(db_file: string, sql_file: string): void {
  let db = new sqlite3.Database(db_file);
  const schema = fs.readFileSync(sql_file).toString();

  let commands = schema.toString().split(";");
  db.serialize(() => {
    db.run("BEGIN TRANSACTION;");

    for (let i = 0; i < commands.length; i++) {
      db.run(commands[i] + ";", err => {
        if (err) console.log(err);
      });
    }

    db.run("COMMIT;");
  });

  db.close();
}

executeCommands("test.db", "./dummy-data.sql");
