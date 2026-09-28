const mongoose = require("mongoose");

const uri = "mongodb://lalithakulal82_db_user:Y8Tjpe1j3rLSRhcS@ac-ajlgi3p-shard-00-00.dfzlkzq.mongodb.net:27017,ac-ajlgi3p-shard-00-01.dfzlkzq.mongodb.net:27017,ac-ajlgi3p-shard-00-02.dfzlkzq.mongodb.net:27017/?ssl=true&authSource=admin&retryWrites=true&w=majority";

async function testConnection() {
  try {
    console.log("Attempting direct MongoDB connection...");
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("✅ Successfully connected to MongoDB directly!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB directly.");
    console.error("Error Details:", error.message);
    process.exit(1);
  }
}

testConnection();
