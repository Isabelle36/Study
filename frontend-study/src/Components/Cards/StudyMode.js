import React, { useState, useEffect } from 'react';
import { Navbar } from '../Navbar/Navbar';

const StudyMode = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
    setQuestions(savedQuestions);
  }, []);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setCompleted(false);
  };

  const handleDelete = () => {
    const updatedQuestions = questions.filter((_, index) => index !== currentIndex);
    setQuestions(updatedQuestions);
    localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions));
    
    if (updatedQuestions.length === 0) {
      setCompleted(false);
      return;
    }

    if (currentIndex >= updatedQuestions.length) {
      setCurrentIndex(updatedQuestions.length - 1);
    }
    setShowDeleteConfirm(false);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center p-8 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-white/70 text-lg">No quiz questions available. Create some questions first!</p>
          </div>
        </div>
      </div>
    );
  }

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
      
      <main className="relative max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Quiz Mode</h2>
          <p className="text-xl text-white/70">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>

        {completed ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">Quiz Completed! 🎉</h3>
            <p className="text-white/70 mb-6">You've answered all the questions!</p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-green-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity duration-200"
            >
              Start Over
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 min-h-[300px] backdrop-blur-sm
                          flex flex-col justify-between animate-float relative">
              {/* Delete Button */}
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-300 
                         transition-colors duration-200 p-2 rounded-lg 
                         hover:bg-red-400/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Question:</h3>
                <p className="text-lg text-white/90 mb-6">
                  {questions[currentIndex].question}
                </p>
                {showAnswer && (
                  <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-green-400">
                      Answer: {questions[currentIndex].answer}
                    </p>
                  </div>
                )}
              </div>
              <div className="pt-8">
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity duration-200"
                >
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200
                          ${currentIndex === 0 
                            ? 'bg-gray-600 opacity-50 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'}`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-green-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Delete Question?</h3>
              <p className="text-white/70 mb-6">Are you sure you want to delete this question? This action cannot be undone.</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 rounded-lg text-white font-semibold hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-500 rounded-lg text-white font-semibold hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudyMode;