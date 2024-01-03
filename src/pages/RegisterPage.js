// Import the necessary dependencies
import { useState } from "react";
import { Navigate } from "react-router-dom";
import NewsletterSubscriptionForm from "../SubscriptionForm";

// Define the RegisterPage component
export default function RegisterPage() {
  const base_url = `https://mtmm1-2-backend.onrender.com`;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  // Function to handle user registration
  async function register(ev) {
    ev.preventDefault();

    // Basic validation
    if (!username || username.length < 4 || !password || password.length < 4) {
      setRegistrationError('Username and password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${base_url}/register`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        setRegistrationError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      setRegistrationError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  // Redirect to login page after successful registration
  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  // Render the registration form
  return (
    <div className="infoform">
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
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
        <NewsletterSubscriptionForm />

        <button disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {registrationError && <div className="error-message">{registrationError}</div>}
      </form>
    </div>
  );
}
