const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();
const { MongoClient } = require("mongodb");

async function test() {
  try {
    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();
    console.log("✅ Connected");
  } catch (err) {
    console.error(err);
  }
}

test();