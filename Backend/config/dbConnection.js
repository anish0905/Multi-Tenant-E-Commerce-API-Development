const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Connect to MongoDB

const connectDB = async()=>{

try {
  
  const conn = await mongoose.connect(process.env.MONGODB_URL)
  console.log(`Connected to MongoDB ${conn.connection.host}`);
  
} catch (error) {
  
  console.error(`Error connecting to MongoDB: ${error.message}`);
  process.exit(1);
  
}



}

module.exports = connectDB;




