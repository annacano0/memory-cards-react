'use client'
import { useState, useEffect } from 'react'

import MockDataForm from './MockDataForm'
import Board from './Board'

export default function Game () {
  const [mockData, setMockData] = useState('')
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  function handleKeyPress (e) {
    if (e.ctrlKey && e.key.toUpperCase() === 'M') {
      setMockDataFormVisible(!mockDataFormVisible)
    }
  }

  function handleMockData (newMockData) {
    setMockData(newMockData)
  }

  return (
    <>
      {mockDataFormVisible && <MockDataForm setNewMockData={handleMockData} />}
      <Board mockData={mockData} />
    </>
  )
}
