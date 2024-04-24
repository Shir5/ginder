import { TypewriterEffect } from "./typewriter-effect";

function MainParagraph() {
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
    <div className="text-yellow-300 max-w-lg mx-auto my-5 text-4xl text-center relative z-10 br">
      <TypewriterEffect words={words} />
    </div>
  );
}

export default MainParagraph;