const sql = require("mssql");
const dbConfig = require("./dbConfig");

async function getPool() {
  let pool = await sql.connect(dbConfig);
  return pool;
}

module.exports = { getPool };
