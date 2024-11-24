import React, { useEffect, useState } from "react";
import { GALLERY } from "../helper/api";
import { toBase64 } from "../utils/toBase64";
import axios from 'axios'
import toast from "react-hot-toast";

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [loading, setLoading] = useState(false)
  const [newFile, setNewFile] = useState(null);

  // Add a new gallery folder
  const handleAddGallery = async () => {
    if (!folderName.trim() || !newFile) return;
    setLoading(true)
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
      setLoading(false)
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
      const response = await axios.post(GALLERY + `/addFileToGallery/${gallery.id}`, formData);
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
      const galleryId = galleries[folderIndex].id;  // Assuming you have the gallery ID
      const fileUrl = galleries[folderIndex].files[fileIndex];
      
      // Remove the file from the local state
      const updatedGalleries = [...galleries];
      updatedGalleries[folderIndex].files.splice(fileIndex, 1);
      setGalleries(updatedGalleries);

    // Send the DELETE request with fileUrl in the data field
    const response = await axios.delete(GALLERY + `/removeFileFromFolder/${galleryId}`, {
      data: { fileUrl }  // This correctly sends the fileUrl in the request body
    });

      
      toast.success(response.data.message); 
    } catch (error) {
      console.error("Error removing file:", error.response.data.message);
    }
  };
  

  // Delete a gallery
  const handleDeleteGallery = async (folderIndex) => {
    const gallery = galleries[folderIndex];
    setLoading(true)
    try {
      const response = await axios.delete(GALLERY + `/${gallery.id}`);
      setGalleries(galleries.filter((_, index) => index !== folderIndex));
      console.log(response.data)
    } catch (error) {
      console.error("Error deleting gallery:", error);
    } finally {
      setLoading(false)
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
      const response = await axios.put(GALLERY `/${galleryToUpdate.objectId}`, updatedData);
      
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
      try{
        const res = await axios.get(GALLERY);
        setGalleries(res.data.galleries)
      }
      catch(err){
        console.log(err.response.data.error)
      }
    }
    fetchGallery();
  },[])

  return (
    <div className="flex justify-center items-center my-20">
      <div className="flex flex-col gap-y-10">
        <h1 className="text-2xl flex justify-center items-center font-semibold">
          GALLERY
        </h1>
        {/* Add New Gallery Button */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Add New Gallery
        </button>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 gap-4">
          {galleries.map((gallery, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-y-2 cursor-pointer"
              onClick={() => setSelectedFolder(index)}
            >
              <img
                src={gallery.files[0] || "/placeholder.svg"}
                alt={gallery.name}
                className="h-56 w-full object-cover rounded-md"
              />
              <h3>{gallery.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering folder selection
                  handleDeleteGallery(index);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                {loading ? 'Loading...' : 'Delete Gallery'}
              </button>
            </div>
          ))}
        </div>

        {/* Modal for Adding New Gallery */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Add New Gallery</h2>
              <input
                type="text"
                placeholder="Folder Name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              />
              <input
                type="file"
                onChange={(e) => setNewFile(e.target.files[0])}
                className="mb-4"
              />
              <button
                onClick={handleAddGallery}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                {loading ? 'Loading...' : 'Create Folder'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Modal for Viewing Folder Content */}
        {selectedFolder !== null && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[600px] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">
                {galleries[selectedFolder].name} Gallery
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {galleries[selectedFolder].files.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={file}
                      alt={`File ${idx}`}
                      className="h-40 w-full object-cover rounded-md"
                    />
                    <button
                      onClick={() => handleRemoveFile(selectedFolder, idx)}
                      className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <input
                  type="file"
                  onChange={(e) => setNewFile(e.target.files[0])}
                  className="mb-4"
                />
                <button
                  onClick={() => handleAddFiles(selectedFolder)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  {loading ? 'Loading...' : 'Add File'}
                </button>
                <button
                  onClick={() => setSelectedFolder(null)}
                  className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
