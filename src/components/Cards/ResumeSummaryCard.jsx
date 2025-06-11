import React, { useEffect, useState } from "react";
import { FileText, Calendar, Star } from "lucide-react";

const ResumeSummaryCard = ({ title, lastUpdated, onSelect }) => {
  const [bgGradient, setBgGradient] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const gradients = [
      "from-purple-400 via-pink-400 to-red-400",
      "from-blue-400 via-purple-400 to-pink-400",
      "from-green-400 via-blue-400 to-purple-400",
      "from-yellow-400 via-orange-400 to-red-400",
      "from-pink-400 via-purple-400 to-indigo-400",
      "from-teal-400 via-cyan-400 to-blue-400",
      "from-orange-400 via-red-400 to-pink-400",
      "from-indigo-400 via-purple-400 to-pink-400",
    ];

    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = ((hash << 5) - hash + title.charCodeAt(i)) & 0xffffffff;
    }
    const gradientIndex = Math.abs(hash) % gradients.length;
    setBgGradient(gradients[gradientIndex]);
  }, [title]);

  return (
    <div
      className={`h-[300px] flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 transform ${
        isHovered
          ? "scale-105 shadow-2xl border-purple-300"
          : "shadow-lg hover:shadow-xl"
      }`}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative flex-1 bg-gradient-to-br ${bgGradient} p-6 flex flex-col items-center justify-center`}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full animate-pulse"></div>
          <div
            className="absolute top-12 right-8 w-4 h-4 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-8 left-8 w-6 h-6 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-12 right-4 w-3 h-3 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div
          className={`bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 transition-transform duration-300 ${
            isHovered ? "scale-110 rotate-12" : ""
          }`}
        >
          <FileText className="w-12 h-12 text-white" />
        </div>

        <div className="flex space-x-2">
          <Star className="w-4 h-4 text-white/80 animate-pulse" />
          <Star
            className="w-4 h-4 text-white/60 animate-pulse"
            style={{ animationDelay: "0.3s" }}
          />
          <Star
            className="w-4 h-4 text-white/80 animate-pulse"
            style={{ animationDelay: "0.6s" }}
          />
        </div>
      </div>

      <div className="bg-white px-6 py-4 border-t border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h5 className="text-lg font-semibold text-gray-900 truncate mb-1">
              {title}
            </h5>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">Last Updated: {lastUpdated}</span>
            </div>
          </div>
          <div
            className={`ml-3 transition-transform duration-300 ${
              isHovered ? "translate-x-1" : ""
            }`}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;
