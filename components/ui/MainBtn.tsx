import React from "react";

interface MainBtnProps {
    name: string;
    fontSize?: string;
    padding?: string;
}

function MainBtn({ name, fontSize = 'text-2xl', padding = 'py-3 px-12' }: MainBtnProps) {
    const btnFontSize = `text-${fontSize}`;
    const btnPadding = padding;

    return (
        <button className={`p-[3px] relative cursor-pointer z-10 `}>
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-300 to-yellow-800 rounded-lg " />
            <div className={` font-bold ${btnFontSize} ${btnPadding} bg-yellow-600 rounded-[6px]  relative group transition duration-300 text-black hover:bg-indigo-800 hover:text-yellow-500`}>
                {name}
            </div>
        </button>
    );
}

export default MainBtn;
