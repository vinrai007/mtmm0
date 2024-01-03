import React, { useState ,useContext , useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import CommentBox from "./CommentBox"; // Import the CommentBox component
import {UserContext} from "./UserContext";

// import { Button } from 'react-bootstrap';
import ShareModal from './ShareModal';
import "bootstrap/dist/css/bootstrap.min.css";

function SocialInteractionBar({ postId }) {
  // const { postId } = postId;
  const {userInfo} = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const base_url = `https://mtmm1-2-backend.onrender.com`
  const userId = userInfo.id;
      useEffect(() => {
        // Fetch initial like status and count from the backend
        // You may need to replace this with your actual API endpoint
        fetch(`${base_url}/api/like?postId=${postId}&userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                setIsLiked(data.isLiked);
                setLikesCount(data.likesCount);
            });
    }, [postId, userId]);

  const [showModal, setShowModal] = useState(false);
  const shareLink = `/post/${postId}`;

  const linkToShare = `${base_url}${shareLink}`;

  const [postInfo, setPostInfo] = useState({
    likes: 0,
    commentsOpen: false,
    shares: 0,
  });
  const handleLikeClick = (e) => {
    e.preventDefault();
    const newLikeStatus = !isLiked;
        setIsLiked(newLikeStatus);

        // Update likes count on UI
        setLikesCount(newLikeStatus ? likesCount + 1 : likesCount - 1);

        // Send data to the backend
        const postData = {
            postId: postId,
            userId: userId,
            isLiked: newLikeStatus,
        };

        // Assume you're using fetch or another method to send data to the backend
        fetch(`${base_url}/api/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
    // const newLikes = postInfo.likes + 1;
    // setPostInfo({ ...postInfo, likes: newLikes });
  };
  const handleCommentClick = () => {
    // Toggle the visibility of the comment box
    setPostInfo({ ...postInfo, commentsOpen: !postInfo.commentsOpen });
    };
  const handleShareClick = (e) => {
    e.preventDefault();

        setShowModal(true);

    // setShares(shares + 1);
    // const shareLink = `https://example.com/post/${_id}`;
    const shareLink = `/post/${postId}`;
    alert(`Share this link: ${shareLink}`);
  };  
    const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="social-interaction-bar">
            <div className="interaction-grid">
        <button className="interaction-btn" onClick={handleLikeClick} style={{ color: isLiked ? "#D80032" : "#F1B4BB" }}>
          <FontAwesomeIcon className="interaction-icon" icon={faHeart} />
          {/* {isLiked ? 'Unlike' : 'Like'}
          <p>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</p> */}
          {/* {postInfo.likes} */}
          {likesCount}
        </button>
        <button className="interaction-btn" onClick={handleCommentClick} style={{ color: postInfo.comment > 0 ? "red" : "#8EACCD" }}>
          {/* <FontAwesomeIcon className="interaction-icon" icon={faComment} />  */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
</svg>
        </button>
        <button className="interaction-btn" onClick={handleShareClick} style={{ color: postInfo.comment > 0 ? "red" : "#9BABB8" }}>
          {/* <FontAwesomeIcon className="interaction-icon" icon={faShare} />  */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
</svg>
        </button>

               <ShareModal show={showModal} onHide={handleModalClose} linkToShare={linkToShare} />

        
              {postInfo.commentsOpen && (
          <div className="comment-box">
            Comment Below 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
</svg>
          {/* <CommentBox postId={postId} /> */}
          {/* Render your comment box component here */}
          {/* Example: <CommentBox postId={postId} /> */}
        </div>
              )}
                </div>
    </div>
  );
}

export default SocialInteractionBar;
