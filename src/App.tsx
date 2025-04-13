
import './App.css'

import Navbar from './components/Home-section/Navbar'


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizPage from './pages/QuizPage';

import SentenceConstruction from './components/Home-section/Hero';

function App() {
 
// Router make
  return (
    <>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<SentenceConstruction />} />

          <Route path="/quizpage" element={<QuizPage />} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App
