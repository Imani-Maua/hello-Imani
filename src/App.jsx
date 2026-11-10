import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Experience from './pages/Experience';
import Extracurriculars from './pages/Extracurriculars';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';
import { DraftProvider } from './context/DraftContext';
import PreviewBar from './components/PreviewBar';
import HarvestWidget from './components/HarvestWidget';

function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}><Outlet /></div>
      <Footer />
      <PreviewBar />
      <HarvestWidget />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DraftProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Admin />} />
          <Route element={<MainLayout />}>
            <Route path='/' element={<Experience />} />
            <Route path='/experience' element={<About />} />
            <Route path='/extracurriculars' element={<Extracurriculars />} />
            <Route path='/projects' element={<Projects />} />
          </Route>
        </Routes>
        </DraftProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
