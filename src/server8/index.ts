import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend server 8");
});

app.listen(3008, () => {
  console.log("Server is running on port 3008");
});
