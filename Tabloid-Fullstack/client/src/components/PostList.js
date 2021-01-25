import React from "react";
import PostSummaryCard from "./PostSummaryCard";

const PostList = ({ posts, approved = true }) => {
  return (
    <div>
      {posts.map((post) => {
        if (post.isApproved === approved) {
          return (
            <div className="m-4" key={post.id}>
              <PostSummaryCard post={post} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default PostList;
