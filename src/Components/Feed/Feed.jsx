import React, { useState, useRef } from 'react';
import './Feed.scss';

const Feed = () => {
  // Modal visibility states
  const [showEventModal, setShowEventModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ show: false, message: '' });

  // Posts feed state
  const [posts, setPosts] = useState([]);

  // Post creation states
  const [postText, setPostText] = useState('');
  const [mediaFile, setMediaFile] = useState(null);

  // Ref for hidden file input
  const fileInputRef = useRef(null);

  // Utility to show a snackbar message for 3 seconds
  const showSnackbar = (message) => {
    setSnackbar({ show: true, message });
    setTimeout(() => {
      setSnackbar({ show: false, message: '' });
    }, 3000);
  };

  // --- Handlers for Media Post ---
  const handleMediaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      console.log('Selected file:', files[0]);
      setMediaFile(files[0]);
    }
  };

  // --- Handlers for Main Post (Text and/or Media) ---
  const handlePost = () => {
    if (!postText.trim() && !mediaFile) {
      showSnackbar('Please add content to your post.');
      return;
    }
    const newPost = {
      id: Date.now(),
      type: mediaFile ? 'media' : 'text',
      text: postText,
      media: mediaFile ? URL.createObjectURL(mediaFile) : null,
      timestamp: new Date()
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setPostText('');
    setMediaFile(null);
    showSnackbar('Post submitted successfully!');
  };

  // --- Handler for Event Post Submission ---
  const handleEventSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const eventTitle = formData.get('eventTitle');
    const eventDate = formData.get('eventDate');
    const eventTime = formData.get('eventTime');
    const eventDesc = formData.get('eventDesc');
    const newPost = {
      id: Date.now(),
      type: 'event',
      title: eventTitle,
      date: eventDate,
      time: eventTime,
      description: eventDesc,
      timestamp: new Date()
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setShowEventModal(false);
    showSnackbar('Event created successfully!');
  };

  // --- Handler for Article Post Submission ---
  const handleArticleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const articleTitle = formData.get('articleTitle');
    const articleContent = formData.get('articleContent');
    const newPost = {
      id: Date.now(),
      type: 'article',
      title: articleTitle,
      content: articleContent,
      timestamp: new Date()
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setShowArticleModal(false);
    showSnackbar('Article published successfully!');
  };

  return (
    <div className="feed">
      {/* Left Column: Profile Card */}
      <div className="feed__left">
        <div className="profile-card">
          <div className="profile-card__header">
            <img
              src="https://xsgames.co/randomusers/assets/avatars/female/21.jpg"
              alt="Profile"
              className="profile-card__img"
            />
            <h2>Sienna Johnson</h2>
          </div>
          <div className="profile-card__stats">
            <div className="stat">
              <span className="stat__title">Who's viewed your profile</span>
              <span className="stat__value">123</span>
            </div>
            <div className="stat">
              <span className="stat__title">Impressions of your post</span>
              <span className="stat__value">456</span>
            </div>
            <div className="stat">
              <span className="stat__title">Saved items</span>
              <span className="stat__value">7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Post Creation and Posts Feed */}
      <div className="feed__right">
        <div className="post-card">
          <div className="post-card__top">
            <img
              src="https://xsgames.co/randomusers/assets/avatars/female/21.jpg"
              alt="Avatar"
              className="post-card__avatar"
            />
            <input
              type="text"
              placeholder="Start a post"
              className="post-card__input"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>

          {/* Preview for selected media file */}
          {mediaFile && (
            <div className="media-preview">
              <p>Selected file: {mediaFile.name}</p>
            </div>
          )}

          <div className="post-card__options">
            <button className="option-btn" onClick={handleMediaClick}>
              <span className="icon" role="img" aria-label="media">
                📷
              </span>
              Media
            </button>
            <button className="option-btn" onClick={() => setShowEventModal(true)}>
              <span className="icon" role="img" aria-label="event">
                📅
              </span>
              Event
            </button>
            <button className="option-btn" onClick={() => setShowArticleModal(true)}>
              <span className="icon" role="img" aria-label="article">
                ✏️
              </span>
              Write Article
            </button>
          </div>
          <button className="post-card__post-btn" onClick={handlePost}>
            Post
          </button>
        </div>

        {/* Hidden File Input for Media */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Posts Feed */}
        <div className="posts">
          {posts.map((post) => (
            <div className={`post post--${post.type}`} key={post.id}>
              {post.type === 'text' && <p>{post.text}</p>}
              {post.type === 'media' && (
                <>
                  {post.text && <p>{post.text}</p>}
                  {post.media && <img src={post.media} alt="Uploaded media" />}
                </>
              )}
              {post.type === 'event' && (
                <div className="event-post">
                  <h4>{post.title}</h4>
                  <p>Date: {post.date}</p>
                  <p>Time: {post.time}</p>
                  <p>{post.description}</p>
                </div>
              )}
              {post.type === 'article' && (
                <div className="article-post">
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                </div>
              )}
              <span className="timestamp">
                {post.timestamp.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="modal">
          <div className="modal__content">
            <h3>Create Event</h3>
            <form onSubmit={handleEventSubmit}>
              <label>
                Event Title:
                <input type="text" name="eventTitle" required />
              </label>
              <label>
                Date:
                <input type="date" name="eventDate" required />
              </label>
              <label>
                Time:
                <input type="time" name="eventTime" required />
              </label>
              <label>
                Description:
                <textarea name="eventDesc" required></textarea>
              </label>
              <div className="modal__actions">
                <button type="button" onClick={() => setShowEventModal(false)}>
                  Cancel
                </button>
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {showArticleModal && (
        <div className="modal">
          <div className="modal__content">
            <h3>Write Article</h3>
            <form onSubmit={handleArticleSubmit}>
              <label>
                Title:
                <input type="text" name="articleTitle" required />
              </label>
              <label>
                Content:
                <textarea name="articleContent" required rows="10"></textarea>
              </label>
              <div className="modal__actions">
                <button type="button" onClick={() => setShowArticleModal(false)}>
                  Cancel
                </button>
                <button type="submit">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Snackbar Notification */}
      {snackbar.show && <div className="snackbar">{snackbar.message}</div>}
    </div>
  );
};

export default Feed;
