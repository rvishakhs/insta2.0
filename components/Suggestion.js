import React from 'react'

function Suggestion({user, avtar, company}) {
  return (
    <div className='flex items-center justify-between ml-10 m-3'>
        <img
            src={avtar}
            alt="pic"
            className='h-10 rounded-full border p-[2px]'
        />
        <div className='flex-1 ml-4'>
            <h2 className='font-semibold text-sm '>{user}</h2>
            <h3 className='text-sm text-gray-400 '>Working in {company}</h3>
        </div>

        <div>
            <button className='font-semibold text-blue-400'>Follow</button>
        </div>
    </div>
  )
}

export default Suggestion
