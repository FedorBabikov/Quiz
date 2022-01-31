'use strict';

import { ANSWERS_LIST_ID, REFERENCE_LIST_ID, NEXT_QUESTION_BUTTON_ID, GET_RESULT_BUTTON_ID, TIMER_ELEMENT_ID } from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { setTimer } from '../views/timerView.js';
import { createErrorElement } from '../views/clickErrorView.js';
import { quizData } from '../data.js';
import { router } from '../router.js';
import { createReferenceElement } from '../views/referenceView.js';

export const initQuestionPage = (userInterface, refresh = '') => {
  if (refresh === '') {
    const { currentQuestionIndex, wrongSum, correctSum, timeScore } = quizData;

    const session = {
      currentQuestionIndex,
      wrongSum,
      correctSum,
      timeScore,
    };

    sessionStorage.setItem(
      `question${quizData.currentQuestionIndex}`,
      JSON.stringify(session)
    );
  } else {
    const session = JSON.parse(sessionStorage.getItem(refresh));

    quizData.currentQuestionIndex = session.currentQuestionIndex;
    quizData.wrongSum = session.wrongSum;
    quizData.correctSum = session.correctSum;
    quizData.timeScore = session.timeScore;
  }

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex++];
  let optionClicked = false;
  let clickCountButton = 0;
  let clickCountOption = 0;

  const questionElement = createQuestionElement(
    currentQuestion.text,
    isLastQuestion()
  );

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answerElement.setAttribute('data-key', key);
    answersListElement.appendChild(answerElement);
  }

  for (const option of answersListElement.children) {
    option.addEventListener('click', chooseAnswer);
  }

  setTimer();

  const reference = document.getElementById(REFERENCE_LIST_ID);

  for (const link of currentQuestion.links) {
    const referenceElement = createReferenceElement(link.text, link.href);
    reference.appendChild(referenceElement);
  };

  document
    .getElementById(
      isLastQuestion() ? GET_RESULT_BUTTON_ID : NEXT_QUESTION_BUTTON_ID
    )
    .addEventListener('click', function () {
      nextStep(optionClicked);
    });

  // Service functions

  function chooseAnswer(e) {
    optionClicked = true;
    clickCountOption++
    const timer = document.getElementById(TIMER_ELEMENT_ID);
    const timeLeft = timer.innerHTML.slice(3);
    const clickError = document.getElementById('error');

    if (clickCountOption <= 1) {
      currentQuestion.selected = e.target.dataset.key;
      
      if (currentQuestion.selected !== currentQuestion.correct) {
        e.target.classList.add('wrong-select');
        quizData.wrongSum++;
      } else {
        e.target.classList.add('correct-select');
        quizData.correctSum++;
      }
      if (currentQuestion.selected === currentQuestion.correct) {
        if (timeLeft > 30) {
          quizData.timeScore++;
        }
      }
      const correctAnswer = document.querySelector(
        `li[data-key="${currentQuestion.correct}"]`
      );
      correctAnswer.style.backgroundColor = 'green';
  
      for (const option of answersListElement.children) {
        option.style.color = "black";
      }
  
      if (!!clickError) {
        clickError.remove();
      }

    } else {
        if (!!clickError) {
          clickError.innerHTML = 'You have already made your choice. One time is enough!';
        } else {
          showError('option');
        }
    }
  }

  function nextStep(optionClicked) {
    clickCountButton++;
    if (!optionClicked) {
      if (clickCountButton < 2) {
        showError('button');
      }
    } else {
      sessionStorage.removeItem(`question${quizData.currentQuestionIndex - 1}`);
      isLastQuestion() ? router('result') : router('question');
    }
  }

  function showError(clickedNode) {
    const clickError = createErrorElement(isLastQuestion(), clickedNode);
    clickError.classList.add('error');
    clickError.setAttribute('id', 'error');

    const questionElement = document.getElementById('question-interface');
    questionElement.appendChild(clickError);
  }

  function isLastQuestion() {
  return quizData.currentQuestionIndex < quizData.questions.length
    ? false
    : true;
  }

};