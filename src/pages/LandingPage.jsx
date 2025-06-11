import React, { useContext, useState, useEffect } from "react";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const FloatingElement = ({ delay = 0, duration = 3 }) => (
    <div 
      className="absolute w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: `translate(${Math.random() * 100}px, ${Math.random() * 100}px)`
      }}
    />
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement delay={0} duration={4} />
        <FloatingElement delay={1} duration={5} />
        <FloatingElement delay={2} duration={3} />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-300/10 to-cyan-300/10 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <header className={`flex justify-between items-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Resume Builder
          </div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="bg-white/80 backdrop-blur-sm text-sm font-semibold text-gray-800 px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-gray-200/50"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Content */}
        <div className="flex flex-col items-center text-center">
          <div className={`max-w-4xl transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Build Your{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x bg-[length:200%_200%]">
                  Dream Resume
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg blur opacity-20 animate-pulse"></div>
              </span>
              <br />
              <span className={`inline-block transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                Effortlessly
              </span>
            </h1>
            
            <p className={`text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Craft a standout resume in minutes with our smart and intuitive resume builder. 
              Stand out from the crowd with professional designs and AI-powered suggestions.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button
                className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-10 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
                onClick={handleCTA}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="text-gray-600 font-medium px-6 py-4 rounded-xl hover:bg-white/60 hover:text-gray-800 transition-all duration-300 backdrop-blur-sm">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Animated Resume Preview Cards */}
          <div className={`mt-20 relative transition-all duration-1500 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="flex justify-center space-x-4 perspective-1000">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-48 h-64 bg-white rounded-lg shadow-xl transform rotate-${i === 0 ? '-12' : i === 1 ? '0' : '12'} hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-20 relative`}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    zIndex: i === 1 ? 10 : 5 - Math.abs(i - 1)
                  }}
                >
                  <div className="p-4 h-full flex flex-col">
                    <div className="h-3 bg-gradient-to-r from-purple-300 to-blue-300 rounded mb-3 animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-2 bg-gray-200 rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4 animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.1}s` }}></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2 animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.2}s` }}></div>
                      <div className="mt-4 space-y-1">
                        <div className="h-1.5 bg-gray-100 rounded animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.3}s` }}></div>
                        <div className="h-1.5 bg-gray-100 rounded w-4/5 animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.4}s` }}></div>
                        <div className="h-1.5 bg-gray-100 rounded w-3/5 animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.5}s` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className={`mt-32 transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Features That Make You Shine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Editing",
                description: "Update your resume sections with live preview and instant formatting.",
                icon: "✏️",
                delay: "0s"
              },
              {
                title: "Beautiful Templates", 
                description: "Choose from modern, professional templates that are easy to customize.",
                icon: "🎨",
                delay: "0.2s"
              },
              {
                title: "One-Click Export",
                description: "Download your resume instantly as a high-quality PDF with one click.",
                icon: "📄",
                delay: "0.4s"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 relative overflow-hidden"
                style={{ animationDelay: feature.delay }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className={`mt-32 mb-16 text-center transition-all duration-1000 delay-1300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Your Perfect Resume?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have landed their dream jobs with our resume builder.
              </p>
              <button
                onClick={handleCTA}
                className="bg-white text-purple-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
              >
                Start Building Now
              </button>
            </div>
          </div>
        </section>
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;