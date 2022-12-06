import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./database/database.js";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const username = process.env.dbusername;
const password = process.env.dbpassword;

connectToDb(username, password);
app.use("/user", router);

const port = process.env.PORT || 5000;
app.use("/", (req, res) => {
  res.send("welcome to the server home page");
});
app.listen(port, () => console.log(`server is running on port:${port}`));
