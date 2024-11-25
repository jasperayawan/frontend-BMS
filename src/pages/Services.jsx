import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVICES } from "../helper/api";
import Parse from "parse/dist/parse.min.js";

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // Can be 'add', 'view', or 'edit'
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = Parse.User.current()
  const [newService, setNewService] = useState({
    id: null,
    image: "",
    title: "",
    desc: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

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
    setNewService({
      image: "",
      title: "",
      desc: "",
    });
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
            image: reader.result,
          }));
        } else {
          setNewService((prevService) => ({
            ...prevService,
            image: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    } else if (!file && isEdit && selectedService.image) {
      // If the file input is empty and it's an edit, retain the original image
      setImagePreview(selectedService.image);
    } else if (!file && !isEdit && newService.image) {
      // If the file input is empty and it's a new service, retain the image preview if it exists
      setImagePreview(newService.image);
    }
  };

  // Handle adding a new service
  const handleAddService = async () => {
    setLoading(true);
    try {
      if (newService.title && newService.desc && newService.image) {

        const formData = {
          title: newService.title,
          desc: newService.desc,
          imageBase64: newService.image,
        };

        const response = await axios.post(SERVICES, formData);

        // Update the services list
        setServicesData([...servicesData, response.data.service]);
        closeModal();
      }
    } catch (error) {
      console.error(
        "Error adding service:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a service
  const handleEditService = async () => {
    setLoading(true)
    try {
      const updatedService = {
        title: selectedService.title,
        desc: selectedService.desc,
        imageBase64: selectedService.image,
      };

      // PUT request to update service
      const response = await axios.put(
        SERVICES + `/${selectedService.objectId}`,
        updatedService
      );

      // Update the service in the list
      setServicesData(
        servicesData.map((service) =>
          service.objectId === response.data.service.id
            ? response.data.service
            : service
        )
      );
      closeModal();
    } catch (error) {
      console.error(
        "Error editing service:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false)
    }
  };

  // Handle deleting a service
  const handleDeleteService = async (id) => {
    setLoading(true)
    try {
      await axios.delete(SERVICES + `/${id}`);
      setServicesData(servicesData.filter((service) => service.objectId !== id));
    } catch (error) {
      console.error(
        "Error deleting service:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(SERVICES);
        setServicesData(response.data);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);


  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col mx-3">
        <h1 className="text-2xl flex justify-center items-center font-semibold">
          Services
        </h1>

        {/* Add new service button */}
        {(user?.get('role') !== 'SECRETARY' && user?.get('role') !== 'PATIENT' && user?.get('role') === 'ADMIN') && (
          <button
            onClick={() => openModal("add")}
            className="bg-blue-500 text-white w-[max-content] px-4 py-2 rounded hover:bg-blue-600 mb-5"
          >
            Add Service
          </button>
        )}
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
          {Array.isArray(servicesData) &&
            servicesData.map((service, i) => (
              <tr key={i}>
                <td className="border border-gray-300 px-4 py-2">
                  {service.objectId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {service.title}
                </td>
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
                  {(user?.get('role') !== 'SECRETARY' && user?.get('role') !== 'PATIENT' && user?.get('role') ===  'ADMIN') && (
                    <button
                    onClick={() => openModal("edit", service)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  )}
                  {(user?.get('role') !== 'SECRETARY' && user?.get('role') !== 'PATIENT' && user?.get('role') ===  'ADMIN') && (
                    <button
                      onClick={() => handleDeleteService(service.objectId)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      {loading ? 'Loading...' : 'Delete'}
                    </button>
                  )}
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
                <h3 className="font-semibold text-lg">
                  {selectedService.title}
                </h3>
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
                          title: e.target.value,
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
                          desc: e.target.value,
                        })
                  }
                  className="border px-2 py-1 mb-2"
                />
                {modalType === "add" ? (
                  <button
                    onClick={handleAddService}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {loading ? "Loading..." : "Add Service"}
                  </button>
                ) : (
                  <button
                    onClick={handleEditService}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    {loading ? 'Loading...' : 'Edit Service'}
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
