import fs from "fs";

// 1) Lire le fichier brut
const rawText = fs.readFileSync("conte.txt", "utf-8");

// 2) Supprimer header/footer Gutenberg
const removeGutenbergHeader = (texte) => {
	const start = texte.indexOf("*** START");
	const end = texte.indexOf("*** END");

	if (start !== -1 && end !== -1) {
		return texte.slice(start, end);
	}
	return texte;
};

// 👉 ICI on nettoie
const texte = removeGutenbergHeader(rawText);

// 2) Nettoyer le texte
const cleanText = (texte) => {
	return texte
		.toLowerCase()
		.replace(/\n/g, " ")
		.replace(/[.,!?;:()«»"]/g, "")
		.replace(/[’']/g, " ")
		.replace(/[^a-zàâäéèêëîïôöùûüçœæ\s]/gi, "")
		.split(/\s+/)
		.filter(Boolean);
};

// 3) Compter les occurrences
const countWords = (words) => {
	const occurrences = {};

	for (const word of words) {
		occurrences[word] = (occurrences[word] || 0) + 1;
	}

	return occurrences;
};

// 4) Normaliser entre 0 et 1
const normalizeOccurrences = (occurrences) => {
	const totalWords = Object.values(occurrences).reduce(
		(sum, count) => sum + count,
		0,
	);

	const normalized = {};

	for (const word in occurrences) {
		normalized[word] = Number(
			(occurrences[word] / totalWords).toFixed(5),
			//((occurrences[word] / totalWords) * 100).toFixed(2),
		);
	}

	return normalized;
};

// 5) Créer le fichier JSON
const createJsonFile = (data, fileName) => {
	fs.writeFileSync(fileName, JSON.stringify(data, null, 2), "utf-8");
};

// Exécution
const words = cleanText(texte);
const occurrences = countWords(words);
const normalizedOccurrences = normalizeOccurrences(occurrences);

console.log("Nombre de mots :", words.length);
console.log("Nombre de mots uniques :", Object.keys(occurrences).length);

createJsonFile(normalizedOccurrences, "dictionnaire.json");
