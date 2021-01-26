import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import CategoryManager from "../pages/CategoryManager";
import { CommentForm } from "./Comments/CommentForm";
import ProfileManager from "./UserProfile/ProfileManager";
import PostForm from "../components/PostForm";
import TagForm from "./TagForm";
import Tags from "../pages/Tags";
import MyPostList from "../components/MyPostList";
import PostEdit from "../components/PostEdit";
import Subscription from "../pages/Subscription";
import Approval from "../pages/Approval";

const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext);
  const { isAdmin } = useContext(UserProfileContext);

  return (
    <Switch>
      <Route path="/" exact>
        {isLoggedIn ? <p>Home</p> : <Redirect to="/login" />}
      </Route>
      <Route path="/explore">
        {isLoggedIn ? <Explore /> : <Redirect to="/login" />}
      </Route>
      <Route path="/approval">
        {isLoggedIn ? (
          isAdmin() ? (
            <Approval />
          ) : (
              <Redirect to="/" />
            )
        ) : (
            <Redirect to="/login" />
          )}
      </Route>
      <Route path="/mypost">
        {isLoggedIn ? <MyPostList /> : <Redirect to="/login" />}
      </Route>
      <Route path="/post/edit/:id">
        {isLoggedIn ? <PostEdit /> : <Redirect to="/login" />}
      </Route>
      <Route path="/create/post">
        {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/subscription">
        {isLoggedIn ? <Subscription /> : <Redirect to="/login" />}
      </Route>
      <Route path="/post/:postId">
        {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
      </Route>
      <Route path="/categories">
        {isLoggedIn ? (
          isAdmin() ? (
            <CategoryManager />
          ) : (
              <Redirect to="/" />
            )
        ) : (
            <Redirect to="/login" />
          )}
      </Route>
      <Route path="/comment/:postId">
        {isLoggedIn ? <CommentForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/Tags">
        {isLoggedIn ? (
          isAdmin() ? (
            <Tags />
          ) : (
              <Redirect to="/" />
            )
        ) : (
            <Redirect to="/login" />
          )}
      </Route>
      <Route path="/Create/Tags">
        {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/profiles">
        {isLoggedIn ? (
          isAdmin() ? (
            <ProfileManager />
          ) : (
              <Redirect to="/" />
            )
        ) : (
            <Redirect to="/login" />
          )}
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
