import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Posts from "./Posts/Posts";
import Login from "./Login/Login";
import MyPost from "./MyPost/MyPost";
import PostDetails from "./MyPost/PostDetails/PostDetails";
import Navbar from "./Navbar/Navbar";
import AddPost from "./MyPost/AddPost/AddPost";
import EditPost from "./MyPost/EditPost/EditPost";
import Users from "./Users/Users";
import UserDetails from "./Users/UserDetails/UserDetails";
import Register from "./Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/register">
          <Register></Register>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/">
          <Posts></Posts>
        </Route>
        <Route path="/post">
          <Posts></Posts>
        </Route>
        <Route path="/users">
          <Users></Users>
        </Route>
        <Route path="/userDetails/:id">
          <UserDetails></UserDetails>
        </Route>
        <PrivateRoute path="/mypost">
          <MyPost></MyPost>
        </PrivateRoute>
        <PrivateRoute path="/addpost">
          <AddPost></AddPost>
        </PrivateRoute>
        <PrivateRoute path="/editpost/:postId">
          <EditPost></EditPost>
        </PrivateRoute>
        <Route path="/postDetails/:postId">
          <PostDetails></PostDetails>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
