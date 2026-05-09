import * as R from "ramda";
import predictions from "../data/predictions2.json" with { type: "json" };

const predictNextWord = (word1, word2, n = 5) =>
	R.pipe(
		R.prop(`${word1.toLowerCase()} ${word2.toLowerCase()}`),
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

const displayPrediction = (word1, word2) => {
	console.log(`Paire '${word1} ${word2}' :`);
	console.log(predictNextWord(word1, word2));
	console.log();
};

displayPrediction("il", "était");
displayPrediction("je", "vais");
displayPrediction("de", "la");
