// src/utils/newsScraper.js
const axios = require("axios");
const cheerio = require("cheerio");

const fetchNewsData = async () => {
  const url = "https://jkt48.com/news/list";
  const result = await axios.get(url);
  return result.data;
};

const parseNewsData = (html) => {
  const $ = cheerio.load(html);

  const newsData = [];

  $(".entry-news__list--item").each((index, element) => {
    const labelIcon = $(element).find(".entry-news__list--label img").attr("src");
    const title = $(element).find("h3 a").text().trim();
    const date = $(element).find("time").text().trim();

    newsData.push({
      labelIcon,
      title,
      date,
    });
  });

  return newsData;
};

module.exports = { fetchNewsData, parseNewsData };
