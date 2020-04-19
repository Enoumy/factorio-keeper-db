import BlueprintDao from "./dao/blueprint-dao";
import UserDao from "./dao/user-dao";
import validateUser from "./validate-user";
import validateData from "./validate-data";

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

function validateDataTest() {
  console.log(validateData("", ""));
  console.log(validateData("title", "asd"));
  console.log(
    validateData(
      "title",
      "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"
    )
  );
}

async function main() {
  await findMax();
  await findImages();
  await findBlueprintData();
  await findBlueprintMetaData();
  await findUserBlueprints();
  await findUserData();

  console.log("User Validation:");
  await validateUserTest();

  console.log("Data Validation:");
  validateDataTest();

  console.log("End of transmission. Don't panic!");
}

main();
