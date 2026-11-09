import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Experience from './pages/Experience';
import Extracurriculars from './pages/Extracurriculars';
import Projects from './pages/Projects';

function App() {


  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<Experience />} />
            <Route path='/experience' element={<About />} />
            <Route path='/extracurriculars' element={<Extracurriculars />} />
            <Route path='/projects' element={<Projects />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
