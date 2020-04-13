import AppDao from "./dao";

export default class BlueprintDao {
  dao: AppDao;

  constructor() {
    this.dao = new AppDao();
  }

  open(filename: string) {
    return this.dao.open(filename);
  }

  findMaxID() {
    return new Promise((resolve, reject) => {
      this.dao
        .get("SELECT MAX(b_id) AS max from Blueprints;")
        .then(value => {
          resolve(value["max"]);
        })
        .catch(err => {
          resolve(0);
        });
    });
  }

  getBlueprintImages(blueprint_id: number) {
    function normalizeImageIDs(images: any[]) {
      let out: number[] = [];
      for (let i = 0; i < images.length; i++) out.push(images[i]["image_id"]);
      return out;
    }

    return new Promise((resolve, reject) => {
      this.dao
        .all(
          `SELECT image_id
           FROM   blueprints AS b,
                  blueprintimages AS i
           WHERE  b.b_id = i.b_id
                  AND b.b_id = ?;`,
          [blueprint_id]
        )
        .then((result: any[]) => {
          resolve(normalizeImageIDs(result));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getBlueprintData(blueprint_id: number) {
    return new Promise((resolve, reject) => {
      this.dao
        .get(
          `
        SELECT *
        FROM   blueprints AS b,
               blueprintmetadata AS d
        WHERE  b.b_id = d.b_id
               AND b.b_id = ?;
        `,
          [blueprint_id]
        )
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getBlueprintMetaData(blueprint_id: number) {
    return new Promise((resolve, reject) => {
      this.dao
        .get(
          `
        SELECT b.b_id, title, created_date, description, created_by
        FROM   blueprints AS b,
               blueprintmetadata AS d
        WHERE  b.b_id = d.b_id
               AND b.b_id = ?;
        `,
          [blueprint_id]
        )
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  writeBlueprint(
    blueprint_id: number,
    blueprint_string: string,
    title: string
  ) {
    return this.dao.run(
      `
      INSERT INTO blueprints
                  (b_id,
                   blueprint_string,
                   title)
      VALUES      (?,
                   ?,
                   ?); `,
      [blueprint_id, blueprint_string, title]
    );
  }

  writeBlueprintMetadata(
    blueprint_id: number,
    created_by: string,
    description: string
  ) {
    return this.dao.run(
      `
      INSERT INTO blueprintmetadata
                  (created_date,
                   description,
                   b_id,
                   created_by)
      VALUES      (Date('now'),
                   ?,
                   ?,
                   ?);
      `,
      [description, blueprint_id, created_by]
    );
  }
}
