import { render, screen, fireEvent } from '@testing-library/react'
import Page from '../../src/app/page'
import Game from '../../src/components/Game'

// sample tests
export function openThePage () {
  render(<Page />)
}

export function getTitle () {
  const title = screen.getByTestId('app-title')
  return title.innerHTML
}
// game tests
export function openTheGame () {
  render(<Game />)
}

export function boardDimensionsValidation (rows, cols) {
  let validBoard = false
  const cards = screen.getAllByTestId('board-card', { exact: false })
  if (cards.length === rows * cols) validBoard = true
  return validBoard
}

export function allCardsUnflipped() {
  let cards = screen.getAllByTestId('board-card', { exact: false });
  return cards.every(card => {
    return card.classList.contains('unflipped');
  });
}

export function setMockData(mockData) {
    let data=mockData.trim()
    fireEvent.keyDown(screen.getByTestId('board'), {
      key: 'm',
      keyCode: 77,
      which: 77,
      code: 'KeyM',
      location: 0,
      altKey: false,
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
      repeat: false
    })

    let textInput = screen.getByTestId('mock-data-input')
    let submitButton = screen.getByTestId('mock-data-submit')
    fireEvent.change(textInput, { target: { value: data}})
    fireEvent.click(submitButton)
}

export function leftClickCard(rowPosition, colPosition){
  let card = screen.getByTestId("board-card"+ rowPosition +"-"+colPosition)
  fireEvent.click(card)
}

export function checkCardIsFlipped(rowPosition, colPosition) {
    let card = screen.getByTestId(`board-card${rowPosition}-${colPosition}`);
    return !card.classList.contains("unflipped");
}

export function addTimeout(seconds) {
  return new Promise(resolve => {
    setTimeout(() => {
        resolve();
    }, seconds * 1000);
});
}
