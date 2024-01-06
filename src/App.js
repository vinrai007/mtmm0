import './App.css';
// import Post from "./Post";
// import Header from "./Header";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {UserContextProvider} from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import JoinPage from "./pages/JoinPage"


function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="https://mtm-6emn.onrender.com/Home" element={<HomePage />} />
          <Route path="https://mtm-6emn.onrender.com/Archive" element={<IndexPage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Join" element={<JoinPage />} />
          <Route path="https://mtm-6emn.onrender.com/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;