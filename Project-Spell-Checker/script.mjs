// This is a placeholder file which shows how you can access JSON data defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getDictionarySize, checkWordsInDictionary, addWordToDictionary } from "./common.mjs";

export function initUI() {
    const main = document.querySelector("main");
    window.onload = function () {
        const title = this.document.createElement("h1");
        title.textContent = "Basic English Spell Checker";
        main.append(title);
        const section = document.createElement("section");
        main.append(section);
        const label = document.createElement("label");
        label.htmlFor = "text-input";
        label.textContent = "Enter text to check:";
        section.append(label);
        const textarea = document.createElement("textarea");
        textarea.id = "text-input";
        textarea.placeholder = "Put you text here if you want to check it";
        section.append(textarea);
        const button = document.createElement("button");
        button.classList.add("check");
        button.textContent = "check";
        section.append(button);
        const resultDiv = document.createElement("div");
        section.append(resultDiv);
    
        textarea.addEventListener("input", () => {
            resultDiv.innerHTML = "";
        });
        button.addEventListener("click", () => {

            const wordsArray = splitTheText(textarea.value);
            const checkedWords = checkWordsInDictionary(wordsArray);
            renderResult(checkedWords, resultDiv)
        })
    };
}
function customDictionarySize() {
    const main = document.querySelector("main");
    if (main.querySelector("p")) {
        const paragraph = main.querySelector("p");
        paragraph.textContent = `There are ${getDictionarySize()} words in the Basic English dictionary`;
    } else {
        const paragraph = document.createElement("p");
        paragraph.textContent = `There are ${getDictionarySize()} words in the Basic English dictionary`;
        main.append(paragraph);
    }
}
export function renderResult(checkedWords, container) {
    container.innerHTML = "";

    checkedWords.forEach(item => {
        const span = document.createElement("span");
        span.textContent = item.word;


        if (!item.isCorrect && item.word[0] !== item.word[0].toUpperCase()) {
            span.classList.add("misspelled");
            const addButton = document.createElement("button")
            addButton.textContent = "add to dictionary";
            addButton.addEventListener("click", () => {
                addWordToDictionary(item.word);
                customDictionarySize()
                span.style.textDecoration = "none";
                addButton.remove();
            })
            span.append(addButton);
        }

        container.append(span);
        container.append(" ");
    });
}

export function splitTheText(text) {
    return text
        .replace(/[^\w\s]/g, "")
        .trim()
        .split(/\s+/);
}