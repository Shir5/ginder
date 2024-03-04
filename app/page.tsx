"use client"

import { BackgroundBeams } from "../components/ui/background-beams";
import MainBtn from "../components/ui/MainBtn"
import MainParagraph from "../components/ui/MainParagraph";
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import SigninModal from "@/components/SigninModal";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const [showSigninModal, setShowSigninModal] = useState(false);

  const openSigninModal = () => {
    setShowSigninModal(true);
  };

  const closeSigninModal = () => {
    setShowSigninModal(false);
  };

  return (
    <main className="overflow-hidden">
      <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl mr-5 bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 to-yellow-600 text-center font-sans font-bold">
            GINDER
          </h1>
          <MainParagraph />
          <div className="flex mt-10 max-w-lg">
            <MainBtn name={"LOG IN"} fontSize="2xl" padding="py-4 px-16" delay={1500} playAnimation={true} openClick={openLoginModal} />
            {showLoginModal && <LoginModal show={showLoginModal} onClose={closeLoginModal} />}
            <div className="flex-grow"></div>
            <MainBtn name={"SIGN IN"} fontSize="2xl" padding="py-4 px-16" delay={1700} playAnimation={true} openClick={openSigninModal} />
            {showSigninModal && <SigninModal show={showSigninModal} onClose={closeSigninModal} />}
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </main>
  );
}
