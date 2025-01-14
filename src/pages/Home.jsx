import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcementImages, setAnnouncementImages] = useState([]);
  const [announcement, setAnnouncement] = useState("");
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
  const [successMessage, setSuccessMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const location = useLocation()

  const unregisteredUser = localStorage.getItem("unregisteredUser")
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setAnnouncementImages([...announcementImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const imageUrl = announcementImages[index];
    if (imageUrl.startsWith("http")) {
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
        .filter((img) => !img.startsWith("http")) // Only process new images
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
          removedImages,
        };

        const result = await Parse.Cloud.run("updateAnnouncement", params);

        if (result.success) {
          setSuccessMessage("SAVE SUCCESSFULLY!")
          setIsSuccess(true)
          resetForm();
          fetchAnnouncements();
        }
      } else {
        // Create new announcement
        const params = {
          title,
          description,
          images: base64Images,
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

  useEffect(() => {
    if(location.pathname === "/home") {
      localStorage.setItem("unregisteredUser", true)
    }
  },[location])

  return (
    <div className="relative min-h-screen p-6">
      {isSuccess && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-zinc-300 rounded-lg shadow-xl w-[400px]">
          <div className="bg-zinc-400 flex justify-end items-center px-2 h-8">
            <button onClick={() => setIsSuccess(false)} className="">
              <X />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
            {successMessage}
            </h2>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="px-4 py-2 bg-white hover:bg-gray-400 border border-zinc-600 transition-colors duration-200"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
      <div className="max-w-6xl flex flex-col gap-y-2 justify-center items-center mx-auto pt-16">
        <img src="/sanfranciscologo.png" alt="" className="w-36 object-cover" />
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
                    {user?.get("role") !== "PATIENT" &&
                      user?.get("role") !== "SECRETARY" &&
                      !unregisteredUser &&
                      user?.get("role") !== "NURSE" && (
                        <button
                          onClick={() => handleEdit(announcement)}
                          className="bg-orange-500 hover:bg-orange-600 transition-colors text-white px-4 py-2 rounded-md flex items-center gap-2"
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
                    Posted:{" "}
                    {new Date(announcement.createdAt).toLocaleDateString()}
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
                {selectedAnnouncement ? "Edit" : "Create"} Announcement
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
                
                <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="announcementImages"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="text-gray-400 flex flex-col items-center">
                    <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-sm">Browse</span>
                  </div>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting
                      ? "bg-orange-400"
                      : "bg-orange-500 hover:bg-orange-600"
                  } transition-colors text-white px-6 py-2 rounded-md flex items-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>
                        {selectedAnnouncement ? "Updating..." : "Creating..."}
                      </span>
                    </>
                  ) : (
                    <span>
                      {selectedAnnouncement ? "Save Changes" : "Create"}
                    </span>
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
