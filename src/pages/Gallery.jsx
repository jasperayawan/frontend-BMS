import React, { useEffect, useState } from "react";
import { GALLERY } from "../helper/api";
import { toBase64 } from "../utils/toBase64";
import axios from "axios";
import toast from "react-hot-toast";
import Parse from "parse/dist/parse.min.js";
import { FaFolderPlus, FaImage, FaTimes, FaTrash } from 'react-icons/fa';

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = Parse.User.current();
  const [newFile, setNewFile] = useState(null);

  // Add a new gallery folder
  const handleAddGallery = async () => {
    if (!folderName.trim() || !newFile) return;
    setLoading(true);
    try {
      // Convert the selected file to a base64 string
      const base64Image = await toBase64(newFile);

      // Create a plain object to send
      const formData = {
        galleryName: folderName,
        galleryImage: base64Image,
      };

      // Call backend API to create gallery
      const response = await axios.post(GALLERY, formData);

      // On successful API response, update the galleries state with the new gallery data
      const newGallery = response.data.gallery;
      setGalleries([...galleries, newGallery]);
      // Clear state
      setFolderName("");
      setNewFile(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating gallery:", error);
      alert("Error creating gallery, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add files to an existing gallery
  const handleAddFiles = async (folderIndex) => {
    if (!newFile) return;

    setLoading(true);

    try {
      // Convert file to Base64 (you can use your existing `toBase64` utility)
      const base64Image = await toBase64(newFile);

      const gallery = galleries[folderIndex];
      const formData = {
        galleryId: gallery.id, // Send the gallery ID
        file: base64Image, // Send the Base64 encoded file
      };

      // Send the object data to the backend API
      const response = await axios.post(
        GALLERY + `/addFileToGallery/${gallery.id}`,
        formData
      );
      // Update the gallery with the new file URL returned from the backend
      const updatedGalleries = [...galleries];
      updatedGalleries[folderIndex].files.push(response.data.fileUrl); // Assuming response contains the file URL
      setGalleries(updatedGalleries);

      // Clear file input after upload
      setNewFile(null);
    } catch (error) {
      console.error("Error adding file:", error);
      alert("Error adding file, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Remove a file from a gallery
  const handleRemoveFile = async (folderIndex, fileIndex) => {
    try {
      const galleryId = galleries[folderIndex].id; // Assuming you have the gallery ID
      const fileUrl = galleries[folderIndex].files[fileIndex];

      // Remove the file from the local state
      const updatedGalleries = [...galleries];
      updatedGalleries[folderIndex].files.splice(fileIndex, 1);
      setGalleries(updatedGalleries);

      // Send the DELETE request with fileUrl in the data field
      const response = await axios.delete(
        GALLERY + `/removeFileFromFolder/${galleryId}`,
        {
          data: { fileUrl }, // This correctly sends the fileUrl in the request body
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error removing file:", error.response.data.message);
    }
  };

  // Delete a gallery
  const handleDeleteGallery = async (folderIndex) => {
    const gallery = galleries[folderIndex];
    setLoading(true);
    try {
      const response = await axios.delete(GALLERY + `/${gallery.id}`);
      setGalleries(galleries.filter((_, index) => index !== folderIndex));
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGallery = async () => {
    const updatedData = {
      galleryName: folderName,
      galleryImage: newFile,
      prevImage: prevImage, // Only include previous image if updating
    };

    try {
      const galleryToUpdate = galleries[selectedFolder];
      const response = await axios.put(
        GALLERY`/${galleryToUpdate.objectId}`,
        updatedData
      );

      const updatedGalleries = [...galleries];
      updatedGalleries[selectedFolder] = response.data.gallery;
      setGalleries(updatedGalleries);
      setFolderName("");
      setNewFile(null);
      setPrevImage(""); // Reset previous image
      setSelectedFolder(null);
    } catch (error) {
      console.error("Error updating gallery:", error);
    }
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(GALLERY);
        setGalleries(res.data.galleries);
      } catch (err) {
        console.log(err.response.data.error);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Photo Gallery
          </h1>
          {(user?.get("role") !== "SECRETARY" && user?.get('role') !== 'PATIENT' && user?.get("role") === 'ADMIN') && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 
                        text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 
                        transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FaFolderPlus className="mr-2" />
              Add New Gallery
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((gallery, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 
                         transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedFolder(index)}
            >
              <div className="relative h-64">
                <img
                  src={gallery.files[0] || "/placeholder.svg"}
                  alt={gallery.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{gallery.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {gallery.files.length} photos
                  </span>
                  {(user?.get("role") !== "SECRETARY" && user?.get('role') !== 'PATIENT' && user?.get("role") === 'ADMIN') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteGallery(index);
                      }}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Adding New Gallery */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl p-8 relative transform transition-all duration-300">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={24} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Gallery</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gallery Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter gallery name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                              focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => setNewFile(e.target.files[0])}
                      className="hidden"
                      id="gallery-cover"
                    />
                    <label
                      htmlFor="gallery-cover"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed 
                                border-gray-300 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors"
                    >
                      <FaImage className="mr-2 text-gray-400" />
                      <span className="text-gray-600">
                        {newFile ? newFile.name : "Choose a cover image"}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 
                              hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddGallery}
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white 
                              rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all 
                              duration-200 disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create Gallery"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Viewing Folder Content */}
        {selectedFolder !== null && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-4xl rounded-2xl p-8 relative max-h-[80vh] overflow-y-auto">
              <button
                onClick={() => setSelectedFolder(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={24} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {galleries[selectedFolder].name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleries[selectedFolder].files.map((file, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={file}
                      alt={`File ${idx}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {(user?.get("role") !== "SECRETARY" && user?.get('role') !== 'PATIENT' && (user?.get("role") === 'ADMIN' || user?.get("role") === 'NURSE')) && (
                      <button
                        onClick={() => handleRemoveFile(selectedFolder, idx)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {(user?.get("role") !== "SECRETARY" && user?.get('role') !== 'PATIENT' && (user?.get("role") === 'ADMIN' || user?.get("role") === 'NURSE')) && (
                <div className="mt-6">
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => setNewFile(e.target.files[0])}
                      className="hidden"
                      id="add-photos"
                    />
                    <label
                      htmlFor="add-photos"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 
                                border-dashed border-gray-300 rounded-lg cursor-pointer 
                                hover:border-yellow-400 transition-colors"
                    >
                      <FaImage className="mr-2 text-gray-400" />
                      <span className="text-gray-600">
                        {newFile ? newFile.name : "Choose photos to add"}
                      </span>
                    </label>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleAddFiles(selectedFolder)}
                      disabled={loading}
                      className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 
                                text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 
                                transition-all duration-200 disabled:opacity-50"
                    >
                      {loading ? "Adding..." : "Add Photos"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
