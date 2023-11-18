const axios = require("axios");
const cheerio = require("cheerio");

const fetchMemberDataCard = async () => {
  const url = "https://jkt48.com/member/list?lang=id";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
};

const parseMemberDataCard = (html) => {
  const $ = cheerio.load(html);
  const memberList = [];

  $(".entry-member").each((index, element) => {
    const $element = $(element);
    const imgSrc = $element.find("img").attr("src");
    const name = $element.find(".entry-member__name a").text();
    const profileLink = $element.find(".entry-member__name a").attr("href");

    memberList.push({
      imgSrc,
      name,
      profileLink,
    });
  });

  return memberList;
};

module.exports = {
  fetchMemberDataCard,
  parseMemberDataCard,
};
