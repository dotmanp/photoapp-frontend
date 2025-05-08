import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { login } from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const data = await login(form);
    if (data.token) {
      localStorage.setItem('token', data.token);
      data.role === 'creator' ? navigate('/creator') : navigate('/feed');
    } else {
      setError(data.error || 'Login failed');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Sign In
        </Button>

        <div className="mt-3 text-center">
          Don’t have an account? <Link to="/register" className="text-decoration-none">Register here</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
