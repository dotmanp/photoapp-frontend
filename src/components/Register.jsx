import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000/api';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'consumer',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registered successfully. Please log in.');
        navigate('/');
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-2/3 max-w-sm flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          className="mb-4 w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="mb-4 w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="mb-6 w-1/3 px-4 py-2 border border-gray-300 rounded"
        >
          <option value="consumer">Consumer</option>
          <option value="creator">Creator</option>
        </select>
        <button
          type="submit"
          className="w-1/3 bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
        >
          Create Account
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <a href="/" className="text-green-600 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
