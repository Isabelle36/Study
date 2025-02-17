import React, { useState } from 'react';

const FeynmanModal = ({ isOpen, onClose }) => {
  const [explanation, setExplanation] = useState('');
  const maxChars = 20000;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Feynman Technique</h3>
            <p className="text-sm text-white/60 mt-1">
              Characters: {explanation.length}/{maxChars}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-white/80">Explain the concept in simple terms:</p>
          <textarea
            value={explanation}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                setExplanation(e.target.value);
              }
            }}
            placeholder="Start explaining... Break down the concept as if you're teaching it to someone else. Use simple language and examples."
            className="w-full h-96 bg-white/5 border border-white/10 rounded-lg p-4 
                     text-white placeholder-white/40
                     focus:border-white/20 focus:outline-none
                     scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
            maxLength={maxChars}
          />
          <button
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-green-500 
                     rounded-lg text-white font-semibold
                     hover:opacity-90 transition-opacity duration-200"
          >
            Get Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

const Feynman = () => {
  const [isFeynmanOpen, setIsFeynmanOpen] = useState(false);

  return (
    <div className='h-full'>
      <div
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 
        hover:border-white/20 transition-all duration-300 cursor-pointer
        hover:transform hover:-translate-y-1"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl">🎓</div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">Feynman Technique</h3>
        <div className="space-y-2">
          <p className="text-sm text-white/80">
            Master concepts by explaining them in simple terms:
          </p>
          <p className="text-sm text-white/70">
            Click below to start explaining a concept in your own words.
          </p>
            <br />
            <br />
          <div className="pt-3">
            <button
              onClick={() => setIsFeynmanOpen(true)}
              className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-green-500 
        rounded-lg text-white font-semibold
        hover:opacity-90 transition-opacity duration-200
        shadow-lg shadow-yellow-500/20"
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>

      <FeynmanModal isOpen={isFeynmanOpen} onClose={() => setIsFeynmanOpen(false)} />
    </div>
  );
};

export default Feynman;
