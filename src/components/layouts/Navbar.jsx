import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="w-full border-b border-gray-200 bg-white py-3">
            <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
                {/* Logo / Title */}
                <Link to="/dashboard">
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                        Resume Builder
                    </h1>
                </Link>

                {/* Profile Info */}
                <ProfileInfoCard />
            </div>
        </div>
    );
};

export default Navbar;
