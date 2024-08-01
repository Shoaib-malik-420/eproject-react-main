import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'Yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URL
function Login() {

  const navigate = useNavigate();
  return (
   <>



<Formik
initialValues={{
    email : '' , password: '' 
}}

validationSchema={Yup.object({
    email : Yup.string().email().required(),
    password : Yup.string().required(),
})}

onSubmit={ async (values)=>{

    await axios.post(`${API_URL}auth/login`,values)
    .then((response)=>{
        const token = response.data["token"]
        localStorage.setItem('token',token)
        toast.success("Login successfully")
        navigate('/');
    })
    .catch((error)=>{
        console.log(error)
        toast.error(error.response.data.message)
    })
}}

>
<Form class="max-w-sm mx-auto">
<div className='pb-6 text-left'>
 <p className='font-bold text-2xl'>Welcome back</p>
 <p className='font-thin text-sm text-black'>Start your website in seconds. Don’t have an account? <Link to={'/register'}><span class="text-blue-700 font-semibold">Sign up</span></Link> .</p>
</div>
  <div class="mb-5 text-left">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <Field name="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
    <ErrorMessage name="email" component={"div"} className='text-red-500' />
  </div>
  <div class="mb-5 text-left">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <Field name="password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    <ErrorMessage name="password" component={"div"} className='text-red-500' />
  </div>

  <button type="submit" class="text-white flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</Form>
</Formik>
</>
  )
}

export default Login