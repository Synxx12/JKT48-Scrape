const axios = require("axios");
const cheerio = require("cheerio");

// Function to map month numbers to month abbreviations
const mapMonthNumberToAbbreviation = (monthNumber) => {
  const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  return monthAbbreviations[parseInt(monthNumber, 10) - 1];
};

const fetchScheduleSectionData = async () => {
  const url = "https://jkt48.com/";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

const parseScheduleSectionData = (html) => {
  const $ = cheerio.load(html);
  const data = [];
  const tableBody = $(".entry-schedule__calendar table tbody");
  const rows = tableBody.find("tr");

  rows.each((index, element) => {
    const row = $(element);
    const columns = row.find("td");

    const dateInfo = columns.eq(0).find("h3").text().trim();
    const [tanggal, monthNumber] = dateInfo.split("/");

    // Convert month number to month abbreviation
    const monthAbbrev = mapMonthNumberToAbbreviation(monthNumber);

    const formattedDay = dateInfo.split("(")[1].replace(")", "").trim(); // Extract and clean up the day

    const events = [];
    columns.each((index, column) => {
      if (index > 0) {
        const eventColumns = $(column).find(".contents");

        eventColumns.each((eventIndex, eventColumn) => {
          const badgeImg = $(eventColumn).find("span.badge img").attr("src");
          const eventName = $(eventColumn).find("p a").text().trim();
          const eventUrl = $(eventColumn).find("p a").attr("href");

          events.push({
            badgeUrl: badgeImg,
            eventName,
            eventUrl,
          });
        });
      }
    });

    data.push({
      tanggal,
      hari: formattedDay,
      bulan: monthAbbrev,
      events,
    });
  });

  return data;
};

module.exports = {
  fetchScheduleSectionData,
  parseScheduleSectionData,
};
