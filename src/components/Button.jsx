import React from 'react'

export function MyButton(props) {
  return (
    <button className="button" {...props}>
      {props.children}
    </button>
  )
}
