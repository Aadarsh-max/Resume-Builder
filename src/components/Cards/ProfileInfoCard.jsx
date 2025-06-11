import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/');
    };

    const getInitials = (name = "") => {
        return name
            .split(" ")
            .filter(Boolean)
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        user && (
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                    {getInitials(user.name)}
                </div>
                <div>
                    <div className="text-[15px] font-bold leading-3">{user.name || ""}</div>
                    <button
                        className="text-purple-500 text-sm font-semibold cursor-pointer hover:underline"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    );
};

export default ProfileInfoCard;
