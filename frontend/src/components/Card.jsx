import React from 'react'


function Card({title,body}) {
  return (
    <div className='border-gray-950 rounded-sm	border-2	p-3 shadow-lg bg-slate-200 shadow-orange-600'>
      <h5>{title}</h5>
      <p className="mt-2">{body}</p>
    </div>
  )
}

export default Card