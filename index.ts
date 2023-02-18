import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import AllRoute from "./Controller/AllController";
const port = 2001;
const url = "mongodb://localhost/set07Ecomerce";
const app = express();
app.use(express.json());
app.use(cors());

// connecting to local host
mongoose.connect(url).then(() => {
  console.log("database connection established");
});

app.use("/api", AllRoute);

app.listen(port, () => {
  console.log("listening on port", port);
});
