const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoute");

const app = express();

app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});
mongoose.set('strictQuery', false); // Disable strictQuery option

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  autoCreate: true,
};

mongoose
  .connect(process.env.MONGODB_URL, connectionOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(
  cors({
    origin: ["http://localhost:3000" ||  "https://eventcom.online" ],
    methods: ["GET", "POST"], 
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use("/", userRoute);
app.use("/admin", adminRoute);
