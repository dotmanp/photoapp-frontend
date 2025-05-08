import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

import {
  getMedia,
  likeMedia,
  commentOnMedia,
  rateMedia
} from '../utils/api';

import LogoutButton from './LogoutButton';

const Feed = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [mediaList, setMediaList] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await getMedia(token);
      setMediaList(data);
    } catch (err) {
      console.error('Failed to fetch media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setIsCreator(decoded.role === 'creator');
    }
    loadMedia();
  }, []);

  const handleLike = async (id) => {
    const data = await likeMedia(id, token);
    alert(`${data.message} (Likes: ${data.totalLikes})`);
    loadMedia();
  };

  const handleComment = async (e, id) => {
    e.preventDefault();
    const comment = e.target.elements[`comment-${id}`].value;
    await commentOnMedia(id, comment, token);
    alert('Comment added');
    e.target.reset();
    loadMedia();
  };

  const handleRate = async (e, id) => {
    e.preventDefault();
    const rating = e.target.elements[`rate-${id}`].value;
    await rateMedia(id, rating, token);
    alert('Rating added');
    e.target.reset();
    loadMedia();
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>
          <i className="bi bi-camera-fill me-2"></i>Photo Feed
      </h2>
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={loadMedia}>Refresh Feed</Button>
          {isCreator && (
            <Button variant="primary" onClick={() => navigate('/creator')}>
              Upload New Image
            </Button>
          )}
          <LogoutButton />
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {mediaList.map((media) => (
            <Col key={media.id}>
              <Card className="h-100 shadow-sm bg-light text-light">
                <div style={{ height: '300px', overflow: 'hidden' }}>
                  <Card.Img
                    variant="top"
                    src={media.image_url || 'https://via.placeholder.com/300'}
                    alt={media.title}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{media.title}</Card.Title>
                  <Card.Text>{media.caption}</Card.Text>
                  <Card.Text className="text-secondary">📍 {media.location}</Card.Text>

                  {/* ❤️ Likes Count */}
                  {media.totalLikes && (
                    <div className="text-muted small mb-2">
                      <i className="bi bi-heart-fill text-danger me-1"></i>
                      {media.totalLikes} likes
                    </div>
                  )}

                  {/* ⭐ Average Rating */}
                  {media.averageRating && (
                    <div className="text-muted small mb-2">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      {media.averageRating.toFixed(1)} average rating
                    </div>
                  )}

                  {/* ❤️ Like Button */}
                  <div className="mb-3">
                    <Button variant="outline-danger" size="sm" onClick={() => handleLike(media.id)}>
                      <i className="bi bi-heart-fill me-1"></i> Like
                    </Button>
                  </div>

                  {/* ⭐ Rate Form */}
                  <Form onSubmit={(e) => handleRate(e, media.id)} className="mb-3">
                    <Form.Label className="mb-1 fw-semibold">
                      <i className="bi bi-star-fill text-warning me-1"></i> Rate this photo
                    </Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        name={`rate-${media.id}`}
                        type="number"
                        min="1"
                        max="5"
                        placeholder="0"
                        style={{ width: '100px' }}
                        required
                      />
                      <Button variant="success" size="sm" type="submit">Rate</Button>
                    </div>
                  </Form>

                  {/* 💬 Comment Form */}
                  <Form onSubmit={(e) => handleComment(e, media.id)}>
                    <Form.Label className="mb-1 fw-semibold">
                      <i className="bi bi-chat-dots-fill me-1"></i> Comment
                    </Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        name={`comment-${media.id}`}
                        placeholder="Write a comment..."
                        required
                      />
                      <Button type="submit" size="sm" variant="info">Send</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Feed;
