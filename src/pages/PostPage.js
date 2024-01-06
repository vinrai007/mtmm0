import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';
import CommentBoxx from "../CommentBoxx";
import SocialInteractionBar from "../SocialInteractionBar"
import Comment from "../../src/Comment"
import {format} from "date-fns";


import Spinner from 'react-bootstrap/Spinner';
import "bootstrap/dist/css/bootstrap.min.css";

// import Comment from "../Comment"; 

export default function PostPage() {
  const base_url = `https://mtmm1-2-backend.onrender.com`;
  const [loading, setLoading] = useState(true);
  const [postInfo,setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  useEffect(() => {
    fetch(`${base_url}/post/${id}`)
      .then(response => {
        // response.json()
                    if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
          .then(postInfo => {
          setPostInfo(postInfo);

          })
                      .catch(error => {
        console.error('Error fetching posts:', error.message);
        // Handle the error state, for example, you can set an error flag in the state
        setLoading(false);
        // You might want to show an error message to the user
      });
      // });
  }, []);
  // for comments
    const [comments,setComments] = useState([]);
  useEffect(() => {
    fetch(`${base_url}/comment?postId=${id}`).then(response => {
      response.json().then(comments => {
        setComments(comments);
                setLoading(false);

      });
    });
  }, [id]);

  if (!postInfo) return '';
      if (loading) {
        return (<div className="app d-flex align-items-center justify-content-center" style={{ marginTop: '100px' }}>
    <Spinner animation="border" role="status" className="mt-9" style={{ width: '5rem', height: '5rem' }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner> </div>
  );
  }
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      {/* <time>{format(new Date(postInfo.createdAt),  "MMMM d, yyyy")}</time>
      <div className="author">by @{postInfo.author.username}</div> */}
             <div className="post-info">
              <time>{format(new Date(postInfo.createdAt),  "MMMM d, yyyy")}</time>
      <div className="author">by @{postInfo.author}</div>
      </div>
      {userInfo.id === postInfo.authorId && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`${base_url}/${postInfo.cover}`} alt=""/>
      </div>
      {/* <div className="post-info">
              <time>{format(new Date(postInfo.createdAt),  "MMMM d, yyyy")}</time>
      <div className="author">by @{postInfo.author.username}</div>
      </div> */}
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />

      <div className="comment-boxx">
        <div className="ppsib"><SocialInteractionBar postId={postInfo._id} /></div>
        <CommentBoxx postId={postInfo._id} userId={userInfo.id} username={userInfo.username} />
        {comments.map(comment => (
        <Comment {...comment} />
        ))}
         {/* Render your comment box component here */}
        {/* Example: <CommentBox postId={postId} /> */}
                {/* {comments.length > 0 && comments.map(comment => (
        <Comment {...comment} />
      ))} */}
      </div>
    </div>
    
  );
}