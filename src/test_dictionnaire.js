import * as R from "ramda";
import dictionnaire from "../data/dictionnaire.json" with { type: "json" };

const predict = (prefix, n = 5) =>
	R.pipe(
		Object.entries,
		R.filter(([word]) => word.startsWith(prefix)),
		R.sortBy(([, freq]) => -freq),
		R.take(n),
		R.map(([word, freq]) => ({ word, freq })),
	)(dictionnaire);

const displayPrediction = (prefix) => {
	console.log(`Début de mot '${prefix}' :`);
	console.log(predict(prefix));
	console.log();
};

displayPrediction("bea");
displayPrediction("ma");
displayPrediction("par");
