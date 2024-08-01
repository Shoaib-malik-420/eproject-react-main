import React from 'react'
import { Link } from 'react-router-dom'
import { HiMiniUserGroup } from "react-icons/hi2";

export default function Dashboard() {
  return (
    <>
    
    
   
 
 <div class="flex flex-row space-x-4 mt-9 pl-56">
    <div class="flex flex-col justify-between p-4 leading-normal bg-white rounded-lg shadow-md w-80">
    <div class="flex justify-center items-center mb-4">
        <HiMiniUserGroup size={80} className='' />
    </div>
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>

    <div class="flex flex-col justify-between p-4 leading-normal bg-white rounded-lg shadow-md w-80">
    <div class="flex justify-center items-center mb-4">
        <HiMiniUserGroup size={80} className='' />
    </div>
    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
</div>


    
</div>

<div className='flex flex-row pl-96 mt-4'>
<div class="flex flex-col justify-between p-4 leading-normal bg-white rounded-lg shadow-md w-80">
    <div class="flex justify-center items-center mb-4">
        <HiMiniUserGroup size={80} className='' />
    </div>
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>

</div>

    </>
  )
}
