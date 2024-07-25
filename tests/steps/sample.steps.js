import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Page from '../../src/app/page'

export function openThePage () {
  render(<Page />)
}

export function getTitle () {
  const title = screen.getByTestId('app-title')
  return title.innerHTML
}
