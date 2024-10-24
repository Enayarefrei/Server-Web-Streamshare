"use client";



// import { useUser } from "@/context/UserContext";
import Navbar from "@/components/navbar";
import Billboard from "@/components/billboard";
import MovieList from "@/components/movie-list";

import { useUser } from "@/context/UserContext";


export default function Home() {
  
  
  
  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-b from-black to-purple-500">
      <Navbar/>
      <Billboard />
      <div className="pb-40 mt-16">
          <MovieList />
      </div>
    </div>
  );
}
