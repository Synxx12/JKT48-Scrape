const axios = require("axios");
const cheerio = require("cheerio");
const fetchEventData = async () => {
  const url = "https://jkt48.com/calendar/list";
  const result = await axios.get(url);
  return result.data;
};

const parseEventData = (html) => {
  const $ = cheerio.load(html);

  const eventData = [];

  $(".entry-schedule__calendar tbody tr").each((index, element) => {
    const date = $(element).find("td h3").text().trim();
    const title = $(element).find("td .contents p a").text().trim();
    const link = $(element).find("td .contents p a").attr("href");

    eventData.push({
      date,
      title,
      link,
    });
  });

  return eventData;
};

module.exports = { fetchEventData, parseEventData };
