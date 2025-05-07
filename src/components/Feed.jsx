import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000/api';

const Feed = () => {
  const token = localStorage.getItem('token');
  const [mediaList, setMediaList] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const navigate = useNavigate();

  const loadMedia = () => {
    fetch(`${BASE_URL}/media`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setMediaList)
      .catch(console.error);
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setIsCreator(decoded.role === 'creator');
    }
    loadMedia();
  }, []);

  const handleLike = async (id) => {
    const res = await fetch(`${BASE_URL}/media/${id}/like`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    alert(`${data.message} (Likes: ${data.totalLikes})`);
    loadMedia(); // refresh after like
  };

  const handleComment = async (e, id) => {
    e.preventDefault();
    const comment = e.target.elements[`comment-${id}`].value;
    await fetch(`${BASE_URL}/media/${id}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    });
    alert('Comment added');
    e.target.reset();
    loadMedia(); // refresh after comment
  };

  const handleRate = async (e, id) => {
    e.preventDefault();
    const rating = e.target.elements[`rate-${id}`].value;
    await fetch(`${BASE_URL}/media/${id}/rate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
    });
    alert('Rating added');
    e.target.reset();
    loadMedia(); // refresh after rating
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">📸 Photo Feed</h2>
        <div className="flex gap-2">
          <button
            onClick={loadMedia}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-6"
          >
            Refresh Feed
          </button>
          {isCreator && (
            <button
              onClick={() => navigate('/creator')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Upload New Image
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaList.map((media) => (
          <div key={media.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="relative w-full aspect-square overflow-hidden rounded">
                <img
                  src={media.image_url}
                  alt={media.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <h3 className="text-xl font-semibold">{media.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{media.caption}</p>
            <p className="text-sm text-gray-500">📍 {media.location}</p>
          <div className="  w-2/3 flex items-center justify-between mt-2">
            <button onClick={() => handleLike(media.id)} className="text-red-500 mt-2 hover:underline">
              ❤️ Like
            </button>

            <form onSubmit={(e) => handleRate(e, media.id)} className="mt-2 flex gap-2 items-center">
              <input
                name={`rate-${media.id}`}
                type="number"
                min="1"
                max="5"
                placeholder="0"
                className="w-20 px-2 py-1 border rounded text-sm"
              />
              <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded text-sm">Rate</button>
            </form>
          </div>
          <form onSubmit={(e) => handleComment(e, media.id)} className="mt-3 flex gap-2">
              <input
                name={`comment-${media.id}`}
                placeholder="Write a comment..."
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
              <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Comment</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
