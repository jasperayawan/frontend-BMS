import React, { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import Parse from "parse/dist/parse.min.js";
import { IoMdClose } from "react-icons/io";

const Home = () => {
  const { loadingLoading, logout } = useLogout();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcementImages, setAnnouncementImages] = useState([]);
  const [announcement, setAnnouncement] = useState("")
  const user = Parse.User.current();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [removedImages, setRemovedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file)); 
    setAnnouncementImages([...announcementImages, ...newImages]); 
  };

  const handleRemoveImage = (index) => {
    const imageUrl = announcementImages[index];
    if (imageUrl.startsWith('http')) {
      setRemovedImages([...removedImages, imageUrl]);
    }
    const updatedImages = announcementImages.filter((_, i) => i !== index);
    setAnnouncementImages(updatedImages);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const imagePromises = announcementImages
        .filter(img => !img.startsWith('http')) // Only process new images
        .map(async (imageUrl) => {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
        });

      const base64Images = await Promise.all(imagePromises);

      if (selectedAnnouncement) {
        // Update existing announcement
        const params = {
          id: selectedAnnouncement.id,
          title,
          description,
          images: base64Images,
          removedImages
        };

        const result = await Parse.Cloud.run("updateAnnouncement", params);
        
        if (result.success) {
          resetForm();
          fetchAnnouncements();
        }
      } else {
        // Create new announcement
        const params = {
          title,
          description,
          images: base64Images
        };

        const result = await Parse.Cloud.run("createAnnouncement", params);
        
        if (result.success) {
          resetForm();
          fetchAnnouncements();
        }
      }
    } catch (error) {
      console.error("Error saving announcement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    setTitle(announcement.title);
    setDescription(announcement.description);
    setAnnouncementImages(announcement.images || []);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setSelectedAnnouncement(null);
    setTitle("");
    setDescription("");
    setAnnouncementImages([]);
    setRemovedImages([]);
  };

  useEffect(() => {
    const asyncUser = async () => {
      const user = Parse.User.current();

      if (user) {
        const username = user.get("username");
        const email = user.get("email");

        setUserInfo({
          username,
          email,
        });
      } else {
        return;
      }
    };
    asyncUser();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const results = await Parse.Cloud.run("getAnnouncements");
      setAnnouncements(results);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
      <button
        onClick={handleLogout}
        className="absolute top-4 left-4 bg-zinc-700 hover:bg-zinc-800 transition-colors rounded-md px-4 py-2 text-white"
      >
        {loading ? "loading..." : "logout"}
      </button>

      <div className="max-w-6xl mx-auto pt-16">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
          Welcome <span className="text-yellow-500">{user?.get('role')}!</span>
        </h1>

        <div className="grid gap-6">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div 
                key={announcement.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {announcement.title}
                    </h2>
                    {user?.get('role') !== 'PATIENT' && (
                      <button
                        onClick={() => handleEdit(announcement)}
                        className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded-md flex items-center gap-2"
                      >
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-wrap break-words font-sans">
                    {announcement.description}
                  </p>

                  {announcement.images?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {announcement.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Announcement ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 text-sm text-gray-500">
                    Posted: {new Date(announcement.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              No announcements available
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl m-4 relative">
            <button 
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <IoMdClose size={24} />
            </button>
            
            <form onSubmit={handleSubmit} className="p-6">
              <h2 className="text-2xl font-semibold mb-6">
                {selectedAnnouncement ? 'Edit' : 'Create'} Announcement
              </h2>
              
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title"
                className="w-full p-3 rounded-md border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Enter your announcement" 
                className="w-full p-3 rounded-md border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {announcementImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <IoMdClose size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <label className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded-md cursor-pointer">
                  <input
                    type="file"
                    id="announcementImages"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  Add Images
                </label>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'
                  } transition-colors text-white px-6 py-2 rounded-md flex items-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{selectedAnnouncement ? 'Updating...' : 'Creating...'}</span>
                    </>
                  ) : (
                    <span>{selectedAnnouncement ? 'Update' : 'Create'} Announcement</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
