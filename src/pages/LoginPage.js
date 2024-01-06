// // Import the necessary dependencies
// import { useContext, useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { UserContext } from "../UserContext";

// // Define the LoginPage component
// export default function LoginPage() {
//   const base_url = `https://mtmm1-2-backend.onrender.com`;
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [redirect, setRedirect] = useState(false);
//   const { setUserInfo } = useContext(UserContext);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loginError, setLoginError] = useState('');
//   const [isClicked, setIsClicked] = useState(false);

//   // Function to handle button click with a delay
//   const handleButtonClick = () => {
//     setIsClicked(true);
//     setTimeout(() => {
//       setIsClicked(false);
//     }, 1000);
//   };

//     // const base_url = 'http://localhost:4000';


//   const {setUserInfoo,userInfo} = useContext(UserContext);


//   useEffect(() => {
//     fetch(`${base_url}/profile`, {
//       credentials: 'include',
//     })
//       .then(response => response.json())
//       .then(userInfo => setUserInfoo(userInfo))
//       .catch(error => console.error('Error fetching user profile:', error));
//   }, []);
//     const usernam = userInfo?.username;


//   // Function to handle user login
//   async function login(ev) {
//     ev.preventDefault();

//     // Client-side validation
//     if (!username || !password) {
//       setLoginError('Please enter both username and password.');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch(`${base_url}/login`, {
//         method: 'POST',
//         body: JSON.stringify({ username, password }),
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const userInfo = await response.json();
//         setUserInfo(userInfo);
//         setRedirect(true);
//       } else {
//         setLoginError('Wrong credentials. Please try again.');
//       }
//     } catch (error) {
//       console.error('An error occurred during login:', error);
//       setLoginError('An error occurred. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // Redirect to home page if login is successful
//   if (redirect) {
//     return <Navigate to={'/'} />;
//   }

//   // Render the login form
//   return (
//     <div className="infoform">

//       <form className="login" onSubmit={login}>
//               {usernam && (
//         <h1>Please Sign in again to join MTM community</h1>
//         )}
//               {!usernam && (
//         <h2>Sign in</h2>
//       )}
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(ev) => setUsername(ev.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(ev) => setPassword(ev.target.value)}
//         />
//         <button
//           className={`color-change-button ${isClicked ? "clicked" : ""}`}
//           onClick={handleButtonClick}
//           disabled={isLoading}
//         >
//           {isLoading ? 'Signing in...' : 'Sign in'}
//         </button>

//         {loginError && <div className="error-message">{loginError}</div>}

//         {/* <NewsletterSubscriptionForm /> */}
//       </form>
//     </div>
//   );
// }


import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import {Link} from "react-router-dom";


export default function LoginPage() {
  const base_url = `https://mtmm1-2-backend.onrender.com`;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const { setUserInfo: setUserInfoContext, userInfo } = useContext(UserContext);
  const storedUser = localStorage.getItem('user');

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch(`${base_url}/user`, {
          method: 'GET',
          credentials: 'include',  // Include credentials (cookies) in the request
        });

        if (response.ok) {
          const userInfo = await response.json();
          setUserInfoContext(userInfo);
          setRedirect(true);
        } else {
          // Handle unauthorized or other errors
        }
      } catch (error) {
        console.error('An error occurred while checking user session:', error);
      }
    };

    if (storedUser) {
      setUserInfoContext(JSON.parse(storedUser));
      checkUserSession(); // Check user session on page load
    }
  }, [setUserInfoContext, storedUser]);

  const handleButtonClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  async function login(ev) {
    ev.preventDefault();

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
        credentials: 'include',  // Include credentials (cookies) in the request
      });

      if (response.ok) {
        const userInfo = await response.json();

        // Store user information in local storage
        localStorage.setItem('user', JSON.stringify(userInfo));

        setUserInfoContext(userInfo);
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

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="infoform">
      <form className="login" onSubmit={login}>
        {userInfo?.username && (
          <h1>Please Sign in again to join MTM community</h1>
        )}
        {!userInfo?.username && <h2>Sign in</h2>}
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
         or register here<Link to="/register">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-add" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                        <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                        </svg>
                        &nbsp;Register</Link>
      </form>

    </div>
  );
}
