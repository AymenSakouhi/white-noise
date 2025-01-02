import { useState, useEffect, SyntheticEvent } from 'react'
import { converTime } from '@/helpers/utils'

enum TIMERANGES {
  BREAK = 5 * 60 * 1000,
  QUARTER = 15 * 60 * 1000,
  HALF = 30 * 60 * 1000,
  HOUR = 60 * 60 * 1000,
}
const Pomodoro = () => {
  const [mode, setMode] = useState(TIMERANGES.QUARTER)
  const [timer, setTimer] = useState(TIMERANGES.QUARTER)
  const [timerPausable, setTimerPausable] = useState<boolean>(false)
  const [breakTimer, setBreakTimer] = useState(TIMERANGES.BREAK)
  const [isActive, setIsActive] = useState(false)
  const [activeTab, setActiveTab] = useState('focusTimer')

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

  const handleTabChange = (e: SyntheticEvent<HTMLButtonElement>) => {
    const tabTarget = e.currentTarget?.dataset?.tabTarget
    setActiveTab(tabTarget)
  }

  const handleTimer = () => {
    setIsActive(!isActive)
    setTimerPausable(!timerPausable)
  }

  const handleReset = () => {
    setIsActive(false)
    setTimer(mode)
    setTimerPausable(false)
  }
  return (
    <>
      <div className="col-span-full flex flex-col items-center justify-center">
        <div
          className="flex justify-center items-center space-x-2 my-2"
          data-tabs="tabs"
          role="list"
        >
          <button
            className="tabs p-2 border-2 border-sky-50"
            id="focusTab"
            data-tab-target="focusTimer"
            role="tab"
            aria-selected="true"
            onClick={handleTabChange}
          >
            Focus
          </button>
          <button
            className="tabs p-2 border-2 border-sky-50"
            id="BreakTab"
            data-tab-target="breakTimer"
            role="tab"
            aria-selected="false"
            onClick={handleTabChange}
          >
            Break
          </button>
        </div>
        <div>
          <section>
            <div
              id="focusTimer"
              className={`text-9xl text-white bg-teal-600 ${activeTab === 'breakTimer' && 'hidden'}`}
            >
              {converTime(timer)}
            </div>
          </section>
          <section>
            <div
              id="breakTimer"
              className={`text-9xl text-white bg-teal-600 ${activeTab === 'focusTimer' && 'hidden'}`}
            >
              {converTime(breakTimer)}
            </div>
          </section>
        </div>
        <div className="flex flex-row gap-2">
          <button
            onClick={() => {
              handleTimer()
            }}
          >
            {!isActive ? 'Start' : 'Pause'}
          </button>

          <button disabled={!isActive && timerPausable} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  )
}

export default Pomodoro
