// routes.js
const express = require("express");
const router = express.Router();
const { fetchData, parseData } = require("../utils/theater");
const { fetchNewsData, parseNewsData } = require("../utils/news");
const { fetchSpecificData, parseSpecificData } = require("../utils/schedule");
const { fetchBirthdayData, parseBirthdayData } = require("../utils/birthday");
const { fetchMemberDataId, parseMemberDataId, fetchMemberSocialMediaId, parseMemberSocialMediaId } = require("../utils/memberid");
const { fetchNewsSearchData, parseNewsSearchData } = require("../utils/news-search");
const { fetchMemberData, parseMemberData } = require("../utils/member");
const { fetchBannerData, parseBannerData } = require("../utils/banner");
const { fetchScheduleSectionData, parseScheduleSectionData } = require("../utils/schedule-section");
const { fetchHtmlFromJKT48, parseVideoData } = require("../utils/video");
const { sendLogToDiscord } = require("../other/discordLogger");

const scrapeData = () => {
  // Simulating a scraping failure
  throw new Error("Scraping failed!");
};

router.get("/schedule", async (req, res) => {
  try {
    const htmlData = await fetchData();
    const scheduleData = parseData(htmlData);
    res.json(scheduleData);
  } catch (error) {
    console.error("Error fetching or parsing schedule data:", error);
    const errorMessage = `Scraping schedule failed. Error: ${error.message}`;
    sendLogToDiscord(errorMessage, "Error");

    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/news", async (req, res) => {
  try {
    const htmlData = await fetchNewsData();
    const newsData = parseNewsData(htmlData);
    res.json(newsData);
  } catch (error) {
    console.error("Error fetching or parsing news data:", error);
    const errorMessage = `Scraping news failed. Error: ${error.message}`;
    sendLogToDiscord(errorMessage, "Error");

    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/events", async (req, res) => {
  try {
    const htmlData = await fetchSpecificData();
    const specificData = parseSpecificData(htmlData);
    res.status(200).json({ success: true, data: specificData });
  } catch (error) {
    console.error("Error fetching or parsing specific data:", error);
    const errorMessage = `Scraping events failed. Error: ${error.message}`;
    sendLogToDiscord(errorMessage, "Error");

    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/birthdays", async (req, res) => {
  try {
    const htmlData = await fetchBirthdayData();
    const birthdayData = parseBirthdayData(htmlData);
    res.json(birthdayData);
  } catch (error) {
    console.error("Error fetching or parsing birthday data:", error);
    const errorMessage = `Scraping birthdays failed. Error: ${error.message}`;
    sendLogToDiscord(errorMessage, "Error");

    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/schedule/section", async (req, res) => {
  try {
    const htmlData = await fetchScheduleSectionData();
    const teaterData = parseScheduleSectionData(htmlData);
    res.json(teaterData);
  } catch (error) {
    console.error("Error fetching or parsing schedule section data:", error);
    const errorMessage = `Scraping schedule section failed. Error: ${error.message}`;
    sendLogToDiscord(errorMessage, "Error");

    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/video", async (req, res) => {
  try {
    const htmlData = await fetchHtmlFromJKT48();
    const videoData = parseVideoData(htmlData);
    res.json(videoData);
  } catch (error) {
    console.error("Error fetching or parsing video data:", error);
    const errorMessage = `Scraping video data failed. Error: ${error.message}`;
    sendLogToDiscord(errorMessage, "Error");

    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/member/:id", async (req, res) => {
  const memberId = req.params.id;
  try {
    const memberHtmlData = await fetchMemberDataId(memberId);
    const memberData = parseMemberDataId(memberHtmlData);

    const socialMediaHtmlData = await fetchMemberSocialMediaId(memberId);
    const socialMediaData = parseMemberSocialMediaId(socialMediaHtmlData);

    const combinedData = { ...memberData, socialMedia: socialMediaData };

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching or parsing member data:", error);
    const errorMessage = `Scraping member data failed. Error: ${error.message}`;
    sendLogToDiscord(errorMessage, "Error");

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
    const errorMessage = `Scraping news data failed. Error: ${error.message}`;
    sendLogToDiscord(errorMessage, "Error");

    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/member", async (req, res) => {
  try {
    const html = await fetchMemberData();
    const members = parseMemberData(html);
    res.json({ members });
  } catch (error) {
    console.error("Error fetching or parsing member data:", error);
    const errorMessage = `Scraping member data failed. Error: ${error.message}`;
    sendLogToDiscord(errorMessage, "Error");

    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/banners", async (req, res) => {
  try {
    const html = await fetchBannerData("https://jkt48.com");
    const banners = parseBannerData(html);
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    console.error("Error fetching or parsing banner data:", error);
    const errorMessage = `Scraping banners data failed. Error: ${error.message}`;
    sendLogToDiscord(errorMessage, "Error");

    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
