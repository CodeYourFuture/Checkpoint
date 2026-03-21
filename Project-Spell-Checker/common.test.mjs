import { getDictionarySize, checkWordsInDictionary, addWordToDictionary } from "./common.mjs";
import { renderResult, splitTheText } from "./script.mjs";

import assert from "node:assert";
import test from "node:test";

test("Dictionary size is correct", () => {
  assert.equal(getDictionarySize(), 856);
});
test("Known words are marked as correct", () => {
  const result = checkWordsInDictionary(["he", "go", "island"]);

  result.forEach(item => {
    assert.equal(item.isCorrect, true);
  });
});
test("Unknown word is marked as incorrect", () => {
  const result = checkWordsInDictionary(["hello"]);

  assert.equal(result[0].isCorrect, false);
});
test("Case-insensitive check", () => {
  const result = checkWordsInDictionary(["He", "GO", "IsLaNd"]);
  result.forEach(item => {
    assert.equal(item.isCorrect, true);
  });
});

test("Mixed known and unknown words", () => {
  const result = checkWordsInDictionary(["he", "hello", "go", "world"]);
  assert.equal(result[0].isCorrect, true);
  assert.equal(result[1].isCorrect, false);
  assert.equal(result[2].isCorrect, true);
  assert.equal(result[3].isCorrect, false);
});

test("Adding a new word to the dictionary", () => {
  const newWord = "testword";
  addWordToDictionary(newWord);
  const result = checkWordsInDictionary([newWord]);
  assert.equal(result[0].isCorrect, true);
});

test("Adding a new word is case-insensitive", () => {
  const newWord = "AnotherTestWord";
  addWordToDictionary(newWord);
  const result = checkWordsInDictionary([newWord.toLowerCase()]);
  assert.equal(result[0].isCorrect, true);
});

test("Adding a word that already exists does not change the dictionary size", () => {
  const initialSize = getDictionarySize();
  addWordToDictionary("he");
  const newSize = getDictionarySize();
  assert.equal(initialSize, newSize);
});
test("Splitting text into words", () => {
  const text = "Hello, world! This is a test.";
  const expectedWords = ["Hello", "world", "This", "is", "a", "test"];
  const result = splitTheText(text);
  assert.deepEqual(result, expectedWords);
});

test("Splitting text with multiple spaces and punctuation", () => {
  const text = "Hello...   world! This is a test.";
  const expectedWords = ["Hello", "world", "This", "is", "a", "test"];
  const result = splitTheText(text);
  assert.deepEqual(result, expectedWords);
});
