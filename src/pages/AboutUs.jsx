import React, { useState } from "react";

const AboutUs = () => {
  const [team, setTeam] = useState([
    {
      id: 1,
      name: "Rosalie A. Soriano",
      role: "Punong Barangay",
      image: null,
    },
    {
      id: 2,
      name: "Joselito S. Dela Cruz",
      role: "SB Member",
      image: null,
    },
    {
      id: 3,
      name: "Vincent Q. Valdez",
      role: "SB Member",
      image: null,
    },
  ]);

  const [form, setForm] = useState({ id: null, name: "", role: "", image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file ? URL.createObjectURL(file) : null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setTeam(
        team.map((member) =>
          member.id === form.id ? { ...form, id: member.id } : member
        )
      );
    } else {
      setTeam([...team, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: "", role: "", image: null });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setTeam(team.filter((member) => member.id !== id));
  };

  const handleEdit = (member) => {
    setForm(member);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setForm({ id: null, name: "", role: "", image: null });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  return (
    <div className="relative p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Barangay Officials</h1>

      {/* Add New Member Button */}
      <button
        onClick={openAddModal}
        className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add New Member
      </button>

      {/* Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
        {team.map((member) => (
          <div key={member.id} className="text-center relative">
            <div className="relative inline-block">
              <img
                src={member.image || "https://via.placeholder.com/150"}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full"
              />
              <button
                onClick={() => handleDelete(member.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                ✕
              </button>
            </div>
            <h2 className="font-semibold mt-4">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
            <button
              onClick={() => handleEdit(member)}
              className="mt-2 text-blue-600 hover:underline"
            >
              Edit
            </button>
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
                  onChange={handleImageChange}
                  className="w-full"
                />
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
                  {isEditing ? "Update" : "Add"}
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
