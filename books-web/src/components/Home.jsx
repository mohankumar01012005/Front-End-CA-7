import React from 'react';
import images from '/src/assets/images.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <nav className='mainPage_navBar'>
        <img className='mainPage_kalviumLogo' src={images} alt='Logo' />
        <Link to='/RegistrationForm'>Register</Link>
      </nav>
    </div>
  );
}

export default Home;
