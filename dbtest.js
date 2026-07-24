const mongoose = require("mongoose");

const uri =
  "mongodb+srv://rahul123:rahul123@cluster0.10r2cef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  try {
    console.log("Connecting...");

    await mongoose.connect(uri);

    console.log("✅ Connected successfully!");

    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);

    await mongoose.disconnect();

    console.log("Disconnected.");
  } catch (err) {
    console.error("❌ Connection failed:");
    console.error(err);
  }
}

testConnection();