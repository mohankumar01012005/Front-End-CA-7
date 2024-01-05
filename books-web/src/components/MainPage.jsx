import React, { useEffect, useState } from 'react';
import images from '/src/assets/images.png';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      fetch('https://reactnd-books-api.udacity.com/books', {
        headers: {
          Authorization: 'authentication',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setBooks(data.books);
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
  }, []);

  const calculateAverageRating = (ratingsCount, averageRating) => {
    if (ratingsCount > 0) {
      return (averageRating / ratingsCount).toFixed(2);
    }
    return 'N/A';
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query)
    );
    setIsNotFound(filtered.length === 0);
  };

  const handleLogout = () => {
    navigate('/RegistrationForm');
  };

  const handleHome = () => {
    navigate('/');
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <nav className='mainPage_navBar'>
        <img className='mainPage_kalviumLogo' src={images} alt='Logo' />
        <input
          className='mainpage_searchBar'
          type='text'
          placeholder='Search For Books'
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className='homePage_register_button' onClick={handleLogout}>
          Logout
        </button>
        <button className='homePage_home_button' onClick={handleHome}>
          Home
        </button>
      </nav>

      <div>
        <h2>Book List</h2>
        {isNotFound ? (
          <p style={{ textAlign: 'center', color: 'red' }}>
            Book Not Found. Please Enter a Valid Name.
          </p>
        ) : (
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {filteredBooks.map((book) => (
              <li key={book.id} className='li'>
                <img src={book.imageLinks.thumbnail} alt={book.title} />
                <div>
                  <h4>{book.title}</h4>
                  <p>Author: {book.authors.join(', ')}</p>
                  <p>
                    Average Rating:{' '}
                    {calculateAverageRating(book.ratingsCount, book.averageRating)}
                  </p>
                  <p>Price: Free</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MainPage;
