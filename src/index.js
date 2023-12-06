const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const { sendLogToDiscord } = require("./other/discordLogger");
const config = require("./main/config");

const app = express();

app.use((req, res, next) => {
  if (config.maintenanceMode) {
    const logMessage = `Service temporarily unavailable due to maintenance. Request from ${req.ip} blocked.`;
    sendLogToDiscord(logMessage, "Error");
    res.status(503).send({
      message: "Service temporarily unavailable due to maintenance.",
    });
  } else {
    next();
  }
});

app.use((req, res, next) => {
  const startTime = new Date();

  res.on("finish", () => {
    const endTime = new Date();
    const responseTime = endTime - startTime;

    const requestData = {
      method: req.method,
      url: req.originalUrl,
      responseTime,
    };

    const logMessage = `Request handled successfully. Method: ${req.method}, URL: ${req.originalUrl}`;
    sendLogToDiscord(logMessage, "Info", requestData);
  });

  next();
});

const enableMaintenanceMode = () => {
  // Check if maintenanceMode is already false
  if (!config.maintenanceMode) {
    const logMessage = "Maintenance mode disabled.";
    sendLogToDiscord(logMessage, "Info");
    return;
  }

  config.maintenanceMode;

  const logBeforeMessage = "Maintenance mode about to be disabled.";
  const logAfterMessage = "Maintenance mode enabled.";
  sendLogToDiscord(logBeforeMessage, "Info");
  sendLogToDiscord(logAfterMessage, "Info");
};

enableMaintenanceMode();

app.use(cors());
app.use("/api", routes);

app.get("/", (req, res) => {
  const logMessage = `Welcome message sent to ${req.ip}.`;
  sendLogToDiscord(logMessage);
  res.send({
    message: "Welcome To JKT48 WEB API",
    author: "https://github.com/Synxx12",
    repository: "https://github.com/Synxx12/JKT48-Web-Scrape.git",
  });
});

app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});
