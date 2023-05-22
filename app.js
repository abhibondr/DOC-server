const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./models/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use("/api/users", require("./routes/user.route"));
app.listen(port, () => console.log(`Server is listening on port ${port}`));
