import React, { useEffect, useState } from "react";
import { toBase64 } from "../utils/toBase64";
import Parse from "parse/dist/parse.min.js";
import { ORGANIZATION } from "../helper/api";
import axios from "axios";
import toast from "react-hot-toast";

const AboutUs = () => {
  const [team, setTeam] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    role: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = Parse.User.current();
  const maxFileSize = 5 * 1024 * 1024;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (file) {
      // File size validation
      if (file.size > maxFileSize) {
        setError("File size exceeds the 5MB limit.");
        setForm({ ...form, image: null }); // Reset the image if the file is invalid
      } else {
        setError(""); // Clear error if file size is valid
        setForm({ ...form, image: file }); // Store the actual file in the state
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageBase64 =
        form.image instanceof File ? await toBase64(form.image) : form.image;

      if (isEditing) {
        const response = await axios.put(`${ORGANIZATION}/${form.id}`, {
          name: form.name,
          role: form.role,
          image: imageBase64,
        });

        if (response.data) {
          console.log('Update response:', response.data);
          
          const updatedMember = {
            objectId: form.id,
            name: form.name,
            role: form.role,
            image: imageBase64,
            ...response.data
          };

          setTeam(prevTeam =>
            prevTeam.map((member) =>
              member.objectId === form.id ? updatedMember : member
            )
          );
          toast.success("SAVE CHANGES!");
        }
      } else {
        const formData = {
          name: form.name,
          role: form.role,
          image: imageBase64,
        };

        const result = await Parse.Cloud.run("addOrUpdateMember", formData);

        if (result.success) {
          setTeam(prevTeam => [...prevTeam, result.data]);
          toast.success("Member added successfully");
        }
      }

      setForm({ id: null, name: "", role: "", image: null });
      setIsEditing(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving member:", error);
      toast.error(error.response?.data?.error || "Failed to save member");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setTeam(team.filter((member) => member.objectId !== id));

    try {
      const res = await axios.delete(`${ORGANIZATION}/${id}`);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  const handleEdit = (member) => {
    // Set form data with existing member data
    setForm({
      id: member.objectId,
      name: member.name,
      role: member.role,
      image: member.image, // Keep existing image
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setForm({ id: null, name: "", role: "", image: null });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const result = await axios.get(ORGANIZATION);
        setTeam(result.data);
      } catch (err) {
        console.log(err.response.data.error);
      }
    };
    fetchOrganization();
  }, []);

  return (
    <div className="relative p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Barangay Officials
      </h1>

      {/* Add New Member Button */}
      {user?.get("role") !== "SECRETARY" &&
        user?.get("role") !== "PATIENT" &&
        user?.get("role") === "ADMIN" && (
          <button
          onClick={openAddModal}
          className="bg-orange-500 ms-auto hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
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
          Add Member
        </button>
        )}


      {/* Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
        {team.map((member, i) => (
          <div key={i} className="text-center relative">
            <div className="relative inline-block">
              <img
                src={member.image || "https://via.placeholder.com/150"}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full"
              />
              {user?.get("role") !== "SECRETARY" &&
                user?.get("role") !== "PATIENT" &&
                user?.get("role") === "ADMIN" && (
                  <button
                    onClick={() => handleDelete(member.objectId)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>
                )}
            </div>
            <h2 className="font-semibold mt-4">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
            {user?.get("role") !== "SECRETARY" &&
              user?.get("role") !== "PATIENT" &&
              user?.get("role") === "ADMIN" && (
                <button
                  onClick={() => handleEdit(member)}
                  className="mt-2 text-blue-600 hover:underline"
                >
                  Edit
                </button>
              )}
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Member */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Member" : "Add New Member"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {isEditing
                    ? loading
                      ? "Loading..."
                      : "Update"
                    : loading
                    ? "Loading..."
                    : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
