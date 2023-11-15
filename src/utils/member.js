const axios = require("axios");
const cheerio = require("cheerio");

const fetchMemberData = async (memberId) => {
  try {
    const response = await axios.get(`https://jkt48.com/member/detail/id/${memberId}?lang=id`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const parseMemberData = (html) => {
  const $ = cheerio.load(html);
  const memberData = {};

  memberData.name = $(".entry-mypage__item--content").eq(0).text().trim();
  memberData.birthdate = $(".entry-mypage__item--content").eq(1).text().trim();
  memberData.bloodType = $(".entry-mypage__item--content").eq(2).text().trim();
  memberData.zodiac = $(".entry-mypage__item--content").eq(3).text().trim();
  memberData.height = $(".entry-mypage__item--content").eq(4).text().trim();
  memberData.nickname = $(".entry-mypage__item--content").eq(5).text().trim();

  return memberData;
};

const fetchMemberSocialMedia = async (id) => {
  try {
    const response = await axios.get(`https://jkt48.com/member/detail/id/${id}?lang=id`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const parseMemberSocialMedia = (html) => {
  const $ = cheerio.load(html);

  const socialMedia = {
    twitter: $("#twitterprofile").find("a").attr("href"),
    instagram: $(".entry-mypage__history").find("a[href*='instagram']").attr("href"),
    tiktok: $(".entry-mypage__history").find("a[href*='tiktok']").attr("href"),
  };

  if (socialMedia.twitter) {
    const twitterUsername = socialMedia.twitter.replace("https://twitter.com/", "").replace("https://www.twitter.com/", "");
    socialMedia.twitter = `https://x.com/${twitterUsername}/`;
  }

  return socialMedia;
};

module.exports = { fetchMemberData, parseMemberData, fetchMemberSocialMedia, parseMemberSocialMedia };
