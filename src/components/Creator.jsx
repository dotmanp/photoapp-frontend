import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Step 1

const BASE_URL = 'http://localhost:3000/api';

const Creator = () => {
  const [form, setForm] = useState({
    title: '',
    caption: '',
    location: '',
    people: '',
  });
  const [file, setFile] = useState(null);

  const navigate = useNavigate(); // ✅ Step 2

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Unauthorized');
  
    try {
      // ✅ Compress the image (Instagram style)
      const options = {
        maxWidthOrHeight: 1080,
        maxSizeMB: 1,
        useWebWorker: true,
      };
  
      const compressed = await imageCompression(file, options);
  
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append('image', compressed); // ✅ Upload compressed image
  
      const res = await fetch(`${BASE_URL}/media/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await res.json();
      if (res.ok) {
        alert('Upload successful!');
        setForm({ title: '', caption: '', location: '', people: '' });
        setFile(null);
        navigate('/feed');
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading media');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-100">
      <form
        onSubmit={handleUpload}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Upload Image</h2>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="mb-3 w-full px-4 py-2 border rounded"
        />

        <textarea
          placeholder="Caption"
          value={form.caption}
          onChange={(e) => setForm({ ...form, caption: e.target.value })}
          className="mb-3 w-full px-4 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="mb-3 w-full px-4 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="People (comma separated)"
          value={form.people}
          onChange={(e) => setForm({ ...form, people: e.target.value })}
          className="mb-3 w-full px-4 py-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="mb-6 w-full"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Creator;
