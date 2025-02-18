import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ActiveRecall = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  // Load questions from localStorage on component mount
  useEffect(() => {
    const savedQuestions = localStorage.getItem('quizQuestions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const addQuestion = () => {
    if (newQuestion && newAnswer) {
      const updatedQuestions = [...questions, { question: newQuestion, answer: newAnswer }];
      setQuestions(updatedQuestions);
      // Save to localStorage
      localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions));
      setNewQuestion("");
      setNewAnswer("");
      // Show alert
      setShowAlert(true);
      // Hide alert after 2 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  return (
    <div className="h-full">
      {/* Card to open the modal */}
      <div
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 
                   hover:border-white/20 transition-all duration-300 cursor-pointer
                   hover:transform hover:-translate-y-1"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl">🧠</div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">Active Recall</h3>
        <p className="text-sm text-white/80 mb-4">Test your knowledge by answering questions before revealing answers.<br/><br/></p>
        <div className="space-y-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-green-500 
                     rounded-lg text-white font-semibold hover:opacity-90 
                     transition-opacity duration-200 shadow-lg shadow-yellow-500/20"
          >
            Create Quiz
          </button>
          <button
            onClick={() => navigate('/quiz-mode')}
            className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 
                     rounded-lg text-white font-semibold hover:opacity-90 
                     transition-opacity duration-200"
          >
            Practice Quizzes
          </button>
        </div>
      </div>

      {/* Modal for Active Recall */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-3xl w-full mx-4 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Create Quiz Questions</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white">✕</button>
            </div>

            {/* Alert Message */}
            {showAlert && (
              <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center animate-fade-in">
                Question added successfully! ✨
              </div>
            )}

            {/* Input for adding questions */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter question"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter answer"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button
                onClick={addQuestion}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-green-500 
                         rounded-lg text-white font-semibold hover:opacity-90"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveRecall;