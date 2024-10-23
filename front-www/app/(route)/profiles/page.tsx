"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AdditionalUser from "@/components/profiles/additional-user";
import axios from "@/utils/axiosConfig";
import { toast } from "react-hot-toast";

interface Profile {
  id: string;
  name: string;
  thumbnail: string; // URL for the thumbnail image
  profileType: string;
}

const Profiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch profiles from the API
  const fetchProfiles = async () => {
    try {
      const response = await axios.get("/api/v1/groups/users");
      setProfiles(response.data.response || []); // Ensure fallback to an empty array
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load profiles");
      console.error("Error fetching profiles:", error);
      setProfiles([]); // Set to empty array on error
      setLoading(false);
    }
  };

  // Load profiles when the component is mounted
  useEffect(() => {
    fetchProfiles();
  }, []);

  if (loading) {
    return <p className="text-white text-center">Loading profiles...</p>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-800 to-purple-500 z-0"></div>

      {/* Main Content */}
      <div className="relative flex items-center justify-center z-10 flex-col">
        {/* Logo section */}
        <Image
          src="/logo-streamshare-form.png"
          alt="logo"
          width={500}
          height={500}
          className="mb-8"
        />

        {/* Welcome message */}
        <h2 className="text-3xl md:text-6xl text-white text-center mb-6">
          CHOISISSEZ VOTRE PROFIL
        </h2>

        {/* Profile section with flex-wrap for responsiveness */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
          {profiles.map((profile) => (
            <div key={profile.id} className="w-44 mx-auto">
              {/* Profile image */}
              <div
                onClick={() => router.push("/")} // Navigate to the home page or dashboard
                className="
                  w-44 
                  h-44 
                  rounded-full
                  flex items-center 
                  justify-center 
                  border-2 
                  border-transparent 
                  hover:cursor-pointer
                  hover:border-violet-700
                  overflow-hidden
                  transition duration-300 ease-in-out
                "
              >
                <Image
                  src={profile.thumbnail !== "null" ? profile.thumbnail : "/goku-pp.jpg"} // Use a default image if thumbnail is not available
                  alt={profile.name || "profile picture"}
                  width={180}
                  height={180}
                />
              </div>

              {/* Updated Username section */}
              <div className="flex flex-row items-center justify-center bg-gradient-to-r from-purple-300 to-purple-500 mt-4 p-2 rounded-md shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="text-xl md:text-2xl text-white text-center font-semibold">
                  {profile.name}
                </div>
              </div>
            </div>
          ))}

          {/* Additional user component */}
          {profiles.length < 5 && <AdditionalUser />}
        </div>
      </div>
    </div>
  );
};

export default Profiles;
