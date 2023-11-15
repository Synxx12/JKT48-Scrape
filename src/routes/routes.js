const express = require("express");
const router = express.Router();
const { fetchData, parseData } = require("../utils/theater");
const { fetchNewsData, parseNewsData } = require("../utils/news");
const { fetchEventData, parseEventData } = require("../utils/schedule");

router.get("/schedule", async (req, res) => {
  try {
    const htmlData = await fetchData();
    const scheduleData = parseData(htmlData);
    res.json(scheduleData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/news", async (req, res) => {
  try {
    const htmlData = await fetchNewsData();
    const newsData = parseNewsData(htmlData);
    res.json(newsData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/events", async (req, res) => {
  try {
    const htmlData = await fetchEventData();
    const eventData = parseEventData(htmlData);
    res.json(eventData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
