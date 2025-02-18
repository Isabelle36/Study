import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FlashCardModal = ({ isOpen, onClose }) => {
  const [note, setNote] = useState('');
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem('flashcards');
    return savedCards ? JSON.parse(savedCards) : [];
  });

  if (!isOpen) return null;

  const handleCreateCards = () => {
    if (note.trim()) {
      // Split by periods and filter out empty strings
      const sentences = note
        .split('.')
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0);

      const newCards = sentences.map((sentence, index) => ({
        title: `Card ${index + 1}`,
        content: sentence + '.',  // Add the period back to the end of each sentence
      }));

      const updatedCards = [...cards, ...newCards];
      setCards(updatedCards);

      // Save to localStorage
      localStorage.setItem('flashcards', JSON.stringify(updatedCards));

      // Clear input
      setNote('');

      console.log('Cards created:', newCards);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Create Flashcards</h3>
            <p className="text-sm text-white/60 mt-1">
              Each sentence will become a separate card
            </p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-white/80 block mb-2">Enter your notes:</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter your notes. Each sentence (ending with a period) will become a separate flashcard..."
              className="w-full h-40 bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/40 focus:border-white/20 focus:outline-none"
            />
          </div>
          <button
            onClick={handleCreateCards}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-green-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity duration-200"
          >
            Create Flashcards
          </button>
        </div>
      </div>
    </div>
  );
};

// Rest of the code remains the same...

const FlashCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-full">
      <div
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer hover:transform hover:-translate-y-1"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl">📝</div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">Flashcards</h3>
        <p className="text-sm text-white/80">Create and review your study notes: <br/><br/></p>
        <div className="pt-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-green-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-yellow-500/20"
          >
            Create Cards
          </button>
        </div>
        <div className="pt-3">
          <button
            onClick={() => navigate('/saved-flashcards')}
            className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity duration-200"
          >
            View Saved Flashcards
          </button>
        </div>
      </div>

      <FlashCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FlashCards;