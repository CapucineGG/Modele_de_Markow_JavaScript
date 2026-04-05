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

console.log(predictNextWord("il"));
console.log(predictNextWord("elle"));
console.log(predictNextWord("grand"));
