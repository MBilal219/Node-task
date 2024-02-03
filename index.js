require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { FetchApiData } = require("./utils/nodeUtils");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);
// fetch api task to check please uncomment blow function and pass any fetch api url

// FetchApiData("https://jsonplaceholder.typicode.com/posts")
//   .then((res) => console.log(res, "res"))
//   .catch((err) => console.log(err, "err"));

//APIs
app.use("/users", require("./routes/userRouter"));
app.get("/", (req, res) => {
  res.json({ msg: "main api is working" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
