import mongoose from "mongoose";

export default function () {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to Database."))
    .catch((err) => console.log(err.message));
}
