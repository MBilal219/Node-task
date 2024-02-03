require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  FetchApiData,
  DownloadContentsFromURLs,
  GetFilesFromFolder,
} = require("./utils/nodeUtils");

const ArryOfUrls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//mongodb connection

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



// download content in .txt format

// DownloadContentsFromURLs(ArryOfUrls)
//   .then((downloadedContents) => {
//     console.log("Downloaded Contents:", downloadedContents);
//   })
//   .catch((err) => {
//     console.error("err", err);
//   });



// get files on the base of extentions

// const folderPath = "C:/Users/Muhammad Bilal/Downloads/Documents"; // Replace with your actual directory path
// const extention = "pdf";

// GetFilesFromFolder(folderPath, extention)
// .then((files)=>console.log(`Files with extension .${extention}:`, files))
// .catch((err)=>console.log(err,'<----err'));
  

//APIs
app.use("/users", require("./routes/userRouter"));

app.get("/", (req, res) => {
  res.json({ msg: "main api is working" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
