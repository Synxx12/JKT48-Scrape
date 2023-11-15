const express = require("express");
const routes = require("./routes/routes");

const app = express();
const port = 3000;

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome To JKT48 WEB API",
    author: "https://github.com/Synxx12",
    repository: "https://github.com/ikhbaldwiyan/jkt48-showroom-api",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
