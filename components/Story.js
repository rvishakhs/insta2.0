
import React from 'react'

function Story({img, user}) {
  return (
    <div>
        <img
            className='rounded-full h-14 w-14 p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110  transition transform duration-150 ease-out'  
            src={img}
            alt=""
        />
        <p className='text-xs w-14 truncate text-center'>{user}</p>
    </div>
  )
}

export default Story