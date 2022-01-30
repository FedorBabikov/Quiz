'use strict';

import { RESTART_BUTTON_ID } from '../constants.js';

export const createResultElement = (correctSum, wrongSum, timeScore) => {
  const element = document.createElement('div');
  element.id = "result-interface";
  element.innerHTML = String.raw`
        <h1>Congratulations!</h1>
        <p>You finished the JavaScript quiz</p>
        <p>Correct answers:<span> ${correctSum}/10</span></p>
        <p>Wrong answers: <span>${wrongSum}</span></p>
        <p>Fast answering: <span>${timeScore}/10</span> points</p>
        <p>For more about JavaScript, visit:</p>
        <a href="https://www.w3schools.com/" class="link reference-link">https://w3schools.com</a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" class="link reference-link">MDN-WebDocs/javascript</a>
        <a href="https://javascript.info/" class="link reference-link">https://javascript.info</a>
        <button class ="btn" id="${RESTART_BUTTON_ID}">Try again</button>
    `;
  return element;
};
