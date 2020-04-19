const Blueprint = require("factorio-blueprint");

export default function validateData(title: string, blueprint_string: string) {
  if (title === "") return false;

  try {
    let bp = new Blueprint(blueprint_string);
  } catch (e) {
    return false;
  }

  return true;
}
