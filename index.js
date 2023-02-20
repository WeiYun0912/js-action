const core = require("@actions/core");
const github = require("@actions/github");
const { Toolkit } = require("actions-toolkit");
const fs = require("fs");
// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput("sitemap");
//   console.log(`Hello ${nameToGreet}!`);
//   console.log(getAPIData());
//   const time = new Date().toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2);
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }

Toolkit.run(async (tools) => {
  tools.log.debug("Edit README.md Start...");

  const readmeContent = fs.readFileSync("./README.md", "utf-8").split("\n");
  console.log(readmeContent);
  tools.exit.success("down.");
});
