import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config({ path: "../.env" });
const { host, user, password, database } = process.env;
export default () => {
  const connection = mysql.createPool({
    host,
    user,
    password,
    database,
  });
  return connection;
};
