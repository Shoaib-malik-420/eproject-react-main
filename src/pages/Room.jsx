import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const API_URL = import.meta.env.VITE_API_URL
function Room() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    availability: '',
    status: '',
    pricing: '',
  });
  const [rooms, setRooms] = useState([
    { id: 1, type: 'John Doe', availability: 'john.doe@example.com', status: '123-456-7890', pricing: 'Admin' },
    { id: 2, type: 'Jane Smith', availability: 'jane.smith@example.com', status: '098-765-4321', pricing: 'Exhibitor' },
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
    setUsers(rooms.filter(room => room.id !== id));
    setIsDeleteModalOpen(false);
  };

  const [data , setData] = useState([]);


  const fetchUser = () =>{
      const token = localStorage.getItem('token');       
      if (token) {
          axios.get(`${API_URL}room`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          .then(response => {
              console.log(response);
               setData(response.data.rooms) 
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
      await  axios.delete(`${API_URL}room/delete/`+id, {
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
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>

              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {data.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{user.type}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{user.availability}</td>

                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{user.status}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{user.pricing}</td>
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
            <h2 className="text-xl font-semibold mb-4">Create New Room</h2>
            <Formik 
            validationSchema={Yup.object({
              type : Yup.string().required(),
              availability : Yup.string().required(),
              status : Yup.string().required(),
              pricing : Yup.number().required(),

          
          })}
            initialValues={{type:'',availability:'',status:'',pricing:''}}
            onSubmit={async(values)=>{
              const token = localStorage.getItem('token'); 
              await axios.post(`${API_URL}room/create`,values,{
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Availability</label>
                  <Field
                    type="datetime-local"
                    id="availability"
                    name="availability"

                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                    required
                  />
                  <ErrorMessage name='availability' className='text-red-500' />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="room" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Type</label>
                <Field as="select"
                  id="type"
                  name="type"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                  required
                >
                  <option value="">Select Room Type</option>
                    <option value="admin">Business</option>
                    <option value="exhibitor">Lower AC</option>
                    <option value="attendee">Economy Class</option>
                </Field>
                <ErrorMessage name='type' className='text-red-500' />
              </div>

              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Status</label>
                <Field as="select"
                  id="status"
                  name="status"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                  required
                >
                    <option value="">Status</option>
                    <option value="admin">Cleaning</option>
                    <option value="exhibitor">Occupied</option>
                    <option value="attendee">Available</option>
                </Field>
                <ErrorMessage name='status' className='text-red-500' />
              </div>
              <div className="w-1/2">
                  <label htmlFor="pricing" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Pricing</label>
                  <Field
                    type="number"
                    step="any"
                    id="pricing"
                    name="pricing"

                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                    required
                  />
                  <ErrorMessage name='pricing' className='text-red-500' />
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

export default Room;