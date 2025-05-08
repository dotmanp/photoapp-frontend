import React, { useState } from 'react';
import { Container, Form, Button, Alert, Image } from 'react-bootstrap';
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'photoshare-grh3b6atckgxbgbc.uksouth-01.azurewebsites.net';

const Creator = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    title: '',
    caption: '',
    location: '',
    people: '',
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState({ success: '', error: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setFile(image);
    if (image) setPreview(URL.createObjectURL(image));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!token) return alert('Unauthorized');
    if (!file) return setStatus({ error: 'Please select an image.', success: '' });

    try {
      const options = {
        maxWidthOrHeight: 1080,
        maxSizeMB: 1,
        useWebWorker: true,
      };

      const compressed = await imageCompression(file, options);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.append('image', compressed);

      const res = await fetch(`${BASE_URL}/media/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ success: 'Upload successful!', error: '' });
        setForm({ title: '', caption: '', location: '', people: '' });
        setFile(null);
        setPreview('');
        setTimeout(() => navigate('/feed'), 1000);
      } else {
        setStatus({ error: data.error || 'Upload failed', success: '' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ error: 'Error uploading media', success: '' });
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Upload New Photo</h2>

      {status.error && <Alert variant="danger">{status.error}</Alert>}
      {status.success && <Alert variant="success">{status.success}</Alert>}

      <Form onSubmit={handleUpload}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Caption</Form.Label>
          <Form.Control
            name="caption"
            value={form.caption}
            onChange={handleChange}
            placeholder="Caption"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>People (comma-separated)</Form.Label>
          <Form.Control
            name="people"
            value={form.people}
            onChange={handleChange}
            placeholder="e.g. Alice,Bob"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
        </Form.Group>

        {preview && (
          <div className="mb-4 text-center">
            <Image src={preview} alt="Preview" fluid rounded />
          </div>
        )}

        <Button type="submit" className="w-100">Upload</Button>
      </Form>
    </Container>
  );
};

export default Creator;