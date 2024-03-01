"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import MainBtn from "../components/ui/MainBtn"
import { TypewriterEffect } from "../components/ui/typewriter-effect";

export default function Home() {
  const words = [
    {
      text: "Find",
      className: "text-yellow-300"
    },
    {
      text: "a",
      className: "text-yellow-300"
    },
    {
      text: "wingman,",
      className: "text-yellow-300"
    },
    {
      text: "teammates",
      className: "text-yellow-300"
    },
    {
      text: "and.",
      className: "text-yellow-300"
    },
    {
      text: "friends.",
      className: "text-yellow-300"
    }
  ];
  return (
    <main className=" overflow-hidden">
      <div className=" h-screen w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl mr-5  bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 to-yellow-600  text-center font-sans font-bold">
            GINDER
          </h1>
          <div className="text-yellow-300 max-w-lg mx-auto my-5 text-4xl text-center relative z-10 br">
            <TypewriterEffect words={words} />
          </div>
          <div className="flex mt-10 max-w-lg">
            <MainBtn name={"LOG IN"} fontSize="2xl" padding="py-4 px-16" delay={1500} />
            <div className="flex-grow"></div>
            <MainBtn name={"SIGN IN"} fontSize="2xl" padding="py-4 px-16" delay={1700} />
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </main >
  );
}
