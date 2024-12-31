import { useCallback, useState, useEffect } from 'react'
import { converTime } from '@/helpers/utils'

enum TIMERANGES {
  QUARTER = 15 * 60 * 1000,
  HALF = 30 * 60 * 1000,
  HOUR = 60 * 60 * 1000,
}
const Pomodoro = () => {
  const [mode, setMode] = useState(TIMERANGES.QUARTER)
  const [timer, setTimer] = useState(TIMERANGES.QUARTER)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let timerInterval: NodeJS.Timeout
    if (isActive && timer > 0)
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1000)
      }, 1000)

    return () => {
      clearInterval(timerInterval)
    }
  }, [isActive, timer])

  const handleTimer = () => {
    setIsActive(!isActive)
  }

  const handleReset = () => {
    setIsActive(false)
    setTimer(mode)
  }
  return (
    <>
      <div className="col-span-full flex flex-col items-center justify-center">
        <div className="flex justify-center items-center space-x-2">
          <button className="tabs">Focus</button>
          <button className="tabs">Break</button>
        </div>
        <section>
          <div id="timer" className="text-9xl text-white bg-teal-600">
            {converTime(timer)}
          </div>
        </section>
        <button
          onClick={() => {
            handleTimer('HALF')
          }}
        >
          {!isActive ? 'Start' : 'Pause'}
        </button>

        <button disabled={!isActive} onClick={handleReset}>
          Reset
        </button>
      </div>
    </>
  )
}

export default Pomodoro
