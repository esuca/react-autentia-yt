import React from 'react'

export function Filters(props) {
  return (
    <div>
      Filters:
      <button onClick={() => props.changeOrder('ASC')}>ASC 👆</button>
      <button onClick={() => props.changeOrder('DESC')}>DESC 👇</button>
    </div>
  )
}
