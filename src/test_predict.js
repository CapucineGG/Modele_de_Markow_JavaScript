import * as R from "ramda";
import predictions from "../data/predictions.json" with { type: "json" };

const predictNextWord = (word, n = 5) =>
	R.pipe(
		R.prop(word.toLowerCase()),
		R.ifElse(
			R.isNil,
			() => [],
			R.pipe(
				Object.entries,
				R.sortBy(([, freq]) => -freq),
				R.take(n),
				R.map(([nextWord, freq]) => ({ word: nextWord, freq })),
			),
		),
	)(predictions);

const displayPrediction = (word) => {
	console.log(`Mot '${word}' :`);
	console.log(predictNextWord(word));
	console.log();
};

displayPrediction("il");
displayPrediction("manger");
displayPrediction("pour");
