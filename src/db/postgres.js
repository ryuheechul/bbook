const { Client } = require("pg");
const { host, port } = require("../config").postgres;

let client;

async function initConn() {
  try {
    client = new Client({
      host,
      port,
      user: "postgres",
      database: "bbook"
    });
    await client.connect();

    const res = await client.query("SELECT $1::text as message", [
      "connection successful!"
    ]);
    console.log(res.rows[0].message);
    return;
  } catch (error) {
    console.error(error);
    client = null;
    throw new Error("failed to init client");
  }
}

const tableBirthday = {
  selectRow: async username => {
    if (!client) throw new Error("client is not ready");

    const res = await client.query(
      "SELECT * FROM birthday WHERE username = $1",
      [username]
    );

    return res.rows[0];
  },
  insertRow: async (username, bDate) => {
    if (!client) throw new Error("client is not ready");

    const res = await client.query(
      "INSERT INTO birthday (username, bdate) VALUES ($1, $2)",
      [username, bDate]
    );
    return res.rows[0];
  }
};

async function endConn() {
  const oldClient = client;
  client = null;
  return await oldClient.end();
}

module.exports = { initConn, endConn, birthday: tableBirthday };
