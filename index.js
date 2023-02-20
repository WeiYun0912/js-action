const core = require("@actions/core");
const github = require("@actions/github");
const { Toolkit } = require("actions-toolkit");
const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

const MAX_LINES = core.getInput("MAX_LINES");

const baseUrl = "https://weiyun0912.github.io";

async function getBlogOutline() {
  const { data } = await axios.get(
    "https://weiyun0912.github.io/Wei-Docusaurus/docs/intro"
  );

  const $ = cheerio.load(data);

  const outline = [];

  const Logs = $("h1:contains('Logs')").next().children();

  Logs.each((_, el) => {
    const logDetail = {
      title: "",
      link: "",
    };

    logDetail.title = $(el).text();
    logDetail.link = baseUrl + $(el).children().attr("href");

    outline.push(logDetail);
  });

  const outlineFilter = outline.slice(0, "5");
  console.log(outlineFilter);
  return outlineFilter;
}

Toolkit.run(async (tools) => {
  tools.log.debug("Edit README.md Start...");

  const readmeContent = fs.readFileSync("./README.md", "utf-8").split("\n");

  //find update comments
  let startIndex = readmeContent.findIndex(
    (content) => content.trim() === "<!-- UPDATE_WEISITE:START -->"
  );

  // not exists
  if (startIndex === -1)
    return tools.exit.failure("Not Found Start Update Comments");

  let endIndex = readmeContent.findIndex(
    (content) => content.trim() === "<!-- UPDATE_WEISITE:END -->"
  );

  if (endIndex === -1)
    return tools.exit.failure("Not Found End Update Comments");

  const outline = await getBlogOutline();
  if (startIndex !== -1 && endIndex !== -1) {
    startIndex++; //next line

    outline.forEach((o, index) => {
      readmeContent.splice(
        startIndex + index,
        0,
        `- ${o.title} [連結](${o.link})`
      );
    });

    // readmeContent.splice(
    //   startIndex + activitys.length,
    //   0,
    //   "<!-- UPDATE_WEISITE:END -->"
    // );

    fs.writeFileSync("./README.md", readmeContent.join("\n"));
  }

  tools.exit.success("down.");
});
