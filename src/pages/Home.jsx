import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import Parse from "parse/dist/parse.min.js";
import { IoMdClose } from "react-icons/io";

const Home = () => {
  const { loading, logout } = useLogout();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcementImages, setAnnouncementImages] = useState([]);
  const [announcement, setAnnouncement] = useState("")
  const user = Parse.User.current();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });

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
    const updatedImages = announcementImages.filter((_, i) => i !== index);
    setAnnouncementImages(updatedImages);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      announcementImages,

    }
  }


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

  return (
    <div className="relative lg:min-h-[70vh] flex flex-col justify-center items-center py-20">
      <button
        onClick={handleLogout}
        className="w-[max-content] absolute top-0 left-0 m-5 bg-zinc-700 rounded-md px-4 py-2 text-white"
      >
        {loading ? "loading..." : "logout"}
      </button>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black/30 backdrop-blur-md">
          <IoMdClose onClick={() => setIsModalOpen(!isModalOpen)} className="absolute top-3 right-3 text-white" fontSize={30} />
          <form className="flex flex-col gap-y-2">
            <textarea rows={6} cols={70} placeholder="Enter your announcement" className="bg-slate-100 p-3 rounded-md"></textarea>
            <div className="flex flex-wrap gap-x-2 gap-y-2">
              {announcementImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`announcement-${index}`} className="w-[200px] rounded-md" />
                  <IoMdClose
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 text-red-500 cursor-pointer"
                    fontSize={20}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-x-2 mt-3">
              <label htmlFor="announcementImages" className="bg-blue-500 text-white px-3 py-2 rounded-md w-[max-content] cursor-pointer">
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
            </div>
          </form>
        </div>
      )}
      <div className="flex flex-col justify-center items-center gap-y-10">
        <h1 className="text-4xl">WELCOME {user?.get('role')}!</h1>
        <div className="mx-auto max-w-5xl w-full flex flex-col">
          <div className="bg-zinc-200 rounded-md p-5">
            <h2 className="text-2xl text-center mb-3 text-red-500 font-semibold">
              ANNOUNCEMENT!!
            </h2>
            <p className="font-Outfit">
              TOOTH EXTRACTION -OCTOBER 10, 2024 FREE CIRCUMCISION OCT 11, 2024
              GENERAL CHECK UP -OCTOBER 12, 2024 CONSULTATION AND FAMILY
              PLANNING 8:00 AM TO 12:00 PM
            </p>
          </div>
          <div className="flex flex-row gap-x-2 p-5">
            {announcementImages.map((image, index) => (
              <img key={index} src={image} alt={`announcement-${index}`} className="w-[200px]" />
            ))}
          </div>
          <div className="flex flex-row gap-x-2">
            <button onClick={() => setIsModalOpen(!isModalOpen)} className="bg-yellow-500 rounded-md px-5 py-2 mx-auto">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
