// Import the necessary dependencies
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

// Define the LoginPage component
export default function LoginPage() {
  const base_url = `https://mtmm1-2-backend.onrender.com`;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  // Function to handle button click with a delay
  const handleButtonClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

    // const base_url = 'http://localhost:4000';


  const {setUserInfoo,userInfo} = useContext(UserContext);


  useEffect(() => {
    fetch(`${base_url}/profile`, {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(userInfo => setUserInfoo(userInfo))
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);
    const usernam = userInfo?.username;


  // Function to handle user login
  async function login(ev) {
    ev.preventDefault();

    // Client-side validation
    if (!username || !password) {
      setLoginError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${base_url}/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        setRedirect(true);
      } else {
        setLoginError('Wrong credentials. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setLoginError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  // Redirect to home page if login is successful
  if (redirect) {
    return <Navigate to={'/'} />;
  }

  // Render the login form
  return (
    <div className="infoform">

      <form className="login" onSubmit={login}>
              {usernam && (
        <h1>Please Sign in again to join MTM community</h1>
        )}
              {!usernam && (
        <h2>Sign in</h2>
      )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          className={`color-change-button ${isClicked ? "clicked" : ""}`}
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>

        {loginError && <div className="error-message">{loginError}</div>}

        {/* <NewsletterSubscriptionForm /> */}
      </form>
    </div>
  );
}
