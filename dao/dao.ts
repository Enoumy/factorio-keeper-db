const sqlite3 = require("sqlite3").verbose();

export default class AppDao {
  db;

  constructor() {}

  open(filename: string) {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(filename, err => {
        if (err) {
          console.log("Error opening database: " + filename);
          console.log(err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  run(sql: string, params: any[] = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, err => {
        if (err) {
          console.log("Error running sql " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  get(sql: string, params: any[] = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          console.log("Error running sql " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  all(sql: string, params: any[] = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log("Error running sql " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  transaction(commands) {
    this.db.serialize(() => {
      this.db.run("BEGIN TRANSACTION;");
      commands();
      this.db.run("COMMIT;");
    });
  }
}
