import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import PostSearch from "../components/PostSearch";

const Subscription = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/subscription")
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
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