import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../assets/background1.webp';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://projet-english-1zmq.vercel.app/api/auth/register', {
        email,
        password,
      });
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      // Redirect to quiz page after successful registration
      navigate('/quiz');
    } catch (err) {
      // Set error message based on server response
      const errorMessage = err.response?.data?.message || 'Failed to register. Please try again.';
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
