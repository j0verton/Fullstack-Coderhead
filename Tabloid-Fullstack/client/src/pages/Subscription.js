import React, { useContext, useEffect, useState } from "react";
import PostList from "../components/PostList";
import PostSearch from "../components/PostSearch";
import { UserProfileContext } from "../providers/UserProfileProvider";

const Subscription = () => {
  const [posts, setPosts] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  useEffect(() => {
    getToken()
    .then((token) =>
    fetch("/api/subscription", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      }));
  }, []);

  return (
    <div className="row">
      <div className="col-lg-2 col-xs-12"><PostSearch setPosts={setPosts} /></div>
      <div className="col-lg-10 col-xs-12">
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default Subscription;