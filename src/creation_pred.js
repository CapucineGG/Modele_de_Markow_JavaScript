import fs from "fs";
import * as R from "ramda";
import {
	cleanText,
	createJsonFile,
	removeGutenbergHeader,
} from "./fonction_utile.js";

const files = [
	"../data/conte.txt",
	"../data/fables_de_la_fontaines.txt",
	"../data/maupassant.txt",
];

const rawText = R.pipe(
	R.map((file) => fs.readFileSync(file, "utf-8")),
	R.map(removeGutenbergHeader),
	R.join(" "),
)(files);

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

const words = cleanText(rawText);
const predictions = buildPredictions(words);

console.log("Nombre de prédictions :", Object.keys(predictions).length);

createJsonFile("../data/predictions.json")(normalizePredictions(predictions));
