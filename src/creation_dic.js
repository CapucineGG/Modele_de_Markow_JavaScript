import fs from "fs";
import * as R from "ramda"; // npm i ramda --save

// 1) Lire le fichier
const rawText = fs.readFileSync("data/conte.txt", "utf-8");

// 2) Supprimer info nulles Gutenberg
const removeGutenbergHeader = (texte) => {
	const start = texte.indexOf("*** START");
	const end = texte.indexOf("*** END");

	if (start !== -1 && end !== -1) {
		return texte.slice(start, end);
	}
	return texte;
};

// 2) Nettoyer le texte
const cleanText = R.pipe(
    R.toLower,
    R.replace(/\n/g, " "),
    R.replace(/[.,!?;:()«»"]/g, ""),
    R.replace(/['']/g, " "),
    R.replace(/[^a-zàâäéèêëîïôöùûüçœæ\s]/gi, ""),
    R.split(/\s+/),
    R.filter(Boolean),
);

// 3) Compter les occurrences
const countWords = R.countBy(R.identity);

// 4) Normaliser entre 0 et 1
const normalizeOccurrences = (occurrences) => {
    const total = R.pipe(
        Object.values,
        R.sum,
    )(occurrences);

    return R.map(
        (count) => Number((count / total).toFixed(5)),
        occurrences,
    );
};

// 5) Créer le fichier JSON
const createJsonFile = (fileName) => (data) => {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2), "utf-8");
    return data;
};

// Exécution
const words = R.pipe(
    removeGutenbergHeader,
    cleanText,
)(rawText);

const occurrences = countWords(words);
const normalizedOccurrences = normalizeOccurrences(occurrences);

console.log("Nombre de mots :", words.length);
console.log("Nombre de mots uniques :", Object.keys(occurrences).length);

createJsonFile("data/dictionnaire.json")(normalizedOccurrences);
