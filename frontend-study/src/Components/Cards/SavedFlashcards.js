import React, { useEffect, useState } from 'react';
import { Navbar } from '../Navbar/Navbar';

const SavedFlashcards = () => {
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem('flashcards')) || [];
    setSavedCards(cards);
    console.log('Retrieved Cards:', cards);
  }, []);

  const handleDeleteCard = (indexToDelete) => {
    const newCards = savedCards.filter((_, index) => index !== indexToDelete);
    setSavedCards(newCards);
    localStorage.setItem('flashcards', JSON.stringify(newCards));
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background gradient effect */}
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
            Saved Flashcards
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Review your study materials
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {savedCards.length === 0 ? (
            <div className="text-center p-8 bg-gray-800/50 border border-white/10 rounded-xl">
              <p className="text-white/70 text-lg">No flashcards saved yet.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {savedCards.map((card, index) => (
                <div
                  key={index}
                  className="group bg-gray-800/50 border border-white/10 rounded-xl p-6 
                           hover:border-white/20 transition-all duration-500
                           hover:shadow-lg hover:shadow-yellow-500/5
                           animate-float cursor-pointer
                           relative"
                >
                  <div className="flex justify-between items-start">
                    <h5 className="text-xl text-white font-medium mb-3">{card.title}</h5>
                    <button
                      onClick={() => handleDeleteCard(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                               text-red-400 hover:text-red-300 p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-white/70">{card.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SavedFlashcards;