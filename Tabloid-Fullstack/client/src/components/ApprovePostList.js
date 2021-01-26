import React, { useContext } from "react";
import { Button } from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import PostSummaryCard from "./PostSummaryCard";

const ApprovePostList = ({ posts, approved = true, GetPosts }) => {
  const { getToken } = useContext(UserProfileContext);

  const ApprovePost = (post) => {
    return getToken().then((token) =>
      fetch(`/api/post/approvals/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      })
    );
  };

  return (
    <div>
      {posts.map((post) => {
        if (post.isApproved === approved) {
          return (
            <div className="m-4" key={post.id}>
              <PostSummaryCard post={post} />{" "}
              <Button
                onClick={(e) => {
                  ApprovePost(post).then(GetPosts);
                }}
              >
                Approve Post
              </Button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ApprovePostList;
