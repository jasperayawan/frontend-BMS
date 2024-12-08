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

  // Add these new helper functions near your other handlers
  const insertBulletPoint = (e) => {
    e.preventDefault();
    const textarea = e.target.parentNode.nextElementSibling;
    const cursorPos = textarea.selectionStart;
    const text = modalType === "add" ? newService.desc : selectedService.desc;
    const newText = text.slice(0, cursorPos) + "\n• " + text.slice(cursorPos);
    
    if (modalType === "add") {
      setNewService({ ...newService, desc: newText });
    } else {
      setSelectedService({ ...selectedService, desc: newText });
    }
  };

  const insertNumberedPoint = (e) => {
    e.preventDefault();
    const textarea = e.target.parentNode.nextElementSibling;
    const cursorPos = textarea.selectionStart;
    const text = modalType === "add" ? newService.desc : selectedService.desc;
    
    // Count existing numbered points to determine the next number
    const lines = text.slice(0, cursorPos).split('\n');
    const numberedLines = lines.filter(line => /^\d+\./.test(line));
    const nextNumber = numberedLines.length + 1;
    
    const newText = text.slice(0, cursorPos) + `\n${nextNumber}. ` + text.slice(cursorPos);
    
    if (modalType === "add") {
      setNewService({ ...newService, desc: newText });
    } else {
      setSelectedService({ ...selectedService, desc: newText });
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
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 relative">
          Our Services
        </h1>

        {/* Add new service button */}
        {(user?.get('role') !== 'SECRETARY' && user?.get('role') !== 'PATIENT' && user?.get('role') === 'ADMIN') && (
          <button
            onClick={() => openModal("add")}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Service
          </button>
        )}
      </div>

      {/* Services Grid instead of Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(servicesData) &&
          servicesData.map((service, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4 whitespace-pre-line">
                  {service.desc.length > 100
                    ? `${service.desc.slice(0, 100)}...`
                    : service.desc}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal("view", service)}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
                  >
                    View Details
                  </button>
                  {(user?.get('role') !== 'SECRETARY' && user?.get('role') !== 'PATIENT' && user?.get('role') ===  'ADMIN') && (
                    <>
                      <button
                        onClick={() => openModal("edit", service)}
                        className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.objectId)}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                      >
                        {loading ? 'Loading...' : 'Delete'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal with improved styling */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] max-h-[600px] overflow-y-auto relative shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {modalType === "add"
                ? "Add New Service"
                : modalType === "view"
                ? "View Service"
                : "Edit Service"}
            </h2>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
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
                <p className="whitespace-pre-wrap break-words font-sans">
                  {selectedService.desc}
                </p>
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
                {/* Add formatting buttons */}
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={insertBulletPoint}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                    title="Add bullet point"
                  >
                    • Bullet List
                  </button>
                  <button
                    onClick={insertNumberedPoint}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                    title="Add numbered point"
                  >
                    1. Numbered List
                  </button>
                </div>

                <textarea
                  placeholder="Description&#10;• Use bullet points&#10;1. Or numbered lists"
                  value={modalType === "add" ? newService.desc : selectedService?.desc || ""}
                  onChange={(e) =>
                    modalType === "add"
                      ? setNewService({ ...newService, desc: e.target.value })
                      : setSelectedService({
                          ...selectedService,
                          desc: e.target.value,
                        })
                  }
                  rows={10}
                  className="border px-2 py-1 mb-2 w-full whitespace-pre-wrap font-sans"
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
