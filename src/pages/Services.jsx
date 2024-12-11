import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVICES } from "../helper/api";
import Parse from "parse/dist/parse.min.js";
import toast from "react-hot-toast";

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // Can be 'add', 'view', or 'edit'
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = Parse.User.current();
  const [newService, setNewService] = useState({
    id: null,
    image: "",
    title: "",
    desc: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCardService, setSelectedCardService] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3;

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
        toast.success("SAVE SUCCESSFULLY!");
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
    setLoading(true);
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
      toast.success("SAVE CHANGES!");
      closeModal();
    } catch (error) {
      console.error(
        "Error editing service:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a service
  const handleDeleteService = async (id) => {
    setLoading(true);
    try {
      await axios.delete(SERVICES + `/${id}`);
      setServicesData(
        servicesData.filter((service) => service.objectId !== id)
      );
    } catch (error) {
      console.error(
        "Error deleting service:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
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
    const lines = text.slice(0, cursorPos).split("\n");
    const numberedLines = lines.filter((line) => /^\d+\./.test(line));
    const nextNumber = numberedLines.length + 1;

    const newText =
      text.slice(0, cursorPos) + `\n${nextNumber}. ` + text.slice(cursorPos);

    if (modalType === "add") {
      setNewService({ ...newService, desc: newText });
    } else {
      setSelectedService({ ...selectedService, desc: newText });
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex < servicesData.length - 3) {
      setCurrentIndex((prev) => prev + 1);
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
        <h1 className="text-2xl text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
          SERVICES
        </h1>
      </div>

      {/* Update the carousel section */}
      <div className="relative max-w-6xl mx-auto">
        <button
          onClick={prevSlide}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 z-10 ${
            currentIndex <= 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300"
          }`}
          disabled={currentIndex <= 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex justify-center gap-8 overflow-hidden">
          {Array.isArray(servicesData) &&
            servicesData
              .slice(currentIndex, currentIndex + 3)
              .map((service, i) => (
                <div
                  key={service.objectId || i}
                  className="w-72 text-center transition-all duration-300"
                  style={{
                    transform: i === 1 ? "scale(1)" : "scale(0.85)",
                    opacity: i === 1 ? "1" : "",
                  }}
                >
                  <div
                    className={`cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden relative group ${
                      selectedCardService?.objectId === service.objectId
                        ? "ring-2 ring-yellow-500"
                        : ""
                    }`}
                    onClick={() => setSelectedCardService(service)}
                    onDoubleClick={() => openModal("view", service)}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-800 uppercase">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <button
          onClick={nextSlide}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 z-10 ${
            currentIndex >= servicesData.length - 3
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300"
          }`}
          disabled={currentIndex >= servicesData.length - 3}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Admin Controls */}
      {user?.get("role") === "ADMIN" && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => openModal("add")}
            className="bg-white border-2 border-black px-8 py-2 hover:bg-gray-100"
          >
            ADD
          </button>
          <button
            onClick={() =>
              selectedCardService && openModal("edit", selectedCardService)
            }
            disabled={!selectedCardService}
            className={`bg-white border-2 border-black px-8 py-2 ${
              selectedCardService
                ? "hover:bg-gray-100"
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            EDIT
          </button>
        </div>
      )}

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
                <div className="flex justify-center mt-4">
                  <button
                    onClick={closeModal}
                    className="px-6 border-2 rounded-lg py-2 hover:bg-gray-100"
                  >
                    CLOSE
                  </button>
                </div>
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
                  rows={10}
                  className="border px-2 py-1 mb-2 w-full whitespace-pre-wrap font-sans"
                />

                <div className="flex flex-row justify-center items-center gap-x-2">
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
                      {loading ? "Loading..." : "Save"}
                    </button>
                  )}
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="px-6 border-2 rounded-lg py-2 hover:bg-gray-100"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
