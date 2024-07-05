import { createRequire } from "module";
const require = createRequire(import.meta.url);

const Sentiment = require("sentiment");
const sentiment = new Sentiment();

export const getSentiment = async (message) => {
  console.log(message, "<<<< message body received in getSentiment");

  const result = sentiment.analyze(message);

  console.log(result, "<<<< getSentiment result");

  if (result < 0) {
    return "negativee";
  } else {
    return "positive";
  }
};
