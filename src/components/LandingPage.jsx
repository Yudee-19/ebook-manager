import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-black text-[#A9B092] flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#C26320]">
                Welcome to eBook Manager
            </h1>
            <p className="text-lg md:text-2xl mb-8">
                Manage and read your favorite eBooks effortlessly.
            </p>
            <Link to="/signup">
                <button className="bg-[#2D4740] hover:bg-[#C26320] text-white py-3 px-6 rounded-lg text-lg transition">
                    Get Started
                </button>
            </Link>
        </div>
    );
};

export default LandingPage;
