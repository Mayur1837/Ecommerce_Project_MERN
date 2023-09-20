const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectdatabase = require("./config/database");

//config..
dotenv.config({ path: "backend/config/config.env" });

// handling uncaught Exception..............
// for better understanding....
// write console.log(hello)  without "" in log..
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    "Shutting Down the server due to unhandeled promise rejections 11"
  );
  process.exit(1);
});

//connecting to database...
connectdatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandeled Promise Rejection...
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down the server due to unhandeled promise rejections");
  server.close(() => {
    process.exit(1);
  });
});
