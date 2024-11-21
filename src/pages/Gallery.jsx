import React, { useState } from "react";

const Gallery = () => {
  const [galleries, setGalleries] = useState([
    { name: "PRENATAL", files: ["/prenatal.svg"] },
    { name: "IMMUNIZATION", files: ["/immunization.svg"] },
    { name: "FAMILY PLANNING", files: ["/family-planning.svg"] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFile, setNewFile] = useState(null);

  // Add a new gallery folder
  const handleAddGallery = () => {
    if (folderName.trim()) {
      const newGallery = {
        name: folderName,
        files: newFile ? [URL.createObjectURL(newFile)] : [],
      };
      setGalleries([...galleries, newGallery]);
      setFolderName("");
      setNewFile(null);
      setShowModal(false);
    }
  };

  // Add files to an existing gallery
  const handleAddFiles = (folderIndex) => {
    if (newFile) {
      const updatedGalleries = [...galleries];
      updatedGalleries[folderIndex].files.push(URL.createObjectURL(newFile));
      setGalleries(updatedGalleries);
      setNewFile(null);
    }
  };

  // Remove a file from a gallery
  const handleRemoveFile = (folderIndex, fileIndex) => {
    const updatedGalleries = [...galleries];
    updatedGalleries[folderIndex].files.splice(fileIndex, 1);
    setGalleries(updatedGalleries);
  };

  // Delete a gallery
  const handleDeleteGallery = (folderIndex) => {
    const updatedGalleries = galleries.filter((_, index) => index !== folderIndex);
    setGalleries(updatedGalleries);
    if (selectedFolder === folderIndex) setSelectedFolder(null);
  };

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
                Delete Gallery
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
                Create Folder
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
                  Add File
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
