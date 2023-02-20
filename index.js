const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

const getAPIData = async () => {
  const data = await axios.get("https://jsonplaceholder.typicode.com/posts");
  console.log(data);
};

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("sitemap");
  console.log(`Hello ${nameToGreet}!`);
  console.log(getAPIData);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
