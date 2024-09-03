export function getBoard (mockData, rows, columns) {
  let newBoard
  if (mockData) {
    newBoard = createNewBoardFromMockData(mockData)
  } else {
    newBoard = createNewBoard(rows, columns)
  }
  return newBoard
}

function createNewBoard (rows, columns) {
  const board = []
  let cardNumbers = []

  for (let i = 1; i <= (rows * columns) / 2; i++) {
    cardNumbers.push(i)
    cardNumbers.push(i)
  }

  cardNumbers = shuffleArray(cardNumbers)
  let cardIndex = 0

  for (let row = 0; row < rows; row += 1) {
    board.push([])
    for (let column = 0; column < columns; column += 1) {
      board[row].push({
        y: row,
        x: column,
        cardNumber: cardNumbers[cardIndex]
      })
      cardIndex++
    }
  }
  return board
}

function createNewBoardFromMockData (mockData) {
  const board = []
  let parsedMockData = mockData
  if (typeof mockData === 'string' && mockData.includes('|')) {
    parsedMockData = parseMockDataToString(mockData)
  }
  if (validateMockData(parsedMockData)) {
    let mockBoard = parsedMockData.split('-')
    mockBoard = mockBoard.map((row) => { return row.split('') })
    for (let row = 0; row < mockBoard.length; row += 1) {
      board.push([])
      for (let column = 0; column < mockBoard[0].length; column += 1) {
        board[row].push({
          y: row,
          x: column,
          cardNumber: mockBoard[row][column]
        })
      }
    }
  }
  return board
}

function parseMockDataToString (data) {
  let strData = data.split(/\r?\n/).join('-')
  strData = strData.replaceAll(' ', '')
  strData = strData.replaceAll('|', '')
  while (strData[strData.length - 1] === '-') {
    strData = strData.slice(0, -1)
  }
  return strData
}

function validateMockData (mockData) {
  let isValidaData = true
  if (mockData === undefined || mockData == '' || typeof mockData !== 'string') {
    isValidaData = false
  } else {
    if (mockData.includes('-')) {
      isValidaData = validateMockDataRows(mockData.split('-'))
    }
  }
  return isValidaData
}

function validateMockDataRows (mockDataRow) {
  const newLocal = '^[[1-9]*'
  const regex = new RegExp(newLocal)
  return regex.test(mockDataRow)
}

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
