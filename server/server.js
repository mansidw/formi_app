const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config.js");
const db = require("./app/models")
const Role = db.role;


const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};



app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to formi application." });
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});