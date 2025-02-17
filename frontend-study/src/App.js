import './App.css';
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
        </Routes>
      </Router>
    </ThemeProvider>
    </>
  )
}

export default App;
