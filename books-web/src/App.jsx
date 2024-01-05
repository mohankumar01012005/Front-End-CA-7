import React from 'react';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/Form';
import Home from './components/Home';

function App() {
  return (
    <div>
    
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/RegistrationForm' element={<RegistrationForm />} />
          <Route path='/MainPage' element={<MainPage />} />
        </Routes>
    
    </div>
  );
}

export default App;
