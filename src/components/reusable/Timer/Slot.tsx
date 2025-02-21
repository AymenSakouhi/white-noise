import React from 'react'

type slotProps = {
  title: string
  value: string
}

const Slot: React.FC<slotProps> = ({ title, value }) => {
  return (
    <div className="timer">
      <div className="rounded-xl bg-black/25 backdrop-blur-sm py-3 min-w-[96px] flex items-center justify-center flex-col gap-1 px-3">
        <h3 className="countdown-element hours font-manrope font-semibold text-6xl text-white text-center">
          {value}
        </h3>
        <p className="text-2xl uppercase font-normal text-white mt-1 text-center w-full">
          {title}
        </p>
      </div>
    </div>
  )
}

export default Slot
