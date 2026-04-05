import fs from "fs";
import * as R from "ramda";
import { cleanText, removeGutenbergHeader } from "./fonction_utile.js";

const files = ["data/conte.txt", "data/fables_de_la_fontaines.txt"];

const rawText = files
	.map((file) => fs.readFileSync(file, "utf-8"))
	.map(removeGutenbergHeader)
	.join(" ");

const buildPredictions = (words) => {
	const acc = {};
	for (let i = 0; i < words.length - 1; i++) {
		const current = words[i];
		const next = words[i + 1];
		if (!acc[current]) acc[current] = {};
		acc[current][next] = (acc[current][next] ?? 0) + 1;
	}
	return acc;
};

const normalizePredictions = R.map((nextWords) => {
	const total = R.sum(Object.values(nextWords));
	return R.map((count) => Number((count / total).toFixed(5)), nextWords);
});

const createJsonFile = R.curry((fileName, data) => {
	fs.writeFileSync(fileName, JSON.stringify(data, null, 2), "utf-8");
	return data;
});

const words = cleanText(rawText);
const predictions = buildPredictions(words);

console.log("Nombre de prédictions :", Object.keys(predictions).length);

createJsonFile("data/predictions.json")(normalizePredictions(predictions));
