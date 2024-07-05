import { createRequire } from "module";
const require = createRequire(import.meta.url);

const Sentiment = require("sentiment");
const sentiment = new Sentiment();

export const getSentiment = async (message) => {

  const result = sentiment.analyze(message);

  if (result < 0) {
    return "negativee";
  } else {
    return "positive";
  }
};
