// utils/specificScrape.js
const axios = require("axios");
const cheerio = require("cheerio");

const fetchSpecificData = async () => {
  const url = "https://jkt48.com/calendar/list?lang=id";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

const parseSpecificData = (html) => {
  const $ = cheerio.load(html);

  const tableBody = $("tbody");
  const rows = tableBody.find("tr");

  const bulan_tahun = $(".entry-schedule__header--center").text().trim();

  const lists = [];
  const size = rows.length;
  let x = 0;

  while (x < size) {
    const model = {};
    model["bulan_tahun"] = bulan_tahun;

    const list_td = rows.eq(x).find("td");

    const tanggal_mentah = list_td.eq(0).find("h3").text();

    const tanggal_rplc = tanggal_mentah.replace(")", "");
    const tanggal_spl = tanggal_rplc.split("(");

    if (tanggal_spl.length > 0) {
      const tanggal = tanggal_spl[0];
      // console.log('tanggal ' + tanggal);

      model["tanggal"] = tanggal;
    }

    if (tanggal_spl.length >= 1) {
      const hari = tanggal_spl[1];

      model["hari"] = hari;
    }

    const list_event = list_td.eq(1).find("div");
    const size_of_event = list_event.length;
    let position_event = 0;

    while (position_event < size_of_event) {
      const event = list_event.eq(position_event);

      const badge_span = event.find("span");
      const badge_img = badge_span.find("img");
      if (badge_img.attr("src")) {
        model["badge_url"] = badge_img.attr("src");
      }

      const event_name_full = event.find("p").text().trim();
      const event_name = event_name_full.slice(6);

      model["event_name"] = event_name;
      const event_jam = event_name_full.slice(0, 5);

      model["event_time"] = event_jam;

      const url_event_full = event.find("a").attr("href");
      const url_event_full_rplc = url_event_full.replace("?lang=id", "");
      const url_event_full_rplc_2 = url_event_full_rplc.replace("/theater/schedule/id/", "");

      model["event_id"] = url_event_full_rplc_2;
      model["have_event"] = true;

      lists.push(model);
      position_event += 1;
    }

    if (size_of_event === 0) {
      model["have_event"] = false;
      lists.push(model);
    }
    x += 1;
  }

  return lists;
};

module.exports = {
  fetchSpecificData,
  parseSpecificData,
};
