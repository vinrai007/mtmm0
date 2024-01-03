import Post from "../Post";
import {useEffect, useState} from "react";
import Loader from 'react-loaders'
import Spinner from 'react-bootstrap/Spinner';
import "bootstrap/dist/css/bootstrap.min.css";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState('latest');
  //   const [isClicked, setIsClickeded] = useState(false);
  //   const itemsPerPage = 6;
  // const [n, setN] = useState(0); 
  //   const handleNextClick = () => {
  //     setN(prevN => prevN + 1);
  //     setIsClickeded(false)
  // };

  // const handlePreviousClick = () => {
  //   if (n > 0) {
  //     setN(prevN => prevN - 1);
  //      setIsClickeded(true)
  //   }
  // };
    const [searchQuery, setSearchQuery] = useState('');
const [filteredPosts, setFilteredPosts] = useState([]);
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
  
  const handleSortClick = (order) => {
    setSortBy(order);

  };
    const base_url = `https://mtmm1-2-backend.onrender.com`;

  const sortedPosts = sortBy === 'latest' ? posts : [...posts].reverse();

  useEffect(() => {
    fetch(`${base_url}/post`).then(response => {
      // response.json()
                    if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
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
  }, []);
    if (loading) {
        return (<div className="app d-flex align-items-center justify-content-center" style={{ marginTop: '100px' }}>
    <Spinner animation="border" role="status" className="mt-9" style={{ width: '5rem', height: '5rem' }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner> </div>
  );
  }
  return (
    <>
              {/* <h1>Archives</h1> */}
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
      <div className="index">
        {sortedPosts.length > 0 && sortedPosts.map((post) => (
        <Post key={post.id} {...post} />
      ))} 
      {/* {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))} */}
      <Loader type="pacman" />

      </div>
                    {/* <div className="sorting-buttons">
        <button
          onClick={handlePreviousClick} disabled={n === 0}
          className= {isClicked ? 'active' : ''}
        >
          Previous <svg xmlns="http://www.w3.org/2000/svg" width="16" height="26" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg>
        </button>
        <button
          onClick={handleNextClick}
          className={isClicked ? '' : 'active'}
        >
          Next <svg xmlns="http://www.w3.org/2000/svg" width="16" height="26" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg>
        </button>
      </div> */}
    </>  
  );
}