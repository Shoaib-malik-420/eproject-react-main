import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaRegUser } from 'react-icons/fa';
import axios from 'axios';
import { MdOutlineEventNote } from "react-icons/md";
import { MdOutlineDoorSliding } from "react-icons/md";
const API_URL = import.meta.env.VITE_API_URL
const rechartsData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];



export default function Dashboard() {

  
const [data , setData] = useState([]);


const fetch = () =>{
    const token = localStorage.getItem('token');       
    if (token) {
        axios.get(`${API_URL}dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
             setData(response.data) 
        })
        .catch(error => {
            alert("Fetching Error")
        });
    } else {
        navigate('/login')
    }
}


useEffect(()=>{
  fetch();
},[])

  return (
    <>
      <div className="flex w-full flex-row space-x-4 mt-9 px-10">
        <div className="h-70 p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-500 dark:text-gray-400 text-left">Rooms</h5>
          </a>
          <div className="flex-row flex justify-between">
            <p className="font-normal text-black text-4xl font-semibold">{data.totalrooms}</p>
            <div className="bg-orange-600 rounded-xl p-4 text-white"><MdOutlineDoorSliding size="28" /></div>
          </div>
          <h5 className="text-md font-semibold tracking-tight text-gray-500 dark:text-gray-400 text-left">Total Request</h5>
        </div>

        <div className="h-70 p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-500 dark:text-gray-400 text-left">Bookings</h5>
          </a>
          <div className="flex-row flex justify-between">
            <p className="font-normal text-black text-4xl font-semibold">{data.totalbookings}</p>
            <div className="bg-orange-600 rounded-xl p-4 text-white"><MdOutlineEventNote size="28" /></div>
          </div>
          <h5 className="text-md font-semibold tracking-tight text-gray-500 dark:text-gray-400 text-left">Total Consignment</h5>
        </div>

        <div className="h-70 p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-500 dark:text-gray-400 text-left">Users</h5>
          </a>
          <div className="flex-row flex justify-between">
            <p className="font-normal text-black text-4xl font-semibold">{data.totalusers}</p>
            <div className="bg-orange-600 rounded-xl p-4 text-white"><FaRegUser size="28" /></div>
          </div>
          <h5 className="text-md font-semibold tracking-tight text-gray-500 dark:text-gray-400 text-left">Total User</h5>
        </div>
      </div>
      
      <div className='h-70 my-4 p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className="w-full mt-10 px-10">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={rechartsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>
    </>
  );
}
