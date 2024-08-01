import React from 'react'
import illustration from '../assets/illustration.svg'

function GuestLayout({children}) {
  return (
    <>
    <div className='flex w-full justify-center items-center gap-2'>

    <div className='w-full p-5'>
     <img src={illustration} className='w-full' />
    </div>

    <div  className='w-full'>
      {children}
    </div>
    </div>
    </>
    
  )
}

export default GuestLayout