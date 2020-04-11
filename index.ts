const express = require("express");
const sqlite3 = require("sqlite3").verbose();
import BlueprintDao from "./dao/blueprint-dao";

const db_file = "test.db";

const app = express();
let db = new sqlite3.Database("test.db");

app.get("/", function(req, res) {
  res.send("Factorio Keeper Backend server");
});

app.get("/blueprint/:blueprint_id", async (req, res, next) => {
  const blueprint_id = req.params["blueprint_id"];
  let data: Object = {};
  let blueprint_dao = new BlueprintDao();
  try {
    await blueprint_dao.open(db_file);
    data = await blueprint_dao.getBlueprintData(blueprint_id);
    data["images"] = await blueprint_dao.getBlueprintImages(blueprint_id);
  } catch (err) {
    next("Not found");
  }
  res.contentType("application/json");
  res.end(JSON.stringify(data));
});

app.get("/blueprint/:blueprint_id/summary", async (req, res, next) => {
  const blueprint_id = req.params["blueprint_id"];
  let data: Object = {};
  let blueprint_dao = new BlueprintDao();
  try {
    await blueprint_dao.open(db_file);
    data = await blueprint_dao.getBlueprintMetaData(blueprint_id);
    data["images"] = await blueprint_dao.getBlueprintImages(blueprint_id);
  } catch (err) {
    next("Not found");
  }
  res.contentType("application/json");
  res.end(JSON.stringify(data));
});

app.get("/image/:image_id", (req, res, next) => {
  let img = req.params["image_id"];
  db.serialize(() => {
    db.get(
      "SELECT * FROM BlueprintImages WHERE image_id=?;",
      [img],
      (err, row) => {
        if (err || row == null || Object.keys(row).length === 0) next();
        else {
          res.contentType(row["content_type"]);
          res.end(row["image_blob"], "binary");
        }
      }
    );
  });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(404).send("Not found!");
});

app.listen(3000);

console.log("End of transmission. Don't panic!");
