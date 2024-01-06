import Post from "../Post";
import {useEffect, useState} from "react";
import Loader from 'react-loaders'
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from "../UserContext";
import { useContext } from "react";
import Nav from 'react-bootstrap/Nav';
// import Form from 'react-bootstrap/Form';





// import Post from "../Post";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


export default function HomePage() {
  const [posts, setPosts] = useState([]);
    // const [hposts, sethPosts] = useState([]);
  const [show, setShow] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
const [/*filteredPosts,*/ setFilteredPosts] = useState([]);
const handleSearch = () => {
  // Perform the search logic here
  const searchRegex = new RegExp(searchQuery, 'i'); // 'i' for case-insensitive

  // Filter posts based on the search query
  const filteredPosts = posts.filter(
    (post) => searchRegex.test(post.title) || searchRegex.test(post.summary)
  );

  // Update the state with the filtered posts
  setFilteredPosts(filteredPosts);
};

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
    const {setUserInfo,userInfo} = useContext(UserContext);
     const username = userInfo?.username;


  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState('latest');

  const handleSortClick = (order) => {
    setSortBy(order);
  };
  const base_url = `https://mtmm1-2-backend.onrender.com`;

  const sortedPosts = sortBy === 'latest' ? posts : [...posts].reverse();

  useEffect(() => {
    fetch(`${base_url}/post`).then(response => {
            if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      // response.json()
        
        .then(posts => {
        setPosts(posts);
        setLoading(false);
      })
    // });
            .catch(error => {
        console.error('Error fetching posts:', error.message);
        // Handle the error state, for example, you can set an error flag in the state
        setLoading(false);
        // You might want to show an error message to the user
      });
  }, [base_url]);
  // Assuming you have a state variable for the search term

  if (loading) {
        return (<div className="app d-flex align-items-center justify-content-center" style={{ marginTop: '100px' }}>
    <Spinner animation="border" role="status" className="mt-9" style={{ width: '5rem', height: '5rem' }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner> </div>
  );
  }
    return (
      <>
        {!username && (
                <Modal show={show} className="modal" >
        <Modal.Header >
          <Modal.Title>Matters That Matter</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Sign in to continue !!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
                       <Nav.Item>
                                           <Link to="/login">Sign in</Link>
                                           </Nav.Item>
          </Button>
          <Button variant="primary" onClick={handleClose}>
                       <Nav.Item>
                                           <Link to="/register">Register</Link>
                                           </Nav.Item>
          </Button>
        </Modal.Footer>
      </Modal>
        )}
    {/* //   <div className="home"> */}
      <div className="slides">
        <Carousel slide={false}>
          <Carousel.Item>
            {posts.length > 0 && (
            <Post key={posts[0].id} {...posts[0]} />
            )}
          </Carousel.Item>
          <Carousel.Item>
            {posts.length > 0 && (
            <Post key={posts[1].id} {...posts[1]} />
            )}
          </Carousel.Item>
          <Carousel.Item>
            {posts.length > 0 && (
            <Post key={posts[3].id} {...posts[3]} />
            )}
          </Carousel.Item>
          <Carousel.Item>
            {posts.length > 0 && (
            <Post key={posts[4].id} {...posts[4]} />
            )}
          </Carousel.Item>
          <Carousel.Item>
          {posts.length > 0 && (
          <Post key={posts[5].id} {...posts[5]} />
          )}
          </Carousel.Item>
        </Carousel>
      </div>
        <div>
        <h1>Archives</h1>
              <div className="sorting-buttons">
        <button
          onClick={() => handleSortClick('latest')}
          className= {sortBy === 'latest' ? 'active' : ''}
        >
          Latest
        </button>
        <button
          onClick={() => handleSortClick('oldest')}
          className={sortBy === 'oldest' ? 'active' : ''}
        >
          Oldest
          </button>
          </div>
          </div>
          <div className="input">
          <input className="input"
        type="text"
            placeholder=
            
            "            Search by title or summary"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="search">
      {/* <button onClick={handleSearch}>Search</button> */}
            </div>
            </div>
            
        

      <div className="home">
          {/* <h1>Archives</h1> */}
              {sortedPosts.length > 0 &&
      sortedPosts
        .filter((post) => {
          const searchRegex = new RegExp(searchQuery, 'i'); // 'i' for case-insensitive
          return searchRegex.test(post.title) || searchRegex.test(post.summary);
        })
        .map((post) => (
          <Post {...post} key={post.id} />
        ))}
              {/* {sortedPosts.length > 0 && sortedPosts.map((post) => (
        <Post key={post.id} {...post} />
              ))}   */}


      {/* {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))} */}
      <Loader type="pacman" />

        </div>
          <div>
    {/* <div>
      <input
        type="text"
        placeholder="Search by title or summary"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div> */}

    {/* {sortedPosts.length > 0 &&
      sortedPosts
        .filter((post) => {
          const searchRegex = new RegExp(searchQuery, 'i'); // 'i' for case-insensitive
          return searchRegex.test(post.title) || searchRegex.test(post.summary);
        })
        .map((post) => (
          <Post {...post} key={post.id} />
        ))} */}
  </div>
       </>         
  );
}