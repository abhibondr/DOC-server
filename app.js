const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./models/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "x-token");
  next();
});

const port = process.env.PORT || 8082;

app.use("/api/users", require("./routes/user.route"));
app.use("/api/auth", require("./routes/auth.route"));
// adminroutes
app.use("/api/admin", require("./routes/adminRoutes"));
//doctorroutes
app.use("/api/doctor", require("./routes/doctorRoutes"));

app.use("/api/query", require("./routes/query.route"));

app.use("/api/feedback", require("./routes/feedback.route"));

app.listen(port, () => console.log(`Server is listening on port ${port}`));
