const axios = require("axios");
const cheerio = require("cheerio");

// Fungsi untuk mengambil HTML dari URL
const fetchNewsSearchData = async (page) => {
  const url = `https://jkt48.com/news/list?page=${page}&lang=id`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
};

// Fungsi untuk mengekstrak data berita dari HTML
const parseNewsSearchData = (html) => {
  const $ = cheerio.load(html);
  const newsList = [];

  $(".entry-news__list--item").each((index, element) => {
    const $element = $(element);
    const labelImgSrc = $element.find(".entry-news__list--label img").attr("src");
    const title = $element.find("h3 a").text();
    const link = $element.find("h3 a").attr("href");
    const time = $element.find("time").text();

    // Memasukkan data berita ke dalam array
    newsList.push({
      labelImgSrc,
      title,
      link,
      time,
    });
  });

  return newsList;
};

module.exports = {
  fetchNewsSearchData,
  parseNewsSearchData,
};
