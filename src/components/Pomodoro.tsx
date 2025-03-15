import { useState, useEffect, SyntheticEvent } from 'react'
import { Button } from '@/components/ui/button'
import Timer from '@/components/reusable/Timer/'

import { converTime } from '@/helpers/utils'
import { ListRestartIcon, PauseIcon, PlayIcon } from 'lucide-react'

enum TIMERANGES {
  BREAK = 5 * 60 * 1000,
  QUARTER = 15 * 60 * 1000,
  HALF = 30 * 60 * 1000,
  HOUR = 60 * 60 * 1000,
}
const Pomodoro = () => {
  // eslint-disable-next-line
  const [mode] = useState(TIMERANGES.HALF)
  const [focusTimer, setFocusTimer] = useState(TIMERANGES.HALF)
  const [timerPausable, setTimerPausable] = useState<boolean>(false)
  const [breakTimer, setBreakTimer] = useState(TIMERANGES.BREAK)
  const [isActive, setIsActive] = useState(false)
  const [activeTab, setActiveTab] = useState<undefined | string>('focusTimer')

  useEffect(() => {
    let timerInterval: NodeJS.Timeout
    if (isActive && focusTimer > 0)
      timerInterval = setInterval(() => {
        return activeTab === 'focusTimer'
          ? setFocusTimer((prev) => prev - 1000)
          : setBreakTimer((prev) => prev - 1000)
      }, 1000)

    return () => {
      clearInterval(timerInterval)
    }
  }, [isActive])

  const handleTabChange = (e: SyntheticEvent<HTMLButtonElement>) => {
    const tabTarget = e.currentTarget?.dataset?.tabTarget
    setActiveTab(tabTarget)
    // handleReset()
  }

  const pauseTimers = () => {
    setIsActive(!isActive)
    setTimerPausable(!timerPausable)
  }

  const handleReset = () => {
    setIsActive(false)
    setFocusTimer(mode)
    setBreakTimer(TIMERANGES.BREAK)
    setTimerPausable(false)
  }
  return (
    <>
      <div className="col-span-full flex flex-col items-center justify-center">
        <div
          className="flex justify-center rounded-full items-center space-x-4 my-4 py-2 px-2 border-2 border-slate-700"
          data-tabs="tabs"
          role="list"
        >
          <Button
            className={`tabs ${activeTab === 'focusTimer' ? 'bg-white text-sky-500 hover:bg-red-50' : 'bg-gray-50/10 text-white/10'} p-2 rounded-full`}
            id="focusTab"
            data-tab-target="focusTimer"
            role="tab"
            aria-selected="true"
            onClick={handleTabChange}
          >
            Focus
          </Button>
          <Button
            className={`tabs ${activeTab === 'breakTimer' ? 'bg-white text-sky-500 hover:bg-red-50' : 'bg-gray-50/10 text-white/10'} p-2 rounded-full`}
            id="BreakTab"
            data-tab-target="breakTimer"
            role="tab"
            aria-selected="false"
            onClick={handleTabChange}
          >
            Break
          </Button>
        </div>
        <div className="w-full px-12">
          <section>
            <div
              id="focusTimer"
              className={`${activeTab === 'breakTimer' && 'hidden'}`}
            >
              <Timer timer={converTime(focusTimer)} />
            </div>
          </section>
          <section>
            <div
              id="breakTimer"
              className={`${activeTab === 'focusTimer' && 'hidden'}`}
            >
              <Timer timer={converTime(breakTimer)} />
            </div>
          </section>
        </div>
        <div className="flex flex-row gap-2 my-4">
          <Button
            className="text-slate-200"
            onClick={() => {
              pauseTimers()
            }}
          >
            {!isActive ? (
              <span className="flex items-center justify-center p-2 gap-2">
                Start <PlayIcon />{' '}
              </span>
            ) : (
              <span className="flex items-center justify-center p-2 gap-2">
                Pause <PauseIcon />{' '}
              </span>
            )}
          </Button>

          <Button
            className="text-slate-200"
            disabled={!isActive && timerPausable}
            onClick={handleReset}
          >
            <span className="flex items-center justify-center p-2 gap-2">
              Reset <ListRestartIcon />{' '}
            </span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Pomodoro
