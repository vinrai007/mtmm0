import {format} from "date-fns";
import {Link} from "react-router-dom";
// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import CommentBox from "./CommentBox";
import SocialInteractionBar from "./SocialInteractionBar"

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
  const base_url = `https://mtmm1-2-backend.onrender.com`;
  // Use an object to manage state for each post
  // const [postInfo, setPostInfo] = useState({
  //   likes: 0,
  //   commentsOpen: false, // Track if comments are open or closed
  //   shares: 0,
  // });
  // // const [likes, setLikes] = useState(0);
  // // const [comments, setComments] = useState(0);
  // // const [shares, setShares] = useState(0);

  // // Function to handle a like click
  // const handleLikeClick = (e) => {
  //   e.preventDefault();
  //   const newLikes = postInfo.likes + 1;
  //   setPostInfo({ ...postInfo, likes: newLikes });
  // };

  // // Function to handle a comment click
  // const handleCommentClick = (e) => {
  //   e.preventDefault();
  //   setPostInfo({ ...postInfo, commentsOpen: !postInfo.commentsOpen });
  // };

  // // Function to handle a share click
  // const handleShareClick = (e) => {
  //   e.preventDefault();
  //   // setShares(shares + 1);
  //   // const shareLink = `https://example.com/post/${_id}`;
  //   const shareLink = `/post/${_id}`;
  //   alert(`Share this link: ${shareLink}`);
  // };
  return (
    <Link to={`/post/${_id}`}>
      <div className="post">
       <div className="image">
        {/* <Link to={`/post/${_id}`}> */}
          <img src={`${base_url}/`+cover} alt=""/>
        {/* </Link> */}
       </div>
       <div className="texts">
        {/* <Link to={`/post/${_id}`}> */}
        <h2>{title}</h2>
        {/* </Link> */}
        <p className="info">
          <div className="author">{author} . </div>
          <time>{format(new Date(createdAt), "MMMM d, yyyy")}</time>
        </p>
          <p className="summary">{summary}</p>
            <SocialInteractionBar postId={_id} />

        </div>
      </div>
    </Link>  
  );
}