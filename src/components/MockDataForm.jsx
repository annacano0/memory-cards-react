import { useState } from 'react'

export default function MockDataForm ({ setNewMockData }) {
  const [mockData, setMockData] = useState('| 2 | 1 |\n| 1 | 2 |')

  function handleSubmit (e) {
    e.preventDefault()
    setNewMockData(mockData)
  }

  function handleInputChange (e) {
    setMockData(e.target.value)
  }

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <textarea data-testid='mock-data-input' value={mockData} onChange={(event) => handleInputChange(event)} type='text' />
        <button data-testid='mock-data-submit'>Submit</button>
      </form>
    </>
  )
}
