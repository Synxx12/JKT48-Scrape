const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();
const port = 3000;

app.use(cors());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome To JKT48 WEB API",
    author: "https://github.com/Synxx12",
    repository: "https://github.com/Synxx12/JKT48-Scrape.git",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
