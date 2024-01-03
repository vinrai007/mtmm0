import React, { useState } from "react";

function CommentBox(props) {
  const { postId } = props;
  const [comment, setComment] = useState(""); // State to track the comment text
  const [comments, setComments] = useState([]); // State to store comments

  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (comment.trim() !== "") {
      // Create a new comment object
      const newComment = {
        id: Date.now(), // Unique ID for the comment
        text: comment,
      };

      // Update the comments state with the new comment
      setComments([...comments, newComment]);

      // Clear the comment input field
      setComment("");
    }
  };

  return (
    <div className="comment-box">
      <h3>Comments</h3>
      <textarea
        className="comment-text"   
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
          <button className="post-btn" onClick={handleAddComment}>Post</button>
          <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentBox;
