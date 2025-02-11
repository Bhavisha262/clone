import React, { useEffect, useState } from 'react';
import './Post.scss';
import { FaGlobeAmericas, FaUsers, FaThumbsUp, FaComment, FaShare, FaEllipsisH } from 'react-icons/fa';

const reactions = [
  { name: 'Like', emoji: '👍' },
  { name: 'Love', emoji: '❤️' },
  { name: 'Celebrate', emoji: '🎉' },
  { name: 'Insightful', emoji: '💡' },
  { name: 'Funny', emoji: '😂' }
];

const Post = () => {
  const [posts, setPosts] = useState([]); 

  useEffect(() => {
    fetch('https://backl-main.vercel.app/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const [hoveredPost, setHoveredPost] = useState(null);
  const [selectedReactions, setSelectedReactions] = useState({});
  const [commentBox, setCommentBox] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");

  const handleReaction = (postId, reaction) => {
    setSelectedReactions(prev => ({
      ...prev,
      [postId]: reaction
    }));
    setHoveredPost(null); // Close reaction list after selection
  };

  const handleCommentClick = (postId) => {
    setCommentBox(commentBox === postId ? null : postId); // Toggle comment box
  };

  const handlePostComment = (postId) => {
    if (newComment.trim() === "") return;

    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { text: newComment, user: "You" }]
    }));

    setNewComment(""); // Clear input
    setCommentBox(null); // Close box after posting
  };

  return (
    <div className="feed">
      {posts.map((postData) => (
        <div key={postData.id} className="post-card">
          {/* Header Section */}
          <div className="post-header">
            <img src={postData.user.profilePic} alt="Profile" className="profile-pic" />
            <div className="user-info">
              <div className="user-name">{postData.user.name}</div>
              <div className="user-headline">{postData.user.headline}</div>
              <div className="post-time">
                {postData.time} · {postData.visibility === "Public" ? <FaGlobeAmericas /> : <FaUsers />}
              </div>
            </div>
            <div className="three-dots">
              <FaEllipsisH />
              <div className="menu">
                <ul>
                  <li>Save</li>
                  <li>Hide</li>
                  <li>Report</li>
                  <li>Copy link</li>
                  <li>Unfollow</li>
                  <li>Turn off notifications</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="post-content">
            <p>{postData.text}</p>
            {postData.media.length > 0 &&
              postData.media.map((mediaUrl, index) => (
                <img key={index} src={mediaUrl} alt="Post media" className="post-media" height={300} />
              ))
            }
          </div>

          {/* Engagement Section */}
          <div className="post-stats">
            <span>{selectedReactions[postData.id] ? selectedReactions[postData.id].emoji : <FaThumbsUp />} {postData.likes}</span>
            <span className="comment-count" onClick={() => handleCommentClick(postData.id)}>
          {comments[postData.id] ? 20 + comments[postData.id].length : 20} comments
        </span>
            <span>{postData.shares} shares</span>
          </div>

          {/* Action Buttons */}
          <div className="post-actions">
            {/* LIKE BUTTON WITH REACTIONS */}
            <div 
              className="like-container"
              onMouseEnter={() => setHoveredPost(postData.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <button className="like-button">
                {selectedReactions[postData.id] ? selectedReactions[postData.id].emoji : <FaThumbsUp />} {selectedReactions[postData.id] ? selectedReactions[postData.id].name : "Like"}
              </button>

              {/* REACTIONS POPUP */}
              {hoveredPost === postData.id && (
                <div className="reactions-popup">
                  {reactions.map((reaction) => (
                    <span
                      key={reaction.name}
                      className="reaction-item"
                      onClick={() => handleReaction(postData.id, reaction)}
                    >
                      {reaction.emoji}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* COMMENT BUTTON */}
            <button className="comment-button" onClick={() => handleCommentClick(postData.id)}>
              <FaComment /> Comment
            </button>

            <button className="share-button"><FaShare /> Share</button>
          </div>

          {/* COMMENT SECTION */}
          {commentBox === postData.id && (
            <div className="comment-box">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={() => handlePostComment(postData.id)}>Post</button>
            </div>
          )}

          {/* DISPLAY COMMENTS */}
          {comments[postData.id] && (
            <div className="comments-list">
              {comments[postData.id].map((comment, index) => (
                <div key={index} className="comment">
                  <strong>{comment.user}</strong>: {comment.text}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Post;
