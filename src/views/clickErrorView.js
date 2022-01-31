'use strict';

export const createErrorElement = (isLast, clickedNode) => {
  
  const element = document.createElement('p');

  switch (clickedNode) {
    case 'option' :
      element.innerHTML = 'You have already made your choice. One time is enough!';
      break;
    case 'button' :
      element.innerHTML = String.raw`
      To see ${
      isLast ? 'the result' : 'the next Q'
      }, please first select an answer for this ${isLast ? 'last Q' : 'one'}.`;
      break;
  }

  return element;
};
