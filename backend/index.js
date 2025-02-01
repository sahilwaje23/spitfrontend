require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectToMongoDb = require("./connection");
const userRoutes = require("./routes/user");
const managerRoutes = require("./routes/manager");

const MONGO_URL = process.env.MONGO_URL;

const app = express();
connectToMongoDb(MONGO_URL)
  .then(() => console.log("MongoDB Connected !"))
  .catch((e) => {
    console.log(`MONGODB ERROR ${e}`);
  });

// ^ Middle Wares
app.use(
  cors({
    origin: "https://g4xx34w2-5173.inc1.devtunnels.ms",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes :
app.use("/user", userRoutes);
app.use("/manager", managerRoutes);

app.listen(8000, () => console.log("Listening on port 8000"));
