import React, { useState } from "react";

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: "+639623221472",
    email: "contact@company.com",
    location: "123 Business St, City, Country",
    socials: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(contactInfo);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setContactInfo(editedInfo);
    setIsEditing(false);
  };

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
          {/* Contact Number */}
          <div className="flex items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.6a1 1 0 01.7.3l1.4 1.4a1 1 0 01.3.7V6a1 1 0 001 1h2a1 1 0 001-1v-.6a1 1 0 01.3-.7l1.4-1.4a1 1 0 01.7-.3H19a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800">Phone</p>
              <p className="text-gray-600">{contactInfo.phone}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12v.01M8 12v.01M12 12v.01M21 12c0-5.523-4.477-10-10-10S1 6.477 1 12c0 4.4 3.7 8.001 8.4 8.7 1.7.7 3.6.9 5.6.7"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-gray-600">{contactInfo.email}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 10h6m4.6-1.9l1.4 1.4M17 8.6a5 5 0 00-7.9-5.6m0 0l-1.4 1.4M5 9l-2.5 2.5m0 0L4.6 12.9M2.6 13.5L5 15.9m0 0L2.6 18.4M5 15.9l2.5 2.5M7.9 19.9a5 5 0 007.2-.2"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800">Location</p>
              <p className="text-gray-600">{contactInfo.location}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 21V8m0 0L3 10m3-2l3 2M9 21h12m0 0V8m0 13h3m-3 0L9 8"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800">Socials</p>
              <div className="flex flex-col">
                <a
                  href={contactInfo.socials.facebook}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  href={contactInfo.socials.twitter}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <a
                  href={contactInfo.socials.linkedin}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleEdit}
          className="mt-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Contact Info
        </button>

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
                    value={editedInfo.socials.facebook}
                    onChange={handleSocialChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Twitter</label>
                  <input
                    type="text"
                    name="twitter"
                    value={editedInfo.socials.twitter}
                    onChange={handleSocialChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">LinkedIn</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={editedInfo.socials.linkedin}
                    onChange={handleSocialChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 px-4 py-2 rounded mr-2"
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
