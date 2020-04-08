const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

function createDatabaseFromSchema(
  filename: string,
  schema_filename: string
): void {
  let db = new sqlite3.Database(filename);
  const schema = fs.readFileSync(schema_filename).toString();

  let commands = schema.toString().split(";");
  db.serialize(() => {
    db.run("BEGIN TRANSACTION;");

    for (let i = 0; i < commands.length; i++) {
      db.run(commands[i] + ";", err => {});
    }

    db.run("COMMIT;");
  });

  db.close();
}

createDatabaseFromSchema("test.db", "./schema.sql");
