"use client";

import { BackgroundBeams } from "../components/ui/InitialPageComponents/background-beams";
import MainBtn from "../components/ui/FormComponents/MainBtn";
import MainParagraph from "../components/ui/InitialPageComponents/MainParagraph";
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "@/components/SignupModal";

/**
 * Renders the Home component which displays the main page of the application. With login and signup.
 *
 * @return {JSX.Element} The Home component.
 */
export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const [showSignupModal, setShowSignupModal] = useState(false);

  const openSignupModal = () => {
    setShowSignupModal(true);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  return (
    <main className="overflow-hidden">
      <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="absolute mt-10 top-1/4 left-1/2 transform -translate-x-1/2">
          <h1 className="text-lg md:text-7xl mr-10 bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 to-yellow-600 text-center font-sans font-bold">
            GINDER
          </h1>
        </div>
        <div className="max-w-2xl mx-auto p-4 mt-20 relative z-10">
          <MainParagraph />
          <div className="flex mt-10 max-w-lg">
            <MainBtn name={"LOG IN"} fontSize="2xl" padding="py-4 px-16" delay={1500} playAnimation={true} openClick={openLoginModal} />
            {showLoginModal && <LoginModal show={showLoginModal} onClose={closeLoginModal} />}
            <div className="flex-grow"></div>
            <MainBtn name={"SIGN UP"} fontSize="2xl" padding="py-4 px-16" delay={1700} playAnimation={true} openClick={openSignupModal} />
            {showSignupModal && <SignupModal show={showSignupModal} onClose={closeSignupModal} />}
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </main>
  );
}
