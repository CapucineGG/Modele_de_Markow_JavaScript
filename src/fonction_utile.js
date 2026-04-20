import fs from "fs";
import * as R from "ramda";

const removeGutenbergHeader = (texte) => {
	const start = texte.indexOf("*** START");
	const end = texte.indexOf("*** END");

	if (start !== -1 && end !== -1) {
		return texte.slice(start, end);
	}
	return texte;
};

const cleanText = R.pipe(
	R.toLower,
	R.replace(/\n/g, " "),
	R.replace(/[.,!?;:()«»"]/g, ""),
	R.replace(/'/g, " "),
	R.replace(/[^a-zàâäéèêëîïôöùûüçœæ\s]/gi, ""),
	R.split(/\s+/),
	R.filter(Boolean),
);

const createJsonFile = R.curry((fileName, data) => {
	fs.writeFileSync(fileName, JSON.stringify(data, null, 2), "utf-8");
	return data;
});

export { cleanText, createJsonFile, removeGutenbergHeader };
