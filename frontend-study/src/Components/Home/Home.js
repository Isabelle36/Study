import React from "react";
import { Navbar } from "../Navbar/Navbar";
import Feynman from "../Cards/FeynmanModal";
import { Pomodoro } from "../Cards/Pomodoro";
import FlashCards from "../Cards/FlashCards";
import ActiveRecall from "../Cards/ActiveRecall";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full relative animate-spin-slow">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 via-green-500 to-emerald-500 blur-3xl opacity-15"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-500 via-yellow-500 to-emerald-500 blur-3xl opacity-15 animate-pulse"></div>
        </div>
      </div>
      <Navbar />
      <main className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16 relative">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Studying Made Easy
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            All your studying techniques in one place
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="h-[400px]">
            <Pomodoro />
          </div>
          <div className="h-[400px]">
            <Feynman />
          </div>
          <div className="h-[400px]">
            <ActiveRecall/>
          </div>
          <div className="h-[400px]">
            <FlashCards />
          </div>
        </div>
      </main>
    </div>
  );
};