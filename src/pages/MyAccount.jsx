import React, { useEffect, useState } from "react";
import Parse from 'parse/dist/parse.min.js';

const MyAccount = () => {
  const [account, setAccount] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState(account);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = Parse.User.current();

  const handleEditToggle = () => {
    setIsModalOpen(!isModalOpen);
    setFormData(account); // Reset formData if editing is canceled
    setPreviewImage(account.profileImage);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
    setAccount(formData);
    setIsModalOpen(false);
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
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold mb-6">MY ACCOUNT</h2>
        <div className="flex items-center space-x-4 mb-4">
          {/* Profile Picture */}
          <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
            {account.profilePicture ? (
              <img
                src={account.profilePicture instanceof File ? previewImage : account.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-xl font-bold text-gray-600">
                JD
              </div>
            )}
          </div>
          {/* Account Info */}
          <div>
            <p><strong>ID:</strong> {account.id}</p>
            <p><strong>NAME:</strong> {account.name}</p>
            <p><strong>USER TYPE:</strong> {account.role}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>BIRTHDATE:</strong> {account.birthdate}</p>
            <p><strong>AGE:</strong> {account.age}</p>
            <p><strong>BLOOD TYPE:</strong> {account.bloodType}</p>
          </div>
          <div>
            <p><strong>ADDRESS:</strong> {account.address}</p>
            <p><strong>CONTACT NO.:</strong> {account.contact}</p>
          </div>
        </div>
        <div className="mt-4">
          <p><strong>EMAIL:</strong> {account.email}</p>
          <p><strong>USERNAME:</strong> {account.username}</p>
          <p>
            <strong>PASSWORD:</strong>{" "}
            {isPasswordVisible ? account.password : "********"}
            <button
              onClick={togglePasswordVisibility}
              className="ml-2 text-blue-500"
            >
              {isPasswordVisible ? "👁️‍🗨️" : "👁️"}
            </button>
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
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
                  name="contactNo"
                  value={formData.contactNo}
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
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
