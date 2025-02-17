import React from 'react'

export const Navbar = () => {
  return (
    <div><div className="relative px-4 py-6">
    <nav className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
      <div className="px-6 py-3">
        <div className="flex justify-center items-center"> {/* Changed justify-between to justify-center */}
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400">
            StudyGroup
          </span>
        </div>
      </div>
    </nav>
  </div></div>
  )
}
