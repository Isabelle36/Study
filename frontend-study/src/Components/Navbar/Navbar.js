import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className="relative px-4 py-6">
      <nav className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
        <div className="px-6 py-3">
          <div className="flex justify-center items-center space-x-20">
            <Link to="/saved-flashcards" className="text-white/80 hover:text-white transition-colors">
              Saved Cards
            </Link>
            <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400">
              StudyGroup
            </Link>
            <Link to="/study-mode" className="text-white/80 hover:text-white transition-colors">
              Your Quizes
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}