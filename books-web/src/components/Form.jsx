import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Form.css';

export default function RegistrationForm() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const formSubmitHandler = (data) => {
    if (Object.keys(errors).length === 0) {
      toast.success('Registration Successful', {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      localStorage.setItem('userData', JSON.stringify(data));

      setIsFormSubmitted(true);
    } else {
      setIsFormSubmitted(false);

      if (errors.firstName) {
        toast.error('Error: Enter your first name', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }

    console.log('data:', data);
  };

  const handleExploreBooks = () => {
    navigate('/MainPage');
  };

  return (
    <div className={`form-container ${isFormSubmitted ? 'submitted' : ''}`}>
      <ToastContainer />

      <fieldset>
        <legend>Register to Explore the Books</legend>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          {isSubmitSuccessful && (
            <div className={`success ${isFormSubmitted ? 'submitted' : ''}`}>
              <p className='suuccess_msg'>Registration Successful. Now click on the explore Books Button 👉</p>
              <button className='exploreBooks_btn' onClick={handleExploreBooks}>
                Explore Books
              </button>
            </div>
          )}

          <label style={{ color: 'white' }}>First Name:</label>
          <input
            type='text'
            name='firstName'
            {...register('firstName', {
              required: 'Please provide the name',
              minLength: {
                value: 4,
                message: 'Minimum four characters required',
              },
            })}
            className={!isFormSubmitted ? '' : 'input-success'}
          />
          {errors.firstName && <p className='err'>{errors.firstName.message}</p>}

          <label style={{ color: 'white' }}>Last Name:</label>
          <input
            type='text'
            name='lastName'
            {...register('lastName', {
              required: 'Fill last name',
              minLength: {
                value: 4,
                message: 'Minimum 4 characters are required.',
              },
            })}
            className={!isFormSubmitted ? '' : 'input-success'}
          />
          {errors.lastName && <p className='err'>{errors.lastName.message}</p>}

          <label style={{ color: 'white' }}>Email:</label>
          <input
            type='email'
            name='email'
            {...register('email', {
              required: 'Enter email',
              minLength: {
                value: 5,
                message: 'Type valid email',
              },
            })}
            className={!isFormSubmitted ? '' : 'input-success'}
          />
          {errors.email && <p className='err'>{errors.email.message}</p>}

          <label style={{ color: 'white' }}>Password:</label>
          <input
            type='password'
            name='password'
            {...register('password', {
              required: 'Enter password',
              minLength: {
                value: 8,
                message: 'Minimum eight characters, including at least one special character, are required',
              },
              pattern: {
                value: /^(?=.*[!@#$%^&*])/, // at least one special character
                message: 'Password must contain at least one special character',
              },
            })}
            className={!isFormSubmitted ? '' : 'input-success'}
          />
          {errors.password && <p className='err'>{errors.password.message}</p>}

          <label style={{ color: 'white' }}>Confirm Password:</label>
          <input
            type='password'
            name='confirmPassword'
            {...register('confirmPassword', {
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            })}
            className={!isFormSubmitted ? '' : 'input-success'}
          />
          {errors.confirmPassword && (
            <p className='err'>{errors.confirmPassword.message}</p>
          )}

          <input className='registerButton' type='submit' value={'Register'} />

          <button
            className='reset_button'
            onClick={() => {
              reset();
            }}
          >
            Reset
          </button>
        </form>
      </fieldset>
    </div>
  );
}
