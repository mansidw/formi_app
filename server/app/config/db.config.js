const mongoose = require("mongoose");
require("dotenv").config();
const db = require("../models")
const Role = db.role;


const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.z1cb4.mongodb.net/?retryWrites=true&w=majority`;

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

const connection = mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("Connected to database");
    initial();
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

module.exports = connection;