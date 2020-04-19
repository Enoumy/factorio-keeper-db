const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

import BlueprintDao from "./dao/blueprint-dao";
import ImageDao from "./dao/image-dao";
import UserDao from "./dao/user-dao";
import validateUser from "./validate-user";

const db_file = "test.db";

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

app.get("/image/:image_id", async (req, res, next) => {
  let image_id = req.params["image_id"];
  let result: any;

  let image_dao = new ImageDao();
  try {
    await image_dao.open(db_file);
    result = await image_dao.getImage(image_id);
  } catch (error) {
    next();
  }

  if (result == null || Object.keys(result).length === 0) next();

  res.contentType(result["content_type"]);
  res.end(result["image_blob"], "binary");
});

app.get("/user/:username", async (req, res, next) => {
  let username = req.params["username"];
  let data: any;

  let user_dao = new UserDao();
  try {
    await user_dao.open(db_file);
    data = await user_dao.getUserData(username);
    data["blueprints"] = await user_dao.getUserBlueprints(username);
  } catch (error) {
    next();
  }

  res.contentType("application/json");
  res.end(JSON.stringify(data));
});

app.post("/upload", async (req, res, next) => {
  console.log("POST /upload");
  for (let key in req.body.images) {
    let arr = req.body.images[key]["buffer"];
    let buffer = new Buffer(arr.length);
    for (let i = 0; i < arr.length; i++) buffer[i] = arr[i];
    req.body.images[key]["buffer"] = buffer;
  }

  let blueprint_dao = new BlueprintDao();

  try {
    await blueprint_dao.open(db_file);
    await blueprint_dao.dao.run("BEGIN;");

    if (!(await validateUser(req.body.username, req.body.pin, db_file))) {
      await blueprint_dao.dao.run("ROLLBACK;");
      console.log("Failed to write to db, aborting transaction");
      res.status(403).send("Write access denied for " + req.body.username);
      return;
    }

    let blueprint_id: number = await blueprint_dao.findMaxID();
    blueprint_id++;

    await blueprint_dao.writeBlueprint(
      blueprint_id,
      req.body.blueprint_string,
      req.body.title,
      req.body.description,
      req.body.username
    );

    await blueprint_dao.writeOwnership(blueprint_id, req.body.username);

    for (let key in req.body.images) {
      let image_id: number = await blueprint_dao.findMaxImageID();
      image_id++;

      await blueprint_dao.writeImage(
        blueprint_id,
        image_id,
        req.body.images[key]["type"],
        req.body.images[key]["buffer"]
      );
    }

    await blueprint_dao.dao.run("COMMIT;");
  } catch (error) {
    await blueprint_dao.dao.run("ROLLBACK;");
    console.log("Failed to write to db, aborting transaction");
    next();
  }
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(404).send("Not found!");
});

let server = app.listen(3000, () => {
  let address = server.address();
  console.log("Server is up and running at: http://localhost:" + address.port);
});
