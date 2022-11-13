import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./database/database.js";
import router from "./routes/routes.js";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const username = process.env.dbusername;
const password = process.env.dbpassword;

connectToDb(username, password);
app.use("/user", router);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port:${port}`));
