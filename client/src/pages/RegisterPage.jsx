import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../assets/background1.webp';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Make sure to use the correct API URL (Vercel's URL in this case)
  //     const response = await axios.post('https://projet-english-1zmq.vercel.app/api/auth/register', {
  //       email,
  //       password,
  //     });

  //     // Check if the response contains a token
  //     if (response.data.token) {
  //       localStorage.setItem('token', response.data.token); // Store token in localStorage
  //       navigate('/quiz'); // Redirect to the quiz page after successful registration
  //     } else {
  //       throw new Error('No token received.');
  //     }
  //   } catch (err) {
  //     // Handle different error cases
  //     const errorMessage = err.response?.data?.message || err.message || 'Failed to register. Please try again.';
  //     setError(errorMessage);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://projet-english-1zmq.vercel.app/api/auth/register', {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/quiz');
      } else {
        throw new Error('No token received.');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to register. Please try again.';
      setError(errorMessage);
    }
  };
  
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
