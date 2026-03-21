import words from "./words.json" with { type: "json" };

const dictionarySet = new Set(
    words.map(word => word.toLowerCase())
);
export const getDictionarySize = () => dictionarySet.size;

export function checkWordsInDictionary(wordsArray) {
    return wordsArray.map(word => ({
        word,
        isCorrect: dictionarySet.has(word.toLowerCase())
    }));
}

export function addWordToDictionary(word) {
    dictionarySet.add(word.toLowerCase());
}