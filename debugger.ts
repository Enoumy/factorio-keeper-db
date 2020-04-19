import BlueprintDao from "./dao/blueprint-dao";
import UserDao from "./dao/user-dao";
import validateUser from "./validate-user";

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

async function findUserBlueprints() {
  let user_dao = new UserDao();
  try {
    await user_dao.open(db_file);
    let ids = await user_dao.getUserBlueprints("enoumy");
    console.log(ids);
  } catch (err) {
    console.log("Error reading user blueprints: " + err);
  }
}

async function findUserData() {
  let user_dao = new UserDao();
  try {
    await user_dao.open(db_file);
    let data = await user_dao.getUserData("enoumy");
    console.log(data);
  } catch (err) {
    console.log("Error reading user data: " + err);
  }
}

async function validateUserTest() {
  console.log(await validateUser("enoumy", "123", "test.db"));
  console.log(await validateUser("ads", "321", "test.db"));
}

async function main() {
  await findMax();
  await findImages();
  await findBlueprintData();
  await findBlueprintMetaData();
  await findUserBlueprints();
  await findUserData();

  console.log("Validation:");
  await validateUserTest();

  console.log("End of transmission. Don't panic!");
}

main();
