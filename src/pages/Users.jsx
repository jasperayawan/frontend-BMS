import React, { useEffect, useState } from 'react';
import { ADMIN, USER } from '../helper/api';
import axios from 'axios'
import { toBase64 } from '../utils/toBase64';
import Parse from 'parse/dist/parse.min.js';
import toast from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchType, setSearchType] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

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
      age: newUser.age.toString(), 
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

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(USER + `/${userToDelete.id}`);
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      toast.success('User deleted successfully');
    } catch (err) {
      console.log(err.response.data.error);
      toast.error('Failed to delete user');
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleSearch = () => {
    setHasSearched(true);
    
    if (searchType === "ALL") {
      setSearchResults([]);
      setSearchInput("");
      setHasSearched(false);
      return;
    }

    const results = Array.isArray(users)
      ? users.filter((user) => {
          if (searchType === "NAME") {
            return user.name.toLowerCase().includes(searchInput.toLowerCase());
          } else if (searchType === "EMAIL") {
            return user.email.toLowerCase().includes(searchInput.toLowerCase());
          } else if (searchType === "ROLE") {
            return user.role === searchInput;
          }
          return false;
        })
      : [];
    
    setSearchResults(results);
  };

  // Reset search state when changing search type
  useEffect(() => {
    if (searchType === "ALL") {
      setSearchResults([]);
      setSearchInput("");
      setHasSearched(false);
    } else {
      setHasSearched(false);
      setSearchResults([]);
    }
  }, [searchType]);

  // Update the filteredUsers variable
  const filteredUsers = hasSearched ? searchResults : (Array.isArray(users) ? users : []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const result = await Parse.Cloud.run('getUsers', {});
        const filteredUsers = result.filter(user => user.role !== 'PATIENT');
        setUsers(filteredUsers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  

  const handleEditClick = (user) => {
    setEditingUser({
      ...user,
      profilePicture: null // Reset profile picture to avoid sending the URL
    });
    setIsEditing(true);
    setShowModal(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const imageBase64 = editingUser.profilePicture ? 
      await toBase64(editingUser.profilePicture) : 
      null;

    console.log('Age before submit:', editingUser.age);

    const formData = {
      ...editingUser,
      profilePicture: imageBase64,
      age: editingUser.age
    };

    console.log('Form data before submit:', formData);

    try {
      const res = await axios.put(`${ADMIN}/${editingUser.id}`, formData);
      console.log('Server response:', res.data);
      
      // Update the main users list
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === editingUser.id ? {...res.data} : user
        )
      );
      
      // Update search results if there's an active search
      if (hasSearched) {
        setSearchResults(prevResults =>
          prevResults.map(user => 
            user.id === editingUser.id ? {...res.data} : user
          )
        );
      }

      // Close the edit modal
      setIsEditing(false);
      setEditingUser(null);
      
      // Show success message
      toast.success('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleDoubleClick = (user) => {
    setViewUser(user);
    setShowViewModal(true);
  };

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <h1 className="text-2xl text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
            USERS ACCOUNT
          </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-row justify-center items-center gap-x-2 mb-6">
          <span>Search by:</span>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-4 py-1 rounded-[12px] bg-zinc-300 outline-none w-[150px]"
          >
            <option value="ALL">ALL</option>
            <option value="NAME">NAME</option>
            <option value="EMAIL">EMAIL</option>
          </select>
          
          {searchType === "NAME" && (
            <div className="flex gap-x-2">
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border-[1.5px] border-zinc-500 rounded-md py-1 px-3 outline-none"
                placeholder="Search by name"
              />
              <button
                onClick={handleSearch}
                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="w-5 h-5"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
                  />
                </svg>
              </button>
            </div>
          )}
          
          {searchType === "EMAIL" && (
            <div className="flex gap-x-2">
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border-[1.5px] border-zinc-500 rounded-md py-1 px-3 outline-none"
                placeholder="Search by email"
              />
              <button
                onClick={handleSearch}
                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="w-5 h-5"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
                  />
                </svg>
              </button>
            </div>
          )}
          
          {searchType === "ROLE" && (
            <select
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setHasSearched(true);
              }}
              className="px-4 py-1 rounded-[12px] bg-zinc-300 outline-none w-[150px]"
            >
              <option value="">All Roles</option>
              <option value="ADMIN">ADMIN</option>
              <option value="SECRETARY">SECRETARY</option>
              <option value="NURSE">NURSE</option>
            </select>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  onClick={() => handleRowClick(user)}
                  onDoubleClick={() => handleDoubleClick(user)}
                  className={`${
                    selectedUser?.id === user.id 
                      ? 'bg-yellow-100 hover:bg-yellow-200' 
                      : 'bg-white hover:bg-gray-50'
                  } border-b transition duration-200 ease-in-out cursor-pointer`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img 
                      src={user.profilePicture || 'default-avatar.png'} 
                      alt="profile" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
            
        </div>
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={handleAddUserClick}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add
          </button>
          <button
            onClick={() => {
              if (selectedUser?.id) {
                handleEditClick(selectedUser);
              }
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Edit
          </button>
        </div>
      </div>

      {/* View User Modal */}
      {showViewModal && viewUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-[500px] max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setViewUser(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
              <img 
                src={viewUser.profilePicture || 'default-avatar.png'}
                alt={viewUser.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">{viewUser.name}</h3>
                <span className="inline-block px-3 py-1 mt-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                  {viewUser.role}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 block">User ID</label>
                  <p className="font-medium text-gray-800">{viewUser.id}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">Email</label>
                  <p className="font-medium text-gray-800">{viewUser.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">Contact</label>
                  <p className="font-medium text-gray-800">{viewUser.contact}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">Blood Type</label>
                  <p className="font-medium text-gray-800">{viewUser.bloodType || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">Age</label>
                  <p className="font-medium text-gray-800">{viewUser.age || 'N/A'}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 block">Status</label>
                  <span className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                    viewUser.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {viewUser.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">Birthdate</label>
                  <p className="font-medium text-gray-800">{viewUser.birthdate}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">Date Registered</label>
                  <p className="font-medium text-gray-800">{viewUser.dateRegistered}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">Address</label>
                  <p className="font-medium text-gray-800">{viewUser.address}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setViewUser(null);
                }}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] h-[600px] overflow-y-auto transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
            <h2 className="text-xl font-bold mb-4 text-center text-orange-600">Add User</h2>
            <form onSubmit={handleAddUserSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Profile Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded hover:border-blue-500 transition-colors"
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
                  className="w-full p-2 border rounded hover:border-blue-500 transition-colors"
                />
              </div>
              <div className="mb-2">
                <label className="block">User Type</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded hover:border-blue-500 transition-colors"
                >
                  <option value="" disabled>Select User Type</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="SECRETARY">SECRETARY</option>
                  <option value="NURSE">NURSE</option>
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
                  className="w-full p-2 border rounded hover:border-blue-500 transition-colors"
                />
              </div>
              <div className="mb-2">
                <label className="block">Age</label>
                <input
                  type="number"
                  name="age"
                  value={newUser.age}
                  onChange={(e) => setNewUser(prev => ({ 
                    ...prev, 
                    age: e.target.value
                  }))}
                  required
                  className="w-full p-2 border rounded hover:border-blue-500 transition-colors"
                  min="0"
                />
              </div>
              <div className="mb-2">
                <label className="block">Blood Type</label>
                <select
                  name="bloodType"
                  value={newUser.bloodType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded hover:border-blue-500 transition-colors"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newUser.address}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded hover:border-blue-500 transition-colors"
                />
              </div>
              <div className="mb-2">
                <label className="block">Contact</label>
                <input
                  type="number"
                  name="contact"
                  value={newUser.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded hover:border-blue-500 transition-colors"
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
                  className="w-full p-2 border rounded hover:border-blue-500 transition-colors"
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
                  className="w-full p-2 border rounded hover:border-blue-500 transition-colors"
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
                  className="w-full p-2 border rounded hover:border-blue-500 transition-colors"
                />
              </div>
              <div className="mb-2">
                <label className="block">Status</label>
                <select
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded hover:border-blue-500 transition-colors"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded mr-2 hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                  {loading ? 'Loading...' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing && editingUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[400px] h-[600px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Profile Picture</label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.size > maxFileSize) {
                      setError('File size exceeds the 5MB limit.');
                    } else {
                      setError('');
                      setEditingUser(prev => ({ ...prev, profilePicture: file }));
                    }
                  }}
                  className="w-full p-2 border rounded"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div className="mb-2">
                <label className="block">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">User Type</label>
                <select
                  name="role"
                  value={editingUser.role}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, role: e.target.value }))}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="" disabled>Select User Type</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="SECRETARY">SECRETARY</option>
                  <option value="NURSE">NURSE</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block">Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={editingUser.birthdate}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, birthdate: e.target.value }))}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Age</label>
                <input
                  type="text"
                  name="age"
                  value={editingUser.age}
                  onChange={(e) => {
                    setEditingUser(prev => {
                      const newState = {
                        ...prev,
                        age: e.target.value
                      };
                      return newState;
                    });
                  }}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Blood Type</label>
                <input
                  type="text"
                  name="bloodType"
                  value={editingUser.bloodType}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, bloodType: e.target.value }))}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Address</label>
                <input
                  type="text"
                  name="address"
                  value={editingUser.address}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, address: e.target.value }))}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={editingUser.contact}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, contact: e.target.value }))}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Username</label>
                <input
                  type="text"
                  name="username"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Password</label>
                <input
                  type="password"
                  name="password"
                  value={editingUser.password}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Status</label>
                <select
                  name="status"
                  value={editingUser.status}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, status: e.target.value }))}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded mr-2"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update User'}
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
