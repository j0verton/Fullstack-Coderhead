import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import CategoryManager from "../pages/CategoryManager";
import PostForm from "../components/PostForm";
import TagForm from "./TagForm";
import Tags from "../pages/Tags";
import ProfileManager from "../pages/ProfileManager";
import MyPostList from "../components/MyPostList";

const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <Switch>
      <Route path="/" exact>
        {isLoggedIn ? <p>Home</p> : <Redirect to="/login" />}
      </Route>
      <Route path="/explore">
        {isLoggedIn ? <Explore /> : <Redirect to="/login" />}
      </Route>
      <Route path="/mypost">
        {isLoggedIn ? <MyPostList /> : <Redirect to="/login" />}
      </Route>
      <Route path="/create/post">
        {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/post/:postId">
        {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
      </Route>
      <Route path="/categories">
        {isLoggedIn ? <CategoryManager /> : <Redirect to="/login" />}
      </Route>
      <Route path="/Tags">
        {isLoggedIn ? <Tags /> : <Redirect to="/login" />}
      </Route>
      <Route path="/Create/Tags">
        {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/profiles">
        {isLoggedIn ? <ProfileManager /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
};

export default ApplicationViews;
