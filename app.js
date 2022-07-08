import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/DatabaseConfig.js";
import user from "./Router/UserRouter.js";
import cors from "cors";
import path from "path";
// import cookieParser from "cookie-parser";
const app = express();

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "./config/config.env" });
}
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
// app.use(cookieParser());

//Route Definitions
app.get("/", (req, res) => res.send("Server is live"));
app.use("/api/v1", user);

connectDatabase();
const PORT = process.env.PORT || 5000;
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   // app.get("*", (req, res) => {
//   //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   // });
// }
app.listen(PORT, () => console.log("server is live."));
