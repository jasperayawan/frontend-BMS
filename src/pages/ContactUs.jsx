import React, { useEffect, useState } from "react";
import axios from "axios";
import { CONTACTUS } from "../helper/api";
import toast from "react-hot-toast";
import Parse from "parse/dist/parse.min.js";

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
    setEditedInfo(contactInfo)
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
          toast.success("Contact info updated successfully!");
          window.location.reload()
        } else {
          toast.error("Failed to update contact info.");
        }
      } else {
        // Create new contact info
        const response = await createContactus(editedInfo);
        if (response.success) {
          setContactInfo(response.data);
          toast.success("Contact info created successfully!");
          window.location.reload()
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
      try{
        const res = await axios.get(CONTACTUS);
        setContactInfo(res.data[0])
      }
      catch(err){
        console.log(err.response.data.error)
      }
    }
    fetchContactInfo();
  },[])


  return (
    <div className="bg-gray-100 flex justify-center items-center py-16">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          We'd love to hear from you! Reach out to us via the methods below.
        </p>

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phone */}
          <div className="flex items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg className="h-6 w-6 text-blue-600" /* SVG details omitted */></svg>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800">Phone</p>
              <p className="text-gray-600">{contactInfo?.phone}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg className="h-6 w-6 text-blue-600" /* SVG details omitted */></svg>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-gray-600">{contactInfo?.email}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg className="h-6 w-6 text-blue-600" /* SVG details omitted */></svg>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800">Location</p>
              <p className="text-gray-600">{contactInfo?.location}</p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg className="h-6 w-6 text-blue-600" /* SVG details omitted */></svg>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800">Socials</p>
              <div className="flex flex-col">
                <a href={contactInfo.socials?.facebook} className="text-blue-600 hover:underline">
                  Facebook
                </a>
                <a href={contactInfo.socials?.twitter} className="text-blue-600 hover:underline">
                  Twitter
                </a>
                <a href={contactInfo.socials?.linkedin} className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        {user?.get('role') !== 'SECRETARY' || 'ADMIN' && (
          <div className="flex justify-between mt-8">
          <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Edit
          </button>
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Delete
          </button>
        </div>
        )}

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-[500px]">
              <h2 className="text-xl font-bold mb-4">Edit Contact Info</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={editedInfo.phone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedInfo.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editedInfo.location}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Facebook</label>
                  <input
                    type="text"
                    name="facebook"
                    value={editedInfo.socials?.facebook}
                    onChange={handleSocialChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Twitter</label>
                  <input
                    type="text"
                    name="twitter"
                    value={editedInfo.socials?.twitter}
                    onChange={handleSocialChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">LinkedIn</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={editedInfo.socials?.linkedin}
                    onChange={handleSocialChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
