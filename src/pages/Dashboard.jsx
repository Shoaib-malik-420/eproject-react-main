import React from 'react'
import { Link } from 'react-router-dom'
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";


export default function Dashboard() {
  return (
    <>
    
   
 
    <div class="flex w-full flex-row space-x-4 mt-9 px-10">
    <div class=" h-70 p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <h5 class="mb-2 text-xl font-semibold tracking-tight  text-gray-500 dark:text-gray-400 text-left">Request</h5>
        </a>
        <div class="flex-row flex justify-between">
            <p class="font-normal text-black text-4xl font-semibold">4</p>
            <div className='bg-orange-600 rounded-xl p-4 text-white'><FaRegUser size="28" /></div>
        </div>
        <h5 class="text-md font-semibold tracking-tight  text-gray-500 dark:text-gray-400 text-left">Total Request</h5>

    </div>

    <div class="h-70 p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <h5 class="mb-2 text-xl font-semibold tracking-tight  text-gray-500 dark:text-gray-400 text-left">Consignment</h5>
        </a>
        <div class="flex-row flex justify-between">
            <p class="font-normal text-black text-4xl font-semibold">1</p>
            <div className='bg-orange-600 rounded-xl p-4 text-white'><FaRegUser size="28" /></div>
        </div>
        <h5 class="text-md font-semibold tracking-tight  text-gray-500 dark:text-gray-400 text-left">Total Consignment</h5>

    </div>


    <div class="h-70 p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <h5 class="mb-2 text-xl font-semibold tracking-tight  text-gray-500 dark:text-gray-400 text-left">Users</h5>
        </a>
        <div class="flex-row flex justify-between">
            <p class=" font-normal text-black text-4xl font-semibold">2</p>
            <div className='bg-orange-600 rounded-xl p-4 text-white'><FaRegUser size="28" /></div>
        </div>
        <h5 class="text-md font-semibold tracking-tight  text-gray-500 dark:text-gray-400 text-left">Total User</h5>

    </div>

            </div>
    </>
  )
}
