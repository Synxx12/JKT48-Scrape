const axios = require("axios");
const cheerio = require("cheerio");

const fetchBannerData = async () => {
  const url = "https://jkt48.com/";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

const parseBannerData = (html) => {
  const $ = cheerio.load(html);

  const divMain = $("section");
  const listSlidersMentah = divMain.find(".hero-home a");

  const listSlider = [];

  listSlidersMentah.each((index, element) => {
    const model = {};
    const sliderMentah = $(element);

    model["value"] = sliderMentah.attr("href");

    const img = sliderMentah.find("img");
    if (img.attr("src")) {
      model["img_url"] = img.attr("src");
    }

    listSlider.push(model);
  });

  return listSlider;
};

module.exports = {
  fetchBannerData,
  parseBannerData,
};
