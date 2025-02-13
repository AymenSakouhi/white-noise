import React from 'react'

import Slot from '@/components/reusable/Timer/Slot'

type TimerProps = {
  timer: string
}

const BACKGROUNDIMAGE = 'https://pagedone.io/asset/uploads/1710565658.jpg'

const Timer: React.FC<TimerProps> = ({ timer }) => {
  // shout out to tony for the destructuring hint
  const [minutes, seconds] = timer.split(':')

  return (
    <div
      className={`h-96 rounded-2xl flex gap-9 flex-col items-center justify-center bg-cover bg-center`}
      style={{ backgroundImage: `url(${BACKGROUNDIMAGE})` }}
    >
      <div className="flex items-start justify-center w-full gap-1.5 count-down-main">
        <Slot
          {...{
            title: 'Minutes',
            value: minutes,
          }}
        />
        <Slot
          {...{
            title: 'Seconds',
            value: seconds,
          }}
        />
      </div>
    </div>
  )
}

export default Timer
