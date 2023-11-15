const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async () => {
  const url = "https://jkt48.com/theater/schedule";
  const result = await axios.get(url);
  return result.data;
};

const parseData = (html) => {
  const $ = cheerio.load(html);

  const table = $(".table");
  const scheduleData = [];

  table.find("tbody tr").each((index, element) => {
    const showInfoFull = $(element).find("td:nth-child(1)").text().trim();
    const setlist = $(element).find("td:nth-child(2)").text().trim();
    const members = $(element)
      .find("td:nth-child(3) a")
      .map((i, el) => $(el).text().trim())
      .get();

    if (showInfoFull.includes("Show")) {
      const showInfo = parseShowInfo(showInfoFull);
      scheduleData.push({
        showInfo,
        setlist,
        members,
      });
    } else {
      scheduleData.push({
        showInfo: showInfoFull,
        setlist,
        members: [],
      });
    }
  });

  return scheduleData;
};

const parseShowInfo = (showInfoFull) => {
  const regex = /(\w+), (\d{1,2}\.\d{1,2}\.\d{4})Show (\d{1,2}:\d{2})/;
  const match = showInfoFull.match(regex);
  if (match) {
    const day = match[1];
    const date = match[2];
    const time = match[3];
    return `${day}, ${date} ${time}`;
  }
  return showInfoFull;
};

module.exports = { fetchData, parseData, parseShowInfo };
