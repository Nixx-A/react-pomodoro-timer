import { useEffect, useState } from 'react'
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai'
import { BiReset } from 'react-icons/bi'
import './Timer.css'

export function Timer() {
  const [timerDuration, setTimerDuration] = useState(25)
  const [minutesBreak, setMinutesBreak] = useState(5)
  const [timeRemaining, setTimeRemaining] = useState(timerDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [circleDash, setCircleDash] = useState('')

  const play = () => {
    document.querySelector('#beep').play()
  }

  useEffect(() => {
    let intervalId

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 0) {
            setIsBreak(!isBreak)
            play()
            return isBreak ? timerDuration * 60 : minutesBreak * 60
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [isRunning, isBreak, timerDuration])

  useEffect(() => {
    setCircleDash(calculateTimeFraction())
  }, [timeRemaining])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)

  const handleReset = () => {
    setIsRunning(false)
    setIsBreak(false)
    setTimeRemaining(timerDuration * 60)
  }

  const handleSubstractTime = () => {
    if (timerDuration === 1) {
      return
    }
    setTimerDuration(timerDuration - 1)
    setTimeRemaining(timeRemaining - 60)
  }

  const handleAddTime = () => {
    setTimerDuration(timerDuration + 1)
    setTimeRemaining(timeRemaining + 60)
  }

  const handleSubstractBreak = () => {
    if (minutesBreak === 1) {
      return
    }
    setMinutesBreak(minutesBreak - 1)
  }

  const handleAddBreak = () => {
    setMinutesBreak(minutesBreak + 1)
  }

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  function calculateTimeFraction() {
    const operation = ((timeRemaining / (timerDuration * 60)) * 283).toFixed(0)
    return `${operation} 283`
  }

  return (
    <>
      <div className='flex w-full justify-evenly mt-8'>
        <section className=''>
          <div>
            <h2 className='text-center text-3xl poppins'>Timer</h2>
          </div>
          <div className='flex  justify-evenly items-center mt-2 '>
            <button
              className='relative bottom-1 w-6 text-5xl mr-1.5'
              onClick={handleSubstractTime}>
              -
            </button>
            <p className='inline text-4xl'>{timerDuration}</p>
            <button className='w-6 text-4xl ml-1.5' onClick={handleAddTime}>
              +
            </button>
          </div>
        </section>
        <div className='flex items-center '>
          <AiOutlinePauseCircle
            className='cursor-pointer mx-4 text-6xl hover:text-gray-400 duration-200'
            onClick={handlePause}
          />
          <AiOutlinePlayCircle
            className='cursor-pointer mx-4 text-6xl hover:text-gray-400 duration-200'
            onClick={handleStart}
          />
          <BiReset
            className=' text-white cursor-pointer mx-4 text-6xl hover:text-gray-400 duration-200'
            onClick={handleReset}
          />
        </div>
        <section>
          <div>
            <h2 className='text-center text-3xl poppins'>Break</h2>
          </div>
          <div className='flex justify-evenly mt-2 items-center'>
            <button
              className='relative bottom-1 w-6 text-5xl mr-1.5'
              onClick={handleSubstractBreak}>
              -
            </button>
            <p className='inline text-4xl'>{minutesBreak}</p>
            <button className='w-6 text-4xl ml-1.5' onClick={handleAddBreak}>
              +
            </button>
          </div>
          <audio
            id='beep'
            preload='auto'
            src='https://freesound.org/data/previews/411/411482_2154914-lq.mp3'
          />
        </section>
      </div>
      <div className='base-timer flex justify-center w-full mt-8'>
        <svg
          className='base-timer__svg'
          viewBox='0 0 100 100'
          xmlns='http://www.w3.org/2000/svg'>
          <g className='base-timer__circle'>
            <circle
              className='base-timer__path-elapsed'
              cx='50'
              cy='50'
              r='45'
            />
            <path
              id='base-timer-path-remaining'
              strokeDasharray={circleDash}
              className='base-timer__path-remaining'
              d='
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        '></path>
          </g>
        </svg>
        <span id='base-timer-label' className='base-timer__label'>
          <p>{isBreak ? 'Break' : 'Work'}</p>
          {formatTime(timeRemaining)}
        </span>
      </div>
    </>
  )
}
