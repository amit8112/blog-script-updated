import express from "express";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blogRoutes.js";
import cors from "cors";

const app = express();
const PORT = 9000;

//database
connectToMongo();

app.use(cors());

app.use(express.json());

app.use(express.static("public/upload"));

app.get("/", (req, res) => {
  res.send("Api is running ");
});

//Api routes
app.use("/api/v1/", authRoutes);

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});
