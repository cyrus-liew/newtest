import {Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import './App.css';
import HomePage from './pages/Home/HomePage';
import PostsDetailsPage from "./pages/postDetail/PostsDetailsPage";
import UserRegisterPage from "./pages/register/UserRegisterPage";
import LoginPage from "./pages/login/LoginPage";
import PostsPage from './pages/Posts/PostsPage';
import CreateNewPost from './pages/Posts/createNewPost';
import UserProfilePage from "./pages/profile/UserProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screens/Admin";
import Comment from "./pages/admin/screens/comments/Comment";
import NewPost from "./pages/admin/screens/posts/NewPost";
import ManagePost from "./pages/admin/screens/posts/ManagePost";
import AboutPage from "./pages/Home/aboutPage";
import ContactPage from "./pages/Home/contactPage";
import FaqPage from "./pages/Home/faqPage";



function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        {/* //path and component */}
        <Route index path="/" element={<HomePage />}/>
        <Route path="/post/:slug" element={<PostsDetailsPage />}/>
        <Route path="/userregister" element={<UserRegisterPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/profile" element={<UserProfilePage />}/>
        <Route path="/createNewPost" element={<CreateNewPost />}/>
        <Route path="/posts" element={<PostsPage />}/>
        <Route path="/posts/:searchTerm" element={<PostsPage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/contacts" element={<ContactPage />}/>
        <Route path="/faq" element={<FaqPage />}/>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comment />} />
          <Route path="posts/new" element={<NewPost />} />
          <Route path="posts/manage" element={<ManagePost />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
