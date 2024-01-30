const axios = require("axios");
const cheerio = require("cheerio");

const fetchMemberData = async () => {
  const url = "https://jkt48.com/member/list?lang=id";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

const parseMemberData = (html) => {
  const $ = cheerio.load(html);

  const div_main = $(".col-lg-9.order-1.order-lg-2.entry-contents__main-area");
  const kategori_mentah = div_main.find("h2");
  const size_of_kategori = kategori_mentah.length;
  let position_of_kategori = 0;
  const list_of_kategori = [];
  const list_member = [];

  while (position_of_kategori < size_of_kategori) {
    const kategori = kategori_mentah.eq(position_of_kategori).text();
    list_of_kategori.push(kategori);
    position_of_kategori += 1;
  }

  const root_member_all_mentah = div_main.find(".row.row-all-10");
  const size_of_div_member = root_member_all_mentah.length;
  let position_of_div_member = 0;

  while (position_of_div_member < size_of_div_member) {
    const list_div_member = root_member_all_mentah.eq(position_of_div_member).find(".entry-member");
    const size_of_member = list_div_member.length;
    let position_of_member = 0;

    while (position_of_member < size_of_member) {
      const model = {};
      const member = list_div_member.eq(position_of_member);

      const nama_member_mentah = member.find("p").find("a").text();
      const nama_member = nama_member_mentah.replace(/(\w)([A-Z])/g, "$1 $2");
      model["nama_member"] = nama_member;

      const url_member_full = member.find("a").attr("href");
      const url_member_full_rplc = url_member_full.replace("?lang=id", "");
      const url_member_full_rplc_2 = url_member_full_rplc.replace("/member/detail/id/", "");
      model["id_member"] = url_member_full_rplc_2;

      const ava_member_mentah = member.find("a").find("img");
      if (ava_member_mentah.attr("src")) {
        const ava_member = ava_member_mentah.attr("src");
        model["ava_member"] = ava_member;
      }

      model["kategori"] = list_of_kategori[position_of_div_member];
      list_member.push(model);
      position_of_member += 1;
    }
    position_of_div_member += 1;
  }

  return {
    member: list_member,
  };
};

module.exports = {
  fetchMemberData,
  parseMemberData,
};
