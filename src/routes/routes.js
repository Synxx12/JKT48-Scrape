const express = require("express");
const router = express.Router();
const { fetchData, parseData } = require("../utils/theater");
const { fetchNewsData, parseNewsData } = require("../utils/news");
const { fetchEventData, parseEventData } = require("../utils/schedule");
const { fetchBirthdayData, parseBirthdayData } = require("../utils/birthday");
const { fetchMemberData, parseMemberData, fetchMemberSocialMedia, parseMemberSocialMedia } = require("../utils/member");
const { fetchNewsSearchData, parseNewsSearchData } = require("../utils/news-search");

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

router.get("/birthdays", async (req, res) => {
  try {
    const htmlData = await fetchBirthdayData();
    const birthdayData = parseBirthdayData(htmlData);
    res.json(birthdayData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/member/:id", async (req, res) => {
  const memberId = req.params.id;
  try {
    const memberHtmlData = await fetchMemberData(memberId);
    const memberData = parseMemberData(memberHtmlData);

    const socialMediaHtmlData = await fetchMemberSocialMedia(memberId);
    const socialMediaData = parseMemberSocialMedia(socialMediaHtmlData);

    const combinedData = { ...memberData, socialMedia: socialMediaData };

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/news/:page", async (req, res) => {
  const page = req.params.page || 1;

  try {
    const html = await fetchNewsSearchData(page);
    const newsData = parseNewsSearchData(html);
    res.status(200).json({ success: true, data: newsData });
  } catch (error) {
    console.error("Error fetching or parsing news data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
