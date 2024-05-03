"use client";
import React from 'react';
export default function CardBackground({children}: {children: React.ReactNode}) {
    return (
        <div className="bg-indigo-950 rounded-lg shadow-md p-6 m-4 w-3/12 h-3/6 ">
            {children}
        </div>
    );
}

