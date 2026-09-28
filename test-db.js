const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
  if (!MONGODB_URI) {
    console.error("No MONGODB_URI found in .env.local");
    process.exit(1);
  }

  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("✅ Successfully connected to MongoDB!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB.");
    console.error("Error Details:", error.message);
    process.exit(1);
  }
}

testConnection();
