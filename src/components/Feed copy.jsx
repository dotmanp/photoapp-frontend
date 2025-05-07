import React, { useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:3000/api';

const Feed = () => {
  const token = localStorage.getItem('token');
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/media`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setMediaList)
      .catch(console.error);
  }, []);

  const handleComment = async (e, mediaId) => {
    e.preventDefault();
    const comment = e.target.elements[`comment-${mediaId}`].value;
    const res = await fetch(`${BASE_URL}/media/${mediaId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    });
    const data = await res.json();
    alert(data.message || 'Comment added!');
    e.target.reset();
  };

  const handleRate = async (e, mediaId) => {
    e.preventDefault();
    const rating = e.target.elements[`rate-${mediaId}`].value;
    const res = await fetch(`${BASE_URL}/media/${mediaId}/rate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
    });
    const data = await res.json();
    alert(data.message || 'Rating submitted!');
    e.target.reset();
  };

  const handleLike = async (mediaId) => {
    const res = await fetch(`${BASE_URL}/media/${mediaId}/like`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    alert(`${data.message} (Likes: ${data.totalLikes})`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">📸 Photo Feed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaList.map((media) => (
          <div key={media.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={media.image_url}
              alt={media.title}
              className="w-full h-60 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold">{media.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{media.caption}</p>
            <p className="text-sm text-gray-500">📍 {media.location}</p>

            <button
              onClick={() => handleLike(media.id)}
              className="text-red-500 mt-2 hover:underline"
            >
              ❤️ Like
            </button>

            <form
              onSubmit={(e) => handleComment(e, media.id)}
              className="mt-3 flex gap-2"
            >
              <input
                name={`comment-${media.id}`}
                placeholder="Write a comment..."
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
              <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                Comment
              </button>
            </form>

            <form
              onSubmit={(e) => handleRate(e, media.id)}
              className="mt-2 flex gap-2 items-center"
            >
              <input
                name={`rate-${media.id}`}
                type="number"
                min="1"
                max="5"
                placeholder="Rate 1–5"
                className="w-20 px-2 py-1 border rounded text-sm"
              />
              <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                Rate
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
