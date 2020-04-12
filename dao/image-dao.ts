import AppDao from "./dao";

export default class ImageDao {
  dao: AppDao;

  constructor() {
    this.dao = new AppDao();
  }

  open(filename: string) {
    return this.dao.open(filename);
  }

  getImage(image_id: number) {
    return new Promise((resolve, reject) => {
      this.dao
        .get("SELECT * FROM BlueprintImages WHERE image_id=?;", [image_id])
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
