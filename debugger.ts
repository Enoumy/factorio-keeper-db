import BlueprintDao from "./dao/blueprint-dao";

const db_file = "test.db";

async function findMax() {
  let blueprint_dao = new BlueprintDao();
  try {
    await blueprint_dao.open(db_file);
    console.log(await blueprint_dao.findMaxID());
  } catch (err) {
    console.log(err);
  }
}

async function findImages() {
  let blueprint_dao = new BlueprintDao();
  try {
    await blueprint_dao.open(db_file);
    let images = await blueprint_dao.getBlueprintImages(1);
    console.log(images);
  } catch (err) {
    console.log("Error finding images: " + err);
  }
}

async function findBlueprintData() {
  let blueprint_dao = new BlueprintDao();
  try {
    await blueprint_dao.open(db_file);
    let data = await blueprint_dao.getBlueprintData(1);
    console.log(data);
  } catch (err) {
    console.log("Error finding data: " + err);
  }
}

async function findBlueprintMetaData() {
  let blueprint_dao = new BlueprintDao();
  try {
    await blueprint_dao.open(db_file);
    let data = await blueprint_dao.getBlueprintMetaData(1);
    console.log(data);
  } catch (err) {
    console.log("Error finding data: " + err);
  }
}

async function main() {
  await findMax();
  await findImages();
  await findBlueprintData();
  await findBlueprintMetaData();
  console.log("End of transmission. Don't panic!");
}

main();
