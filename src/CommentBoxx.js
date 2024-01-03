// import React, { useState } from "react";
import React, { useState, useEffect } from 'react';
import Comment from './Comment';

function CommentBoxx({ postId }) {
  // const { postId } = props;
  const [comment, setComment] = useState(""); // State to track the comment text
  const [comments, setComments] = useState([]); // State to store comments
  const base_url = `https://mtmm1-2-backend.onrender.com`;
  // Function to handle adding a new comment
  const handleAddComment = async () => {
  if (comment.trim() !== "") {
    const response = await fetch(`${base_url}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: comment,
        postId: postId,
      }),
      credentials: 'include',
    });

    if (response.ok) {
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setComment("");
    } else {
      console.error('Failed to add comment.');
    }
  }
};
  
    // const [comments,setConments] = useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:4000/comment').then(response => {
  //     response.json().then(comments => {
  //       setComments(comments);
  //     });
  //   });
  // }, []);
  // Function to fetch comments from the backend
  // useEffect(() => {
  /*
const fetchComments = async () => {
  const response = await fetch('http://localhost:4000/comments');
  if (response.ok) {
    const commentsData = await response.json();
    // setComments(commentsData);
    setComments([...comments, commentsData.text]);

  } else {
    console.error('Failed to fetch comments.');
  }
};

// Call fetchComments when your component mounts
useEffect(() => {
  fetchComments();
}, []);
*/

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
          <div key={comment.id} className="commentt">
                    {/* <p className="info">
          <div className="author">{author.username} . </div>
          <time>{format(new Date(createdAt), "MMMM d, yyyy")}</time>
        </p> */}
            {/* {comment.text} */}
            <Comment {...comment} />

          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentBoxx;
