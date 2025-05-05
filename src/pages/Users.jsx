import React, { useEffect, useState } from "react";
import { ADMIN, USER } from "../helper/api";
import axios from "axios";
import { toBase64 } from "../utils/toBase64";
import Parse from "parse/dist/parse.min.js";
import toast from "react-hot-toast";
import { CameraIcon, EyeIcon, EyeOffIcon, X } from "lucide-react";
import StatusToggle from "../components/StatusToggle"; // Adjust the path as necessary
import { calculateAge } from "../utils/toBase64";
import { set } from "date-fns";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    id: "",
    user_id: "",
    profilePicture: null,
    name: "",
    role: "",
    birthdate: "",
    age: "",
    bloodType: "",
    address: "",
    contact: "",
    email: "",
    username: "",
    password: "",
    status: "ACTIVE",
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusChangeUser, setStatusChangeUser] = useState(null);
  const [message, setMessage] = useState("");



  
      // Function to handle status toggle click
    const handleStatusToggleClick = (user) => {
      setStatusChangeUser(user); // Set the user whose status is being changed
      setMessage(
        `Are you sure you want to ${
          user.status === "ACTIVE" ? "inactivate" : "activate"
        } this account?`
      );
      setShowStatusModal(true); // Show the confirmation modal
    };


    // Function to confirm the status change
    const confirmStatusChange = () => {
      if (!statusChangeUser) return;

      // Update the status locally
      setEditingUser((prev) => ({
        ...prev,
        status: prev.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      }));

      setShowStatusModal(false); // Close the modal
      setStatusChangeUser(null); // Clear the user being changed
    };



  // Function to cancel status change
  const cancelStatusChange = () => {
    setShowStatusModal(false);
    setStatusChangeUser(null);
  };

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
      setError("File size exceeds the 5MB limit.");
      setNewUser((prev) => ({ ...prev, profilePicture: null }));
    } else if (file) {
      setError("");
      setNewUser((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmSaveUser = async () => {
    setLoading(true);
    const imageBase64 = newUser.profilePicture
      ? await toBase64(newUser.profilePicture)
      : null;

    const formData = {
      user_id: newUser?.user_id,
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
      status: newUser.status,
    };

    try {
      const response = await axios.post(ADMIN, formData);
      setUsers([...users, response.data]);
      setShowAddModal(false);
      setNewUser({
        name: "",
        role: "",
        email: "",
        birthdate: "",
        address: "",
        contact: "",
        status: "ACTIVE",
      });
      toast.success("User added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding user:", error.response.data.error);
      toast.error("Failed to add user. Please try again.");
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'birthdate') {
      const age = calculateAge(value); 
      setNewUser((prev) => ({ ...prev, age })); 
    }

    if(name === "contact" && value.length > 11) return;

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
      toast.success("User deleted successfully");
    } catch (err) {
      console.log(err.response.data.error);
      toast.error("Failed to delete user");
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
  const filteredUsers = hasSearched
    ? searchResults
    : Array.isArray(users)
    ? users
    : [];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const result = await Parse.Cloud.run("getUsers", {});
        const filteredUsers = result.filter((user) => user.role !== "PATIENT");
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
    });
    setIsEditing(true);
    setShowModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setShowEditConfirmModal(true);
  };

  const confirmEditUser = async () => {
    setLoading(true);
    const imageBase64 =
    editingUser.profilePicture instanceof File
      ? await toBase64(editingUser.profilePicture)
      : editingUser.profilePicture;

    const formData = {
      ...editingUser,
      profilePicture: imageBase64,
      age: editingUser.age,
    };

    try {
      const res = await axios.put(`${ADMIN}/${editingUser.id}`, formData);

      // Update the main users list
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? { ...res.data } : user
        )
      );

      // Update search results if there's an active search
      if (hasSearched) {
        setSearchResults((prevResults) =>
          prevResults.map((user) =>
            user.id === editingUser.id ? { ...res.data } : user
          )
        );
      }

      // Show success message
      setIsOk(true);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
      setShowEditConfirmModal(false);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleDoubleClick = (user) => {
    setViewUser(user);
    setShowViewModal(true);
  };


    const generateUserId = () => {
      const randomNumber = Math.floor(100 + Math.random() * 900); // Generate a 3-digit number
      return `MS-${randomNumber}`;
    };
    
  
    useEffect(() => {
      setNewUser((prev) => ({
        ...prev,
        user_id: generateUserId(),
      }));
    }, [setNewUser]);


  return (
    <div className="container mx-auto p-8 max-w-7xl">

      {isOk && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">  
              <div className="bg-zinc-300 rounded-lg shadow-xl w-[400px]">
                <div className="bg-zinc-400 flex justify-end items-center px-2 h-8">
                  <button
                    onClick={() => {
                      setIsOk(false);
                      window.location.reload();
                      setIsEditing(false);
                      setEditingUser(null);
                    }}
                    className=""
                  >
                    <X />
                  </button>
                </div>
                <div className="flex flex-col justify-center items-center p-6">
                  <h2 className="text-xl font-bold mb-4 text-center">
                    SAVE SUCCESSFULLY
                  </h2>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => {
                        setIsOk(false);
                        window.location.reload();
                        setIsEditing(false);
                        setEditingUser(null);
                      }}
                      className="px-4 py-2 bg-white text-black border border-zinc-600 transition-colors duration-200"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
      )}

      {showStatusModal && message && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center min-h-screen w-full z-50">
          <div className="px-20 py-7 w-[430px] bg-white border border-orange-600 flex justify-center items-center flex-col gap-y-3">
            <div dangerouslySetInnerHTML={{ __html: message }} className="text-center"/>
            {isLoadingUpdate ? (
              <button
              disabled
              className="px-4 py-1 border border-orange-600 text-orange-500 hover:bg-orange-500 hover:text-black w-[max-content] mx-auto"
            >
              Loading...
            </button>
            ) : (
              <div className="flex flex-row gap-x-5">
                <button
                  onClick={confirmStatusChange}
                  className="px-4 py-1 border border-orange-600 text-orange-500 hover:bg-orange-500 hover:text-black w-[max-content] mx-auto"
                >
                  YES
                </button>
                <button
                  onClick={cancelStatusChange}
                  className="px-4 py-1 border border-orange-600 text-orange-500 hover:bg-orange-500 hover:text-black w-[max-content] mx-auto"
                >
                  NO
                </button>
                </div>
            )}
          </div>
        </div>
      )}

      {!showAddModal && !viewUser && !editingUser && (
        <h1 className="text-2xl text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
          USERS ACCOUNT
        </h1>
      )}

      {!showAddModal && !viewUser && !editingUser && (
        <div className="bg-white rounded-lg p-6">
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
                value={2}
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
                <tr className="bg-orange-500 border-b border-orange-500">
                  <th className="px-6 py-3 text-left text-xs text-black font-semibold uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-black font-semibold uppercase tracking-wider">
                    User Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-black font-semibold uppercase tracking-wider">
                    USER ACCOUNT
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-black font-semibold uppercase tracking-wider">
                    ADDRESS
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-black font-semibold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-black font-semibold uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-black font-semibold uppercase tracking-wider">
                    DATE REGISTERED
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length === 0 && hasSearched ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-sm text-gray-500 font-medium"
                    >
                      User not found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      onClick={() => handleRowClick(user)}
                      onDoubleClick={() => handleDoubleClick(user)}
                      className={`${
                        selectedUser?.id === user.id
                          ? "bg-orange-100 hover:bg-orange-200"
                          : index % 2 === 0
                          ? "bg-[#f5c6cb]"
                          : "bg-[#f8d7da] hover:bg-gray-50"
                      } border-b transition duration-200 ease-in-out cursor-pointer`}
                    >
                      <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-900">
                        {user.user_id}
                      </td>
                      <td className="px-3 py-1 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-3 py-1 whitespace-nowrap text-sm text-black">
                        {user.name}
                      </td>
                      <td className="px-3 py-1 whitespace-nowrap text-sm text-black">
                        {user.address}
                      </td>
                      <td className="px-3 py-1 whitespace-nowrap text-sm text-black">
                        {user.email}
                      </td>
                      <td className="px-3 text-center py-1 whitespace-nowrap text-sm text-black">
                        {user.status}
                      </td>
                      <td className="px-3 text-center py-1 whitespace-nowrap text-sm text-black">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={handleAddUserClick}
              className="bg-yellow-500 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add
            </button>
            <button
              onClick={() => {
                if (selectedUser?.id) {
                  handleEditClick(selectedUser);
                }
              }}
              className="bg-yellow-500 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Edit
            </button>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {showViewModal && viewUser && (
        <div className="flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 border border-yellow-500">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              USERS ACCOUNT
            </h2>
            <form
              onSubmit={handleAddUserSubmit}
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-y-1">
                  <div className="flex flex-col items-center mb-4">
                    <label htmlFor="file" className="block text-sm font-medium">
                      <div className="cursor-pointer w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-2 relative">
                        {selectedUser?.profilePicture && (
                          <img
                            src={selectedUser.profilePicture}
                            alt="profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        )}
                      </div>

                      <input
                        type="file"
                        id="file"
                        name="profilePicture"
                        onChange={handleFileChange}
                        hidden
                        className="w-full p-2 border rounded hover:border-orange-500 transition-colors"
                      />
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                    </label>
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <label className="block">USER ID:</label>
                    <input
                      type="text"
                      name="name"
                      readOnly
                      placeholder={selectedUser?.user_id}
                      className="w-2/3 px-2 py-1 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Name</label>
                    <input
                      type="text"
                      name="name"
                      readOnly
                      placeholder={selectedUser?.name}
                      className="w-2/3 px-2 py-1 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">User Type</label>
                    <input
                      type="text"
                      name="birthdate"
                      readOnly
                      placeholder={selectedUser?.userType}
                      className="w-2/3 px-2 py-1 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Birthdate</label>
                    <input
                      type="text"
                      name="birthdate"
                      readOnly
                      placeholder={selectedUser?.birthdate}
                      className="w-2/3 px-2 py-1 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Age</label>
                    <input
                      type="number"
                      name="age"
                      readOnly
                      placeholder={selectedUser?.age}
                      className="w-2/3 px-2 py-1 transition-colors"
                      min="0"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Blood Type</label>
                    <input
                      type="text"
                      name="address"
                      readOnly
                      placeholder={selectedUser?.bloodType}
                      className="w-2/3 px-2 py-1 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Address</label>
                    <input
                      type="text"
                      name="address"
                      readOnly
                      placeholder={selectedUser?.address}
                      className="w-2/3 px-2 py-1 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Contact NO.</label>
                    <input
                      type="number"
                      name="contact"
                      readOnly
                      placeholder={selectedUser?.contact}
                      className="w-2/3 px-2 py-1 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Email</label>
                    <input
                      type="email"
                      name="email"
                      readOnly
                      placeholder={selectedUser?.email}
                      className="w-2/3 px-2 py-1 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Username</label>
                    <input
                      type="text"
                      name="username"
                      readOnly
                      placeholder={selectedUser?.username}
                      className="w-2/3 px-2 py-1 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2 relative">
                    <label className="block w-1/3 uppercase">Password</label>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      readOnly
                      placeholder="*********"
                      required
                      className="w-2/3 px-2 py-1 transition-colors pr-10"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3">Status</label>
                    <input
                      type="text"
                      name="status"
                      readOnly
                      placeholder={selectedUser?.status}
                      className="w-2/3 px-2 py-1 transition-colors"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center gap-3 w-full mt-4">
                <button
                  type="button"
                  onClick={() => setViewUser(false)}
                  className="px-4 py-2 border border-zinc-700 text-sm font-semibold transition-colors"
                >
                  BACK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 border border-yellow-500">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              USERS ACCOUNT
            </h2>
            <form
              onSubmit={handleAddUserSubmit}
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-y-1">
                  <div className="flex flex-col items-center mb-4">
                    <label htmlFor="file" className="block text-sm font-medium">
                      <div className="cursor-pointer w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-2 relative">
                        {newUser.profilePicture ? (
                          <img
                            src={
                              newUser.profilePicture &&
                              URL.createObjectURL(newUser.profilePicture)
                            }
                            alt="profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="absolute flex flex-col justify-center items-center">
                            <CameraIcon />
                            <span className="text-sm">UPLOAD PHOTO</span>
                          </div>
                        )}
                      </div>

                      <input
                        type="file"
                        id="file"
                        name="profilePicture"
                        onChange={handleFileChange}
                        hidden
                        className="w-full p-2 border rounded hover:border-orange-500 transition-colors"
                      />
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                    </label>
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <label className="block">USER ID:</label>
                    <input
                      type="text"
                      name="user_id"
                      value={newUser.user_id}
                      readOnly
                      className="px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      required
                      className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">User Type</label>
                    <select
                      name="role"
                      value={newUser.role}
                      onChange={handleInputChange}
                      required
                      className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                    >
                      <option value="" disabled>
                        Select User Type
                      </option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="SECRETARY">SECRETARY</option>
                      <option value="NURSE">NURSE</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Birthdate</label>
                    <input
                      type="date"
                      name="birthdate"
                      value={newUser.birthdate}
                      onChange={handleInputChange}
                      required
                      className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={newUser.age}
                      onChange={(e) =>
                        setNewUser((prev) => ({
                          ...prev,
                          age: e.target.value,
                        }))
                      }
                      required
                      className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                      min="0"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Blood Type</label>
                    <select
                      name="bloodType"
                      value={newUser.bloodType}
                      onChange={handleInputChange}
                      required
                      className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
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
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={newUser.address}
                      onChange={handleInputChange}
                      required
                      className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Contact NO.</label>
                    <input
                      type="number"
                      name="contact"
                      value={newUser.contact}
                      onChange={handleInputChange}
                      required
                      className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      required
                      className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3 uppercase">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={newUser.username}
                      onChange={handleInputChange}
                      required
                      className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 mb-2 relative">
                    <label className="block w-1/3 uppercase">Password</label>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      value={newUser.password}
                      onChange={handleInputChange}
                      required
                      className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors pr-10"
                    />
                    {isPasswordVisible ? (
                      <EyeOffIcon
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsPasswordVisible(false)}
                      />
                    ) : (
                      <EyeIcon
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsPasswordVisible(true)}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <label className="block w-1/3">Status</label>
                    <div className="flex items-center gap-2">
                      ACTIVE
                      <StatusToggle
                        status={newUser.status}
                        setStatus={(newStatus) =>
                          setNewUser((prev) => ({ ...prev, status: newStatus }))
                        }
                      />
                      INACTIVE
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center gap-3 w-full mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-black border border-zinc-700 text-sm font-semibold transition-colors"
                >
                  SAVE
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-zinc-700 text-sm font-semibold transition-colors"
                >
                  CANCEL
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
            <p className="mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
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
        <>
          <div className="flex justify-center items-center transition-opacity duration-300 ease-in-out">
            <div className="bg-white p-6 border border-yellow-500">
              <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
                EDIT USER
              </h2>
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-y-1">
                    <div className="flex flex-col items-center mb-4">
                      <label
                        htmlFor="file"
                        className="block text-sm font-medium"
                      >
                        <div className="cursor-pointer w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-2 relative">
                        {editingUser.profilePicture ? (
                            <img
                              src={
                                editingUser.profilePicture instanceof File
                                  ? URL.createObjectURL(editingUser.profilePicture)
                                  : editingUser.profilePicture // Use the URL directly if it's a string
                              }
                              alt="profile"
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <div className="absolute flex flex-col justify-center items-center">
                              <CameraIcon />
                              <span className="text-sm">UPLOAD PHOTO</span>
                            </div>
                          )}
                        </div>

                        <input
                          type="file"
                          id="file"
                          name="profilePicture"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file && file.size > maxFileSize) {
                              setError("File size exceeds the 5MB limit.");
                            } else {
                              setError("");
                              setEditingUser((prev) => ({
                                ...prev,
                                profilePicture: file,
                              }));
                            }
                          }}
                          hidden
                          className="w-full p-2 border rounded hover:border-orange-500 transition-colors"
                        />
                        {error && (
                          <p className="text-red-500 text-sm">{error}</p>
                        )}
                      </label>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <label className="block">USER ID:</label>
                      <input
                        type="text"
                        name="user_id"
                        value={editingUser.user_id}
                        onChange={(e) =>
                          setEditingUser((prev) => ({
                            ...prev,
                            user_id: e.target.value,
                          }))
                        }
                        required
                        className="px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-x-2 mb-2">
                      <label className="block w-1/3 uppercase">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editingUser.name}
                        onChange={(e) =>
                          setEditingUser((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        required
                        className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                      />
                    </div>
                    <div className="flex items-center gap-x-2 mb-2">
                      <label className="block w-1/3 uppercase">User Type</label>
                      <select
                        name="role"
                        value={editingUser.role}
                        onChange={(e) =>
                          setEditingUser((prev) => ({
                            ...prev,
                            role: e.target.value,
                          }))
                        }
                        required
                        className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                      >
                        <option value="" disabled>
                          Select User Type
                        </option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="SECRETARY">SECRETARY</option>
                        <option value="NURSE">NURSE</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-x-2 mb-2">
                      <label className="block w-1/3 uppercase">Birthdate</label>
                      <input
                        type="date"
                        name="birthdate"
                        value={editingUser.birthdate}
                        onChange={(e) =>
                          setEditingUser((prev) => ({
                            ...prev,
                            birthdate: e.target.value,
                          }))
                        }
                        required
                        className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                      />
                    </div>
                    <div className="flex items-center gap-x-2 mb-2">
                      <label className="block w-1/3 uppercase">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={editingUser.age}
                        onChange={(e) =>
                          setEditingUser((prev) => ({
                            ...prev,
                            age: e.target.value,
                          }))
                        }
                        required
                        className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                        min="0"
                      />
                    </div>
                    <div className="flex items-center gap-x-2 mb-2">
                      <label className="block w-1/3 uppercase">
                        Blood Type
                      </label>
                      <select
                        name="bloodType"
                        value={editingUser.bloodType}
                        onChange={(e) =>
                          setEditingUser((prev) => ({
                            ...prev,
                            bloodType: e.target.value,
                          }))
                        }
                        required
                        className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
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
                    <div className="flex items-center gap-x-2 mb-2">
                      <label className="block w-1/3 uppercase">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={editingUser.address}
                        onChange={(e) =>
                          setEditingUser((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        required
                        className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                      />
                    </div>
                    <div className="flex items-center gap-x-2 mb-2">
                      <label className="block w-1/3 uppercase">
                        Contact NO.
                      </label>
                      <input
                        type="number"
                        name="contact"
                        value={editingUser.contact}
                        onChange={(e) => {
                          if (e.target.value.length <= 11) {
                            setEditingUser((prev) => ({
                              ...prev,
                              contact: e.target.value,
                            }));
                          }
                        }}
                        required
                        className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-x-2 mb-2">
                      <label className="block w-1/3 uppercase">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editingUser.email}
                        onChange={(e) =>
                          setEditingUser((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        required
                        className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                      />
                    </div>
                    <div className="flex items-center gap-x-2 mb-2">
                      <label className="block w-1/3 uppercase">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={editingUser.username}
                        onChange={(e) =>
                          setEditingUser((prev) => ({
                            ...prev,
                            username: e.target.value,
                          }))
                        }
                        required
                        className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors"
                      />
                    </div>
                    <div className="flex items-center gap-x-2 mb-2 relative">
                      <label className="block w-1/3 uppercase">Password</label>
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        value={editingUser.password}
                        onChange={(e) =>
                          setEditingUser((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        className="w-2/3 px-2 py-1 border border-zinc-400 hover:border-orange-500 transition-colors pr-10"
                      />
                      {isPasswordVisible ? (
                        <EyeOffIcon
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setIsPasswordVisible(false)}
                        />
                      ) : (
                        <EyeIcon
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setIsPasswordVisible(true)}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-x-2 mb-2">
                      <label className="block w-1/3">Status</label>
                      <div className="flex items-center gap-2">
                        ACTIVE
                        <StatusToggle
                          status={editingUser.status}
                          setStatus={() => handleStatusToggleClick(editingUser)}
                        />
                        INACTIVE
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-3 w-full mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 text-black border border-zinc-700 text-sm font-semibold transition-colors"
                  >
                    SAVE
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingUser(null);
                    }}
                    className="px-4 py-2 border border-zinc-700 text-sm font-semibold transition-colors"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-zinc-300 rounded-lg shadow-xl w-[400px]">
            <div className="bg-zinc-400 flex justify-end items-center px-2 h-8">
              <button onClick={() => setShowConfirmModal(false)} className="">
                <X />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center p-6">
              <h2 className="text-xl font-bold mb-4 text-center">
                ARE YOU SURE YOU WANT
                <br /> TO SAVE?
              </h2>
              <div className="flex justify-end gap-4">
                {loading ? (
                  <span className="px-4 py-2 bg-white text-black border border-zinc-600 transition-colors duration-200">
                    LOADING...
                  </span>
                ) : (
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={confirmSaveUser}
                      className="px-4 py-2 bg-white text-black border border-zinc-600 transition-colors duration-200"
                    >
                      YES
                    </button>
                      <button
                        onClick={() => setShowConfirmModal(false)}
                        className="px-4 py-2 bg-white hover:bg-gray-400 border border-zinc-600 transition-colors duration-200"
                      >
                        NO
                      </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditConfirmModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-zinc-300 rounded-lg shadow-xl w-[400px]">
            <div className="bg-zinc-400 flex justify-end items-center px-2 h-8">
              <button
                onClick={() => setShowEditConfirmModal(false)}
                className=""
              >
                <X />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center p-6">
              <h2 className="text-xl font-bold mb-4 text-center">
                ARE YOU SURE YOU WANT
                <br /> TO SAVE CHANGES?
              </h2>
              <div className="flex justify-end gap-4">
                {loading ? (
                  <span className="px-4 py-2 bg-white text-black border border-zinc-600 transition-colors duration-200">
                    LOADING...
                  </span>
                ) : (
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={confirmEditUser}
                      className="px-4 py-2 bg-white text-black border border-zinc-600 transition-colors duration-200"
                    >
                      YES
                    </button>
                      <button
                        onClick={() => setShowEditConfirmModal(false)}
                        className="px-4 py-2 bg-white hover:bg-gray-400 border border-zinc-600 transition-colors duration-200"
                      >
                        NO
                      </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
