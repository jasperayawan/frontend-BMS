import React, { useEffect, useState } from "react";
import axios from "axios";
import { CONTACTUS } from "../helper/api";
import toast from "react-hot-toast";
import Parse from "parse/dist/parse.min.js";
import { Phone, LocateIcon, MailIcon } from "lucide-react";
import { X } from "lucide-react";

// API call functions
const createContactus = async (data) => {
  const response = await axios.post(CONTACTUS, data);
  return response.data;
};

const updateContactus = async (data) => {
  const response = await axios.put(CONTACTUS, data);
  return response.data;
};

const deleteContactus = async (id) => {
  const response = await axios.delete(CONTACTUS + `/${id}`);
  return response.data;
};

// Main component
const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState({});
  const user = Parse.User.current();

  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const [isOk, setIsOk] = useState(false);

  // Handle opening the edit modal
  const handleEdit = () => {
    setEditedInfo(contactInfo);
    setIsEditing(true);
  };

  // Save changes (create or update)
  const handleSave = async () => {
    try {
      if (editedInfo.objectId) {
        // Update existing contact info
        const response = await updateContactus({
          id: editedInfo.objectId,
          phone: editedInfo.phone,
          email: editedInfo.email,
          location: editedInfo.location,
          socials: editedInfo.socials,
        });

        if (response.success) {
          setContactInfo(response.data);
          setIsOk(true);
        } else {
          toast.error("Failed to update contact info.");
        }
      } else {
        // Create new contact info
        const response = await createContactus(editedInfo);
        if (response.success) {
          setContactInfo(response.data);
          toast.success("Contact info created successfully!");
          window.location.reload();
        } else {
          toast.error("Failed to create contact info.");
        }
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving contact info:", error);
      toast.error("An error occurred while saving contact info.");
    }
  };

  // Delete the current contact info
  const handleDelete = async () => {
    try {
      const response = await deleteContactus(contactInfo.id);
      if (response.success) {
        setContactInfo({
          id: null,
          phone: "",
          email: "",
          location: "",
          socials: { facebook: "", twitter: "", linkedin: "" },
        });
        alert("Contact info deleted successfully!");
      } else {
        alert("Failed to delete contact info.");
      }
    } catch (error) {
      console.error("Error deleting contact info:", error);
      alert("An error occurred while deleting contact info.");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({
      ...prev,
      socials: { ...prev.socials, [name]: value },
    }));
  };

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await axios.get(CONTACTUS);
        setContactInfo(res.data[0]);
      } catch (err) {
        console.log(err.response.data.error);
      }
    };
    fetchContactInfo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-y-10 justify-center items-center py-12">

      {isOk && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">  
        <div className="bg-zinc-300 rounded-lg shadow-xl w-[400px]">
          <div className="bg-zinc-400 flex justify-end items-center px-2 h-8">
            <button
              onClick={() => {
                setIsOk(false);
                window.location.reload();
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

      <h1 className="text-2xl text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2">
        CONTACT US
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <div className="flex-1 bg-white rounded-2xl p-5">
          <p className="text-center text-gray-600 mb-12 text-lg">
            We're here to help! Reach out to us through any of these channels.
          </p>

          {/* Contact Details */}
          <div className="flex flex-col gap-3">
            {/* Phone */}
            <div className="flex justify-start items-center transform hover:scale-105 transition-transform duration-300 bg-orange-50 p-2 rounded-xl shadow-md hover:shadow-lg">
              <div className="flex items-center">
                <div className="bg-orange-200 p-2 rounded-full">
                  <Phone />
                </div>
                <div className="ml-2 w-full">
                  <p className="font-semibold text-gray-800 text-lg">Phone</p>
                  <p className="text-gray-600 hover:text-blue-600 transition-colors">
                    {contactInfo?.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex justify-start items-center transform hover:scale-105 transition-transform duration-300 bg-orange-50 p-2 rounded-xl shadow-md hover:shadow-lg">
              <div className="flex items-center">
                <div className="bg-orange-200 p-2 rounded-full">
                  <MailIcon />
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-gray-800 text-lg">Email</p>
                  <p className="text-gray-600 hover:text-blue-600 transition-colors break-all">
                    {contactInfo?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex justify-start items-center transform hover:scale-105 transition-transform duration-300 bg-orange-50 p-2 rounded-xl shadow-md hover:shadow-lg">
              <div className="flex items-center">
                <div className="bg-orange-200 p-2 rounded-full">
                  <LocateIcon />
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-gray-800 text-lg">Location</p>
                  <p className="text-gray-600 hover:text-blue-600 transition-colors">
                    {contactInfo?.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex justify-start items-center transform hover:scale-105 transition-transform duration-300 bg-orange-50 p-2 rounded-xl shadow-md hover:shadow-lg">
              <div className="flex items-center">
                <div className="bg-orange-200 p-2 rounded-full">
                  <svg className="h-7 w-7 text-blue-600" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-4-9a4 4 0 108 0 4 4 0 00-8 0z" />
                  </svg>
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-gray-800 text-lg">Socials</p>
                  <div className="flex gap-4 mt-2">
                    <a
                      href={contactInfo.socials?.facebook}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                        </svg>
                    </a>
                    <a
                      href={contactInfo.socials?.twitter}
                      className="text-blue-400 hover:text-blue-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                      </svg>
                    </a>
                    <a
                      href={contactInfo.socials?.linkedin}
                      className="text-blue-700 hover:text-blue-900 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Buttons */}
          {user?.get("role") !== "SECRETARY" &&
            user?.get("role") !== "PATIENT" &&
            user?.get("role") === "ADMIN" && (
              <div className="flex justify-center gap-4 mt-12">
                <button
                  onClick={handleEdit}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Edit
                </button>
                {/* <button 
                onClick={handleDelete} 
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-md"
              >
                Delete
              </button> */}
              </div>
            )}

          {/* Edit Modal */}
          {isEditing && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
              <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Edit Contact Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="number"
                      name="phone"
                      value={editedInfo.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editedInfo.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={editedInfo.location}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Facebook
                    </label>
                    <input
                      type="text"
                      name="facebook"
                      value={editedInfo.socials?.facebook}
                      onChange={handleSocialChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Twitter
                    </label>
                    <input
                      type="text"
                      name="twitter"
                      value={editedInfo.socials?.twitter}
                      onChange={handleSocialChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Telegram
                    </label>
                    <input
                      type="text"
                      name="linkedin"
                      value={editedInfo.socials?.linkedin}
                      onChange={handleSocialChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 w-full lg:w-[600px]">
        <iframe className="w-full" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15481.176806370144!2d123.4302269!3d7.8277795!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x325423be8d5764a5%3A0xc0f99cc8e405ebb5!2sSan%20Francisco%20Barangay%20Hall!5e1!3m2!1sen!2sph!4v1743352923731!5m2!1sen!2sph" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
