import { createRequire } from "module";
const require = createRequire(import.meta.url);

const natural = require("natural")
const feedback = require("./training/feedback.json")

const classifier = new natural.BayesClassifier();

export const trainModel = async () => {

    feedback.feedback.forEach((message) => {
        classifier.addDocument(message.message, message.subject)
    });

    classifier.train()

    classifier.save('subjectModel.json', (err, classifier) => {
        if (err) {
            console.log("Error:", err)
        } else {
            console.log("Successfully saved model.")
        }
    });

    return classifier
}