import { createRequire } from "module";
const require = createRequire(import.meta.url);

const natural = require("natural");

const loadModel = () => {
  return new Promise((resolve, reject) => {
    natural.BayesClassifier.load("model.json", null, (err, classifier) => {
      if (err) {
        reject(err);
      } else {
        resolve(classifier);
      }
    });
  });
};

export const classifyMessage = async (message) => {
  const classifier = await loadModel();
  return classifier.classify(message);
};


