'use strict';

import { createResultElement } from '../views/resultView.js';
import { quizData } from '../data.js';
import { router } from '../router.js';
import { RESTART_BUTTON_ID } from '../constants.js';

export const resultPage = (userInterface, refresh = '') => {
  let resultElement;

  if (refresh === 'result') {
    resultElement = createResultElement(
      sessionStorage.correctSum,
      sessionStorage.wrongSum,
      sessionStorage.timeScore
    );
  } else {
    resultElement = createResultElement(
      quizData.correctSum,
      quizData.wrongSum,
      quizData.timeScore
    );
    sessionStorage.setItem('result', 'true');
    sessionStorage.setItem('correctSum', `${quizData.correctSum}`);
    sessionStorage.setItem('wrongSum', `${quizData.wrongSum}`);
    sessionStorage.setItem('timeScore', `${quizData.timeScore}`);
  }

  userInterface.appendChild(resultElement);
  document
    .getElementById(RESTART_BUTTON_ID)
    .addEventListener('click', restartApp);
  function restartApp() {
    refresh = '';
    quizData.wrongSum = 0;
    quizData.correctSum = 0;
    quizData.timeScore = 0;
    quizData.currentQuestionIndex = 0;
    sessionStorage.clear();
    router('welcome');
  }
};
