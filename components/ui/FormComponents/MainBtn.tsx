import { useState, useEffect } from "react";

interface MainBtnProps {
    name: string;
    fontSize?: string;
    padding?: string;
    delay?: number;
    playAnimation?: boolean;
    openClick?: () => void;
}

function MainBtn({ name, fontSize = 'text-2xl', padding = 'py-3 px-12', delay = 1000, playAnimation = false, openClick }: MainBtnProps) {
    const [slideIn, setSlideIn] = useState(false);

    useEffect(() => {
        // Set a timeout to trigger the sliding up effect after a delay
        const timeout = setTimeout(() => {
            setSlideIn(true);
        }, delay); // Use the delay prop here

        // Clear the timeout on component unmount to prevent memory leaks
        return () => clearTimeout(timeout);
    }, [delay, playAnimation]);

    const btnFontSize = `text-${fontSize}`;
    const btnPadding = padding;

    const handleClick = () => {
        if (openClick) {
            openClick(); // Invoke the openClick function if it exists
        }
    };

    return (
        <button className={`p-[3px] relative cursor-pointer z-10 transform -translate-y-[110vh] ${playAnimation && slideIn ? 'slide-up' : ''}`} onClick={handleClick}>
            <div className={`absolute inset-0 bg-gradient-to-b from-yellow-300 to-yellow-800 rounded-sm `} />
            <div className={` font-bold ${btnFontSize} ${btnPadding} bg-yellow-500 rounded-[2px]  relative group transition duration-300 text-black hover:bg-indigo-800 hover:text-yellow-500`}>
                {name}
            </div>
        </button>
    );
}

export default MainBtn;
