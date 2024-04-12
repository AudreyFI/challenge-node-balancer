import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend server 3");
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
