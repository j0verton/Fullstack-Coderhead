import React, { useEffect, useState } from "react";
import ApprovePostList from "../components/ApprovePostList";

const Approval = () => {
  const [posts, setPosts] = useState([]);

  const GetPosts = () => {
    fetch("/api/post/approvals")
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  };
  useEffect(() => {
    GetPosts();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-10 col-xs-12">
        <h3>Posts Awaiting Approval:</h3>
        <ApprovePostList posts={posts} approved={false} GetPosts={GetPosts} />
      </div>
    </div>
  );
};

export default Approval;
