import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/discord_dashboard")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));
