const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieparser = require('cookie-parser');
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");
const path = require("path");

//express app
const app = express();

//load end vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

//Routes
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

//Middle wares
const logger = require("./middlewares/logger");

//Body Parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//File upload middleware
app.use(fileupload());

//Cookie parser middleware
app.use(cookieparser());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

//Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  //Close server and exit process
  server.close();

  server.close(() => process.exit(1));
});
