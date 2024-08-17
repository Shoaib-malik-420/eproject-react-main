import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const API_URL = import.meta.env.VITE_API_URL;

function Booking() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Fetch user data from the API
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${API_URL}user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.users); // Adjust based on your API response structure
      } else {
        // Handle case where token is missing, e.g., redirect to login
      }
    } catch (error) {
      toast.error("Error fetching data");
      console.error("Fetching error: ", error);
    }
  };
  const fetchBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${API_URL}booking`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data.bookings); // Adjust based on your API response structure
      } else {
        // Handle case where token is missing, e.g., redirect to login
      }
    } catch (error) {
      toast.error("Error fetching data");
      console.error("Fetching error: ", error);
    }
  };
 
 
  const fetchRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${API_URL}room`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Adjust based on your API response structure
        setRooms(response.data.rooms); // Assuming the API response has a 'rooms' property
      } else {
        // Handle case where token is missing, e.g., redirect to login
        toast.error("Authentication token is missing");
      }
    } catch (error) {
      toast.error("Error fetching room data");
      console.error("Fetching error: ", error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.delete(`${API_URL}room/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("User deleted successfully");
        setDeleteUserId(null);
        setIsDeleteModalOpen(false);
        fetchUser(); // Refresh the user list
      } else {
        // Handle case where token is missing, e.g., redirect to login
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchRoom();
  }, []);
  useEffect(() => {
    fetchBooking();
  }, []);
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
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Created at</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {bookings.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{user.useremail}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{user.status}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{user.room}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{user.createdat}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">
                  <div
                    onClick={() => {
                      setDeleteUserId(user.id); // Ensure the correct ID property
                      setIsDeleteModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    <FaTrashAlt />
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
                user: Yup.string().required('User is required'),
                room: Yup.string().required('Room is required'),
                status: Yup.string().required('Status is required'),
                pricing: Yup.number().required('Pricing is required'),
              })}
              initialValues={{ user: '', room: '', status: '', pricing: '' }}
              onSubmit={async (values) => {
                try {
                  const token = localStorage.getItem('token');
                  await axios.post(`${API_URL}room/create`, values, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  toast.success("Room created successfully");
                  fetchUser(); // Refresh the user list
                  setIsModalOpen(false);
                } catch (error) {
                  toast.error(error.response?.data?.message || "Error creating room");
                }
              }}
            >
              <Form>
                <div className="mb-4">
                  <label htmlFor="user" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">User</label>
                  <Field as="select"
                    id="user"
                    name="user"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                    required
                  >
                    <option value="">Select User</option>
                    {data.map(user => (
                      <option  value={user.name}>{user.name}</option>
                    ))}
                  </Field>
                  <ErrorMessage name='user' className='text-red-500' />
                </div>

                <div className="mb-4">
                  <label htmlFor="room" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Rooms</label>
                  <Field as="select"
                    id="room"
                    name="room"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                    required
                  >
                     <option value="">Select Room Type</option>
                    {rooms.map(room => (
                      <option  value={room.type}>{room.type}</option>
                    ))}
                  </Field>
                  <ErrorMessage name='room' className='text-red-500' />
                </div>

                <div className="w-1/2 mb-4">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Status</label>
                  <Field
                    type="text"
                    id="status"
                    name="status"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
                    required
                  />
                  <ErrorMessage name='status' className='text-red-500' />
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

export default Booking;
