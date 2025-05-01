import React, { useEffect, useState } from "react";
import Parse from 'parse/dist/parse.min.js';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaTint, FaIdCard } from 'react-icons/fa';

const MyAccount = () => {
  const [account, setAccount] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState(account);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = Parse.User.current();
  const [error, setError] = useState(null);
  const [isConfirmSaveOpen, setIsConfirmSaveOpen] = useState(false);

  const handleEditToggle = () => {
    setIsModalOpen(!isModalOpen);
    setFormData(account); // Reset formData if editing is canceled
    setPreviewImage(account.profileImage);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if(name === "contact" && (!/^\d*$/.test(value) || value.length > 11)){
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleSave = () => {
    setIsConfirmSaveOpen(true); // Open confirmation modal
  };

  const confirmSave = async () => {
    setLoading(true);
    setError(null);
    try {
      // Prepare the profile picture if it's a File object
      let profilePictureData = null;
      if (formData.profileImage instanceof File) {
        const reader = new FileReader();
        profilePictureData = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(formData.profileImage);
        });
      }

      const result = await Parse.Cloud.run('updateMyAccount', {
        id: user.id,
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        address: formData.address,
        contact: formData.contact,
        profilePicture: profilePictureData
      });

      setAccount(result.user);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsConfirmSaveOpen(false); // Close confirmation modal
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const result = await Parse.Cloud.run('myAccount', { id: user?.id });
        setAccount(result)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <h1 className="text-2xl mb-10 text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2">
        MY PROFILE
      </h1>

      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  {account.profilePicture ? (
                    <img
                      src={account.profilePicture instanceof File ? previewImage : account.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 text-2xl font-bold text-gray-600">
                      {account.name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Basic Info */}
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl font-bold mb-2">{account.name}</h1>
                <p className="text-blue-100">{account.role}</p>
                <p className="text-blue-100 text-sm">ID: {account.id}</p>
              </div>
            </div>
          </div>

          {/* Information Sections */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
                <InfoItem icon={<FaBirthdayCake />} label="Birthdate" value={account.birthdate} />
                <InfoItem icon={<FaUser />} label="Age" value={account.age} />
                <InfoItem icon={<FaTint />} label="Blood Type" value={account.bloodType} />
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Contact Information</h3>
                <InfoItem icon={<FaMapMarkerAlt />} label="Address" value={account.address} />
                <InfoItem icon={<FaPhone />} label="Contact" value={account.contact} />
                <InfoItem icon={<FaEnvelope />} label="Email" value={account.email} />
              </div>
            </div>

            {/* Account Information */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Account Information</h3>
              <InfoItem icon={<FaIdCard />} label="Username" value={account.username} />
              <div className="flex items-center space-x-2 text-gray-600">
                <strong>Password:</strong>
                <span>{isPasswordVisible ? account.password : "********"}</span>
                <button
                  onClick={togglePasswordVisibility}
                  className="ml-2 text-blue-500 hover:text-blue-600 transition-colors"
                >
                  {isPasswordVisible ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleEditToggle}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg
                          hover:from-yellow-500 hover:to-orange-600 transform hover:-translate-y-0.5 
                          transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Modal remains mostly the same, but add these styles to the modal container */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg rounded-2xl p-8 relative transform transition-all duration-300 scale-100">
              <button
                onClick={handleEditToggle}
                className="absolute top-3 right-3 text-gray-600"
              >
                ✖️
              </button>
              <h3 className="text-xl font-bold mb-4">Edit Account</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold">Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold">Password:</label>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-2 text-gray-600"
                    >
                      {isPasswordVisible ? "👁️‍🗨️" : "👁️"}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block font-bold">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold">Contact No.:</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold">Profile Picture:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                  {previewImage && (
                    <div className="mt-4">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-24 h-24 rounded-full"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center mt-6">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 bg-orange-500 text-white rounded disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                {error && (
                  <p className="text-red-500 mt-2">{error}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {isConfirmSaveOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white flex flex-col justify-center items-center w-full max-w-lg rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">ARE YOU SURE YOU WANT TO SAVE?</h3>
              <div className="flex justify-between gap-x-2">
                <button
                  onClick={confirmSave}
                  className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                  Yes
                </button> 
                <button
                  onClick={() => setIsConfirmSaveOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add this helper component
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 text-gray-600">
    <span className="text-blue-500">{icon}</span>
    <strong>{label}:</strong>
    <span>{value}</span>
  </div>
);

export default MyAccount;
