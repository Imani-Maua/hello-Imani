import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import About from './pages/About';
import Experience from './pages/Experience';
import Extracurriculars from './pages/Extracurriculars';
import Projects from './pages/Projects';

function App() {


  return (
    <BrowserRouter>
      <Navbar />
     <Routes>
      <Route path='/' element={<About/>}/>
      <Route path='/experience' element={<Experience/>}/>
      <Route path='/extracurriculars' element={<Extracurriculars/>}/>
      <Route path='/projects' element={<Projects/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App;
