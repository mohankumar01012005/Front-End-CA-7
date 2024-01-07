import React from 'react';
import images from '/src/assets/images.png';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Home() {
  return (
    <div className='home_page_mainDiv'>
      <nav className='mainPage_navBar'>
        <img className='mainPage_kalviumLogo' src={images} alt='Logo' />
        <p className='hame_text_phrases'>
        Embark on a literary journey where every page is a new adventure, and every story has the power to transport you to extraordinary realms. Explore the world of words with our vast collection of books  where imagination knows no bounds and every reader finds their own unique story
        </p>
      </nav>
        <Link className='homePage_register_button' to='/RegistrationForm'>Register</Link>
    </div>
  );
}

export default Home;
