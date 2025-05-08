import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { register } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'consumer'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await register(form);
    if (res?.token) {
      localStorage.setItem('token', res.token);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate(form.role === 'creator' ? '/creator' : '/feed');
      }, 1000);
    } else {
      setError(res.error || 'Registration failed');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="consumer">Consumer</option>
            <option value="creator">Creator</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="w-100">Register</Button>
        <div className="mt-3 text-center">
          Already have an account? <a href="/" className="text-decoration-none">Login</a>
        </div>
      </Form>
    </Container>
  );
};

export default Register;
