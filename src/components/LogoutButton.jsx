import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Button variant="outline-danger" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
