const express = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieSession = require("cookie-session");
const userRouter = require('./routes/user-Router');
const mongoose = require('mongoose');
const multer = require('multer')

// const adminRouter = require('./routes/adminRouter');

var corsOptions = {
  origin: ["http://localhost:4200"],
  credentials: true
}

const app = express();

app.use(cors(corsOptions))


app.use(express.static('./public'));


app.use(fileUpload())


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "auth-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);



mongoose
  .connect(`mongodb://localhost:27017/Blog_Spot`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
app.use('/', userRouter);
// app.use('/admin', adminRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


