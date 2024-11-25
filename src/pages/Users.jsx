import React, { useEffect, useState } from 'react';
import { ADMIN, USER } from '../helper/api';
import axios from 'axios'
import { toBase64 } from '../utils/toBase64';
import Parse from 'parse/dist/parse.min.js';
import toast from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [newUser, setNewUser] = useState({
    id: '',
    profilePicture: null,
    name: '',
    role: '',
    birthdate: '',
    age: '',
    bloodType: '',
    address: '',
    contact: '',
    email: '',
    username: '',
    password: '',
    status: 'ACTIVE',
  });
  const maxFileSize = 5 * 1024 * 1024; 

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleAddUserClick = () => setShowAddModal(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // File size validation
    if (file && file.size > maxFileSize) {
      setError('File size exceeds the 5MB limit.');
      setNewUser((prev) => ({ ...prev, profilePicture: null }));
    } else if (file) {
      setError('');
      setNewUser((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const imageBase64 = newUser.profilePicture ? await toBase64(newUser.profilePicture) : null;

    const formData = {
      profilePicture: imageBase64,
      name: newUser.name,
      role: newUser.role,
      birthdate: newUser.birthdate,
      age: newUser.age, 
      bloodType: newUser.bloodType,
      address: newUser.address,
      contact: newUser.contact,
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
      status: newUser.status
    }

    try {
      const response = await axios.post(ADMIN, formData);
      setUsers([...users, response.data]);
      setShowAddModal(false);
      setNewUser({
        name: '',
        role: '',
        email: '',
        birthdate: '',
        address: '',
        contact: '',
        status: 'ACTIVE',
      });
      toast.success('User added successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error adding user:', error.response.data.error);
      toast.success('Failed to add user. Please try again.');
    } finally {
      setLoading(false)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteUser = async (id) => {

    try{
      const result = await axios.delete(USER + `/${id}`);
      console.log(result.data.message)
      setUsers(users.filter((user) => user.id !== id))
    }
    catch(err){
      console.log(err.response.data.error)
    }
  };

  const filteredUsers = Array.isArray(users) && users.filter((user) =>
    user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const result = await Parse.Cloud.run('getUsers', {});
        setUsers(result); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Users Page</h1>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="search" className="mr-2">Search By:</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name or email"
            className="px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={handleAddUserClick}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add User
        </button>
      </div>
      <table className="min-w-full table-auto">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2">USER ID</th>
            <th className="px-4 py-2">PROFILE</th>
            <th className="px-4 py-2">USER TYPE</th>
            <th className="px-4 py-2">NAME</th>
            <th className="px-4 py-2">EMAIL</th>
            <th className="px-4 py-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="bg-orange-100 hover:bg-orange-200">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">
                <img src={user.profilePicture} alt="profile pic" className='w-8 h-8 rounded-full' />
              </td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleUserClick(user)}
                  className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View User Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p><strong>User ID:</strong> {selectedUser.id}</p>
            <p><strong>User Type:</strong> {selectedUser.userType}</p>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>
            <p><strong>Contact:</strong> {selectedUser.contact}</p>
            <p><strong>Blood Type:</strong> {selectedUser.bloodType || 'N/A'}</p>
            <p><strong>Status:</strong> {selectedUser.status}</p>
            <p><strong>Date Registered:</strong> {selectedUser.dateRegistered}</p>
            <p><strong>Birthdate:</strong> {selectedUser.birthdate}</p>
            <p><strong>Age:</strong> {selectedUser.age || 'N/A'}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[400px] h-[600px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add User</h2>
            <form onSubmit={handleAddUserSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Profile Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div className="mb-2">
                <label className="block">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">User Type</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="" disabled>Select User Type</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="SECRETARY">SECRETARY</option>
                  <option value="NURSE">NURSE</option>
                  <option value="PATIENT">PATIENT</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block">Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={newUser.birthdate}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Age</label>
                <input
                  type="number"
                  name="age"
                  value={newUser.age}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Blood Type</label>
                <input
                  type="text"
                  name="bloodType"
                  value={newUser.bloodType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newUser.address}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={newUser.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Username</label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Password</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Status</label>
                <select
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                  {loading ? 'Loading...' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
