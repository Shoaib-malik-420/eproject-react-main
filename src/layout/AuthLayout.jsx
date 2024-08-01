import axios from 'axios';
import React, { useEffect, useState ,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Drawer from './../components/Drawer';

const API_URL = import.meta.env.VITE_API_URL
function AuthLayout({children}) {

    const [openmenu , setOpenmenu] = useState(false);
    const [opendrawer , setOpendrawer] = useState(false);

    const navigate = useNavigate();

   const [auth, setAuth] = useState(false); 

    const checkToken = () =>{
        const token = localStorage.getItem('token');
       
        if (token) {
            axios.post(`${API_URL}auth/isvalidtoken`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {

                setAuth(true); 
            })
            .catch(error => {
                navigate('/login')
            });
        } else {

            navigate('/login')
        }
    }

    const logout = ()=>{
        const token = localStorage.getItem('token');
       
        if (token) {
            axios.post(`${API_URL}auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                navigate('/login')
            })
            .catch(error => {
                navigate('/login')
            });
        } else {
            navigate('/login')
        }
    }
    checkToken();
  return (
    <>


    <div className='flex w-full'>
        {opendrawer &&
        <div id="drawer" className='w-[300px] animate-slide-right '>
          <Drawer/>
        </div>
    }

        <div className='w-full px-5'>
            
    <div className='w-full flex justify-between items-center  bg-white shadow-xl px-3 py-2 rounded-xl'>
   

    {opendrawer ? <MdClose  size={30}   onClick={()=>setOpendrawer(!opendrawer)} /> :  <RxHamburgerMenu size={30} 
    onClick={()=>setOpendrawer(!opendrawer)}
    className=''
    /> }

    <button type="button" className='cursor-pointer'
    onClick={()=>setOpenmenu(!openmenu)}
    id="menu-button" aria-expanded="true" aria-haspopup="true">
    <IoPersonCircleOutline className='text-[29px] hover:text-[30px]' />
    </button>
    </div>

{openmenu &&
    <div class="absolute right-20 z-10 mt-2 w-50 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="py-1 text-left" role="none">

        <a href="#" onClick={()=>{logout()}} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">Logout</a>
      
    </div>
  </div>
}


    {auth ?  children : null}
        </div>

    </div>

    </>
  )
}

export default AuthLayout