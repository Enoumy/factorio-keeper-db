import AppDao from "./dao";

export default class UserDao {
  dao: AppDao;

  constructor() {
    this.dao = new AppDao();
  }

  open(filename: string) {
    return this.dao.open(filename);
  }

  getUserBlueprints(username: string) {
    function normalizeBlueprintIDs(blueprints: any[]) {
      let out: number[] = [];
      for (let i = 0; i < blueprints.length; i++) {
        out.push(blueprints[i]["bid"]);
      }
      return out;
    }

    return new Promise((resolve, reject) => {
      this.dao
        .all(
          `
          SELECT o.b_id as bid
          FROM   users AS u,
                 owns AS o
          WHERE  u.username = o.username
                 AND u.username = ?;`,
          [username]
        )
        .then((results: any[]) => {
          resolve(normalizeBlueprintIDs(results));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getUserData(username: string) {
    return new Promise((resolve, reject) => {
      this.dao
        .get(
          `
        SELECT username, created_date
        FROM   users
        WHERE  username = ?;
        `,
          [username]
        )
        .then(value => {
          resolve(value);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getUserDataWithPin(username: string) {
    return new Promise((resolve, reject) => {
      this.dao
        .get(
          `
        SELECT *
        FROM   users
        WHERE  username = ?;
        `,
          [username]
        )
        .then(value => {
          resolve(value);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
