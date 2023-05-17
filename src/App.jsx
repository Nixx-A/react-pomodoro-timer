import './App.css'
import { Timer } from './Components/Timer'

function App() {
  return (
    <main className='bg-[#0f2027] h-screen w-screen text-white overflow-hidden'>
      <h1 className='text-4xl mt-8 text-center font-playflair'>Pomodoro timer</h1>
      <Timer />
    </main>
  )
}

export default App
