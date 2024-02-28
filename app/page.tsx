"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";

export default function Home() {
  return (
    <main>
      <div className=" h-screen w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 to-yellow-600  text-center font-sans font-bold">
            GINDER
          </h1>
          <p></p>
          <p className="text-yellow-300 max-w-lg mx-auto my-2 text-4xl text-center relative z-10 br">
            Find a wingman, teammates and friends.
          </p>     
        </div>
        <BackgroundBeams />
      </div>
    </main >
  );
}
