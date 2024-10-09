import React, { useState } from "react";
import { servicesData as initialData } from "../helper/DummyData";

const Services = () => {
  const [servicesData, setServicesData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // Can be 'add', 'view', or 'edit'
  const [selectedService, setSelectedService] = useState(null);
  const [newService, setNewService] = useState({
    id: servicesData.length + 1,
    image: "",
    title: "",
    desc: ""
  });
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  // Open modal for different actions
  const openModal = (type, service = null) => {
    setModalType(type);
    setSelectedService(service);
    if (type === "edit" && service) {
      setImagePreview(service.image);
    }
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
    setNewService({ id: servicesData.length + 1, image: "", title: "", desc: "" });
    setImagePreview(null);
  };

  // Handle file input and preview
  const handleFileInput = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        if (isEdit) {
          setSelectedService((prevService) => ({
            ...prevService,
            image: reader.result
          }));
        } else {
          setNewService((prevService) => ({
            ...prevService,
            image: reader.result
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding a new service
  const handleAddService = () => {
    if (newService.title && newService.desc && newService.image) {
      setServicesData([...servicesData, { ...newService, id: servicesData.length + 1 }]);
      closeModal();
    }
  };

  // Handle editing a service
  const handleEditService = () => {
    setServicesData(
      servicesData.map((service) =>
        service.id === selectedService.id ? selectedService : service
      )
    );
    closeModal();
  };

  // Handle deleting a service
  const handleDeleteService = (id) => {
    setServicesData(servicesData.filter((service) => service.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col mx-3">
      <h1 className="text-2xl font-semibold mb-5">Services</h1>

            {/* Add new service button */}
            <button
            onClick={() => openModal("add")}
            className="bg-blue-500 text-white w-[max-content] px-4 py-2 rounded hover:bg-blue-600 mb-5"
            >
            Add Service
            </button>
      </div>

      {/* Services Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {servicesData.map((service) => (
            <tr key={service.id}>
              <td className="border border-gray-300 px-4 py-2">{service.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{service.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                {service.desc.length > 50
                  ? `${service.desc.slice(0, 50)}...`
                  : service.desc}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => openModal("view", service)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                >
                  View
                </button>
                <button
                  onClick={() => openModal("edit", service)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-md w-[400px] relative">
            <h2 className="text-xl font-semibold mb-4">
              {modalType === "add"
                ? "Add New Service"
                : modalType === "view"
                ? "View Service"
                : "Edit Service"}
            </h2>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              X
            </button>

            {/* View Mode */}
            {modalType === "view" && selectedService && (
              <div>
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="h-[150px] w-full object-cover mb-4"
                />
                <h3 className="font-semibold text-lg">{selectedService.title}</h3>
                <p>{selectedService.desc}</p>
              </div>
            )}

            {/* Add or Edit Mode */}
            {(modalType === "add" || modalType === "edit") && (
              <div className="flex flex-col">
                {/* Image Upload */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInput(e, modalType === "edit")}
                  className="mb-3"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-[150px] w-full object-cover mb-3"
                  />
                )}
                <input
                  type="text"
                  placeholder="Service Title"
                  value={
                    modalType === "add"
                      ? newService.title
                      : selectedService?.title || ""
                  }
                  onChange={(e) =>
                    modalType === "add"
                      ? setNewService({ ...newService, title: e.target.value })
                      : setSelectedService({
                          ...selectedService,
                          title: e.target.value
                        })
                  }
                  className="border px-2 py-1 mb-2"
                />
                <textarea
                  placeholder="Description"
                  value={
                    modalType === "add"
                      ? newService.desc
                      : selectedService?.desc || ""
                  }
                  onChange={(e) =>
                    modalType === "add"
                      ? setNewService({ ...newService, desc: e.target.value })
                      : setSelectedService({
                          ...selectedService,
                          desc: e.target.value
                        })
                  }
                  className="border px-2 py-1 mb-2"
                />
                {modalType === "add" ? (
                  <button
                    onClick={handleAddService}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add Service
                  </button>
                ) : (
                  <button
                    onClick={handleEditService}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit Service
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
