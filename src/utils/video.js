const axios = require("axios");
const cheerio = require("cheerio");

async function fetchHtmlFromJKT48() {
  const url = "https://jkt48.com/";
  const response = await axios.get(url);
  return response.data;
}

function parseVideoData(html) {
  const $ = cheerio.load(html);
  const videos = [];

  $(".entry-home__video--item iframe").each((index, element) => {
    const videoUrl = $(element).attr("src");
    const videoTitle = $(element).attr("title");

    videos.push({
      title: videoTitle,
      url: videoUrl,
    });
  });

  return videos;
}

module.exports = {
  fetchHtmlFromJKT48,
  parseVideoData,
};
