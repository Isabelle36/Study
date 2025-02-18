import './App.css';
import SavedFlashcards from './Components/Cards/SavedFlashcards';
import StudyMode from './Components/Cards/StudyMode';
import { ThemeProvider } from './Components/Context/ThemeContext';
import { Home } from './Components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
       <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved-flashcards" element={<SavedFlashcards />} />
          <Route path="/study-mode" element={<StudyMode />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </>
  )
}

export default App;
