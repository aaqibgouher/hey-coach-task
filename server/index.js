const express = require("express");
require("dotenv").config();
require("./database/config");
require("./models");
const cors = require("cors");
const routes = require("./routes/parkingRoute");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
