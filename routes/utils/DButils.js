require("dotenv").config();
const sql = require("mssql");

const config = {
  user: process.env.tedious_userName,
  password: process.env.tedious_password,
  server: process.env.tedious_server,
  database: process.env.tedious_database,
  connectionTimeout: 1500000,
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool
  .connect()
  .then(() => console.log("new connection pool Created"))
  .catch((err) => console.log(err));

exports.execQuery = async function (query) {
  await poolConnect;
  try {
    var result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};

// require("dotenv").config();
// const sql = require("mssql");

// const config = {
//   user: process.env.tedious_userName,
//   password: process.env.tedious_password,
//   server: process.env.tedious_server,
//   database: process.env.tedious_database,
//   options: {
//     encrypt: true,
//     enableArithAbort: true
//   }
// };

// exports.execQuery = async function (query) {
//   var pool = undefined;
//   var result = undefined;
//   try {
//     pool = await sql.connect(config);
//     result = await pool.request().query(query);
//     return result.recordset;
//   } catch (error) {
//     throw error;
//   } finally {
//     if (pool) pool.close();
//   }
// };

