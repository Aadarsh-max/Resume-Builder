import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="h-16 bg-white border-b border-gray-200/50 backdrop-blur-[2px] sticky top-0 z-30">
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between gap-5">
                <Link to="/dashboard">
                    <h2 className="text-lg md:text-xl font-medium text-black leading-5">
                        Resume Builder
                    </h2>
                </Link>

                <ProfileInfoCard />
            </div>
        </div>
    );
};

export default Navbar;
