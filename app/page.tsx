"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import MainBtn from "../components/ui/MainBtn"

export default function Home() {
  return (
    <main>
      <div className=" h-screen w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 to-yellow-600  text-center font-sans font-bold">
            GINDER
          </h1>
          <p className="text-yellow-300 max-w-lg mx-auto my-2 text-4xl text-center relative z-10 br">
            Find a wingman, teammates and friends.
          </p>
          <div className="flex mt-10">
            <MainBtn name={"LOG IN"} fontSize="2xl" padding="py-4 px-16" />
            <div className="flex-grow"></div>
            <MainBtn name={"SIGN IN"} fontSize="2xl" padding="py-4 px-16" />
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </main >
  );
}
