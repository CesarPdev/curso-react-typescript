import React, { MouseEventHandler } from 'react'

type Button = {text: string, action: MouseEventHandler}

function Button({text, action}:Button): JSX.Element {
  return (
    <button
        className="border rounded-md p-2 bg-blue-300 shadow-lg text-white"
        onClick={action}
    >
        {text}
    </button>
  )
}

export default Button