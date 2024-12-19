const express = require("express");
const app = express();
app.use(express.json());

const PORT = 8080;
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

const mongoose = require("mongoose");
// mongoose
//   .connect("mongodb://localhost:27017/apinodeparis", {})
//   .then(console.log("Connected to MongoDB"));
mongoose.connect('mongodb://127.0.0.1:27017/cuisuin', { useNewUrlParser: true, useUnifiedTopology: true });


const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});