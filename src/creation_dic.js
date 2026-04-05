import fs from "fs";
import * as R from "ramda"; // npm i ramda --save
import { cleanText, removeGutenbergHeader } from "./fonction_utile.js";

// 1) Lire le fichier
const files = ["data/conte.txt", "data/fables_de_la_fontaines.txt"];

const rawText = files
	.map((file) => fs.readFileSync(file, "utf-8"))
	.map(removeGutenbergHeader)
	.join(" ");

// 1) Lire le fichier
//const rawText = fs.readFileSync("data/conte.txt", "utf-8");

// 2) Compter les occurrences
const countWords = R.countBy(R.identity);

// 3) Normaliser entre 0 et 1
const normalizeOccurrences = (occurrences) => {
	const total = R.pipe(Object.values, R.sum)(occurrences);

	return R.map((count) => Number((count / total).toFixed(5)), occurrences);
};

// 4) Créer le fichier JSON
const createJsonFile = (fileName) => (data) => {
	fs.writeFileSync(fileName, JSON.stringify(data, null, 2), "utf-8");
	return data;
};

// Exécution
const words = cleanText(rawText);

const occurrences = countWords(words);
const normalizedOccurrences = normalizeOccurrences(occurrences);

console.log("Nombre de mots :", words.length);
console.log("Nombre de mots uniques :", Object.keys(occurrences).length);

createJsonFile("data/dictionnaire.json")(normalizedOccurrences);
