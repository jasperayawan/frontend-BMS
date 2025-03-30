import React, { useEffect, useState } from "react";
import axios from "axios";
import { CONTACTUS } from "../helper/api";
import toast from "react-hot-toast";
import Parse from "parse/dist/parse.min.js";
import { Phone, LocateIcon, MailIcon } from "lucide-react";

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
          toast.success("SAVE CHANGES SUCCESSFULLY!");
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
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href={contactInfo.socials?.twitter}
                      className="text-blue-400 hover:text-blue-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href={contactInfo.socials?.linkedin}
                      className="text-blue-700 hover:text-blue-900 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
                      LinkedIn
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
        <iframe className="w-full" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d494.0864493797512!2d123.437447!3d7.822431000000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x325417c0001e3a91%3A0xffdf13b94227abbe!2sSouthern%20Mindanao%20College!5e0!3m2!1sen!2sus!4v1743344956300!5m2!1sen!2sus" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
