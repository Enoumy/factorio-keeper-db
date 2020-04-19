import UserDao from "./dao/user-dao";

export default async function validateUser(
  username: string,
  pin: string,
  db_file: string
) {
  let user_dao = new UserDao();
  await user_dao.open(db_file);

  let user_data: any = await user_dao.getUserDataWithPin(username);

  if (user_data) {
    return pin === user_data.pin;
  }

  await user_dao.writeUser(username, pin);
  return true;
}
