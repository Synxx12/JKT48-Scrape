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
    const htmlData = await fetchSpecificData();
    const specificData = parseSpecificData(htmlData);
    res.status(200).json({ success: true, data: specificData });
  } catch (error) {
    console.error("Error fetching or parsing specific data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
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
    const memberHtmlData = await fetchMemberDataId(memberId);
    const memberData = parseMemberDataId(memberHtmlData);

    const socialMediaHtmlData = await fetchMemberSocialMediaId(memberId);
    const socialMediaData = parseMemberSocialMediaId(socialMediaHtmlData);

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

router.get("/member", async (req, res) => {
  try {
    const html = await fetchMemberData();
    const members = parseMemberData(html);
    res.json({ members });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rute untuk scraping data banner
router.get("/banners", async (req, res) => {
  try {
    const html = await fetchBannerData("https://jkt48.com");
    const banners = parseBannerData(html);
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    console.error("Error fetching or parsing banner data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
