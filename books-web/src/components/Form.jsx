import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6
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
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Set form submission status to true
      setIsFormSubmitted(true);
    } else {
      // Set form submission status to false
      setIsFormSubmitted(false);

      // Check for specific errors and show corresponding messages
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
      if (errors.lastName) {
        toast.error('Error: Enter your last name', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      if (errors.email) {
        toast.error('Error: Enter a valid email', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      if (errors.password) {
        if (errors.password.type === 'passwordMismatch') {
          toast.error('Error: Passwords do not match', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error('Error: Enter a valid password', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    }

    console.log('data:', data);
  };

  const handleExploreBooks = () => {
    // Redirect to the main page when Explore Books button is clicked
    navigate('/MainPage');
  };

  return (
    <div className='form-container'>
      <ToastContainer />

      <fieldset>
        <legend>Fill this form</legend>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          {isSubmitSuccessful && (
            <div className='success'>
              <p>Registration Successful</p>
              {/* Show Explore Books button when the form is submitted successfully */}
              <button onClick={handleExploreBooks}>Explore Books</button>
            </div>
          )}

          <label style={{ color: 'black' }}>First Name:</label>
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
          />
          {errors.firstName && <p className='err'>{errors.firstName.message}</p>}

          <label style={{ color: 'black' }}>Last Name:</label>
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
          />
          {errors.lastName && <p className='err'>{errors.lastName.message}</p>}

          <label style={{ color: 'black' }}>Email:</label>
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
          />
          {errors.email && <p className='err'>{errors.email.message}</p>}

          <label style={{ color: 'black' }}>Password:</label>
          <input
            type='password'
            name='password'
            {...register('password', {
              required: 'Enter password',
              maxLength: {
                value: 4,
                message: 'Maximum four characters are required',
              },
            })}
          />
          {errors.password && <p className='err'>{errors.password.message}</p>}

          <label style={{ color: 'black' }}>Confirm Password:</label>
          <input
            type='password'
            name='confirmPassword'
            {...register('confirmPassword', {
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p className='err'>{errors.confirmPassword.message}</p>
          )}

          <input type='submit' value={'Register'} />

          <button
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
