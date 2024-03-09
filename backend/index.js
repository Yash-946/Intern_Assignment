require("dotenv").config();
const express = require("express");
const app = express();
const auth = require("./routes/auth");
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("All good")
});

app.use("/api/v1", auth);

app.listen(3000, () => {
  console.log("Server Start");
});
