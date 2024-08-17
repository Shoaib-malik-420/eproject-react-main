import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const API_URL = import.meta.env.VITE_API_URL
function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', contact: '123-456-7890', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', contact: '098-765-4321', role: 'Exhibitor' },
    // Add more users as needed
  ]);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setIsDeleteModalOpen(false);
  };

  const [data , setData] = useState([]);


  const fetchUser = () =>{
      const token = localStorage.getItem('token');       
      if (token) {
          axios.get(`${API_URL}user`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          .then(response => {
              console.log(response);
               setData(response.data.users) 
          })
          .catch(error => {
              alert("Fetching Error")
          });
      } else {
          navigate('/login')
      }
  }


  const deleteUser = async (id) =>{
    const token = localStorage.getItem('token');       
    if (token) {
      await  axios.delete(`${API_URL}user/delete/`+id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {console.log(response)
            toast.success(response.data.message)
            setDeleteUserId(null)
            setIsDeleteModalOpen(false)
            fetchUser();
        })
        .catch(error => {
          toast.error(error.response.data.message)
        });
    } else {
        navigate('/login')
    }
}

  useEffect(()=>{
      fetchUser();
  },[])


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Create
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>

              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {data.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{user.email}</td>

                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{user.role}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">
                  <div
                    onClick={() => {
                        setDeleteUserId(user._id);
                        setIsDeleteModalOpen(true);
                      }}
                  className="inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                    <FaTrashAlt/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-70">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 mx-4 my-10">
            <h2 className="text-xl font-semibold mb-4">Create New User</h2>
            <Formik 
            validationSchema={Yup.object({
              name : Yup.string().required(),
              email : Yup.string().email().required(),
              password : Yup.string().required(),
          
          })}
            initialValues={{name:'',email:'',password:'',role:''}}
            onSubmit={async(values)=>{
              const token = localStorage.getItem('token'); 
              await axios.post(`${API_URL}user/create`,values,{
                headers: {
                  Authorization: `Bearer ${token}`
              }
              })
              .then((response)=>{
                  fetchUser();
                  toast.success("Registered successfully")
                 
                  setIsModalOpen(false)
              
              })
              .catch((error)=>{
                toast.error(error.response.data.message)
              })
            }}
            >
            <Form >
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"

                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                    required
                  />
                  <ErrorMessage name='name' className='text-red-500' />
                </div>
                <div className="w-1/2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"

                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                    required
                  />
                  <ErrorMessage name='email' className='text-red-500' />
                </div>
              </div>
      
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"

                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                  required
                />
                 <ErrorMessage name='password' className='text-red-500' />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Role</label>
                <Field as="select"
                  id="role"
                  name="role"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                  required
                >
                  <option value="">Select role</option>
                  <option value="admin">Admin</option>
                  <option value="Exhibitor">Exhibitor</option>
                  <option value="Attendee">Attendee</option>
                </Field>
                <ErrorMessage name='role' className='text-red-500' />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </Form>
            </Formik>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-70">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 mx-4 my-10">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deleteUser(deleteUserId)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;