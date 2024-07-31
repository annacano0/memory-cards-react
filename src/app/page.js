import Game from '../components/Game.jsx'

export default function Home () {
  return (
    <>
      <h1 data-testid='app-title'>memory</h1>
      <Game />
    </>
  )
}
