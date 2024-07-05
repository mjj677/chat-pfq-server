import { createRequire } from "module";
const require = createRequire(import.meta.url);

const nlp = require("node-nlp");
const compromise = require("compromise");
const natural = require("natural");

const tokenizer = new natural.WordTokenizer();

export const preProcessText = async (msg) => {
  const emojiRegex = /:\b\w+:/gi;
  const lowercaseFeedback = msg.toLowerCase();

  const sentenceWithoutEmojis = nlp.removeEmojis(lowercaseFeedback);

  const filteredSentence = sentenceWithoutEmojis.replace(emojiRegex, "");

  const punctuationTokens = tokenizer.tokenize(filteredSentence);

  const stopWords = new Set(natural.stopwords);

  let filteredTokens = punctuationTokens
    .filter((token) => {
      return !stopWords.has(token);
    })
    .join(" ");

  const lemmatizer = compromise(filteredTokens);
  lemmatizer.compute("root");

  const roots = lemmatizer.json()[0].terms.map((word) => {
    return word.root || word.normal;
  });

  const processedText = roots.join(" ");

  return processedText;
};
