import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, Jumbotron } from "reactstrap";
import PostReactions from "../components/PostReactions";
import formatDate from "../utils/dateFormatter";
import "./PostDetails.css";
import { CommentForm } from "../components/Comments/CommentForm";
import { CommentList } from "../components/Comments/CommentList";
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostDetails = () => {
  const { getCurrentUser, isAdmin } = useContext(UserProfileContext);
  const user = getCurrentUser();
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [tagId, setTagId] = useState("");
  const [reactionCounts, setReactionCounts] = useState([]);
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const history = useHistory();

  const getTags = (_) => {
    getToken()
      .then((token) =>
        fetch(`/api/tag`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then((tags) => {
        setTagsList(tags);
      });
  };

  const getPost = () => {
    return fetch(`/api/post/${postId}`)
      .then((res) => {
        if (res.status === 404) {
          toast.error("This isn't the post you're looking for");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setTags(data.post.postTags);
        setPost(data.post);
        setReactionCounts(data.reactionCounts);
        setComments(data.comments);
      });
  };

  const checkUser = (_) => {
    if (user.id === post.userProfileId) {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    setTagId(e.target.value);
  };

  const Delete = (tag) => {
    return getToken()
      .then((token) =>
        fetch(`/api/posttag/${tag.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((_) => {
        getTags();
      });
  };

  const SaveTagToPost = (token) => {
    return fetch(`/api/posttag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tagId: tagId, postId: postId }),
    });
  };

  const PostTags = (_) => {
    const tagsOnPost = tags.map((tag) => tag.tag);
    return tagsList.filter((tag) => {
      return !tagsOnPost.find((t) => t.id === tag.id);
    });
  };

  const subscribe = (author) => {
    console.log("here")
    return getToken()
    .then((token) => 
    fetch('/api/subscription', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({subscriberUserProfileId: user.id, providerUserProfileId: author})
    }))
  }

  useEffect(() => {
    getTags();
    getPost();
  }, []);

  if (!post) return null;
  if (
    post.isApproved === false &&
    post.userProfileId != user.id &&
    !isAdmin()
  ) {
    history.push("/");
  }

  return (
    <div>
      <Jumbotron
        className="post-details__jumbo"
        style={{ backgroundImage: `url('${post.imageLocation}')` }}
      ></Jumbotron>
      <div className="container">
        <h1>{post.title}</h1>
        <h5 className="text-danger">{post.category.name}</h5>
        <div className="row">
          <div className="col">
            <img
              src={post.userProfile.imageLocation}
              alt={post.userProfile.displayName}
              className="post-details__avatar rounded-circle"
            />
            <p className="d-inline-block">{post.userProfile.displayName}</p>
          </div>
          <div className="col">
            <p>{formatDate(post.publishDateTime)}</p>
          </div>
        </div>
        <div className="text-justify post-details__content">{post.content}</div>
        {checkUser() || isAdmin() ? (
          <>
            <Input type="select" onChange={(e) => handleChange(e)}>
              <option value="0">Please select a tag to add.</option>
              {PostTags().map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {" "}
                  {tag.name}{" "}
                </option>
              ))}
            </Input>
            <Button
              onClick={(e) => {
                getToken().then(SaveTagToPost).then(getPost).then(getTags);
              }}
            >
              Save Tag
            </Button>{" "}
          </>
        ) : (
          ""
        )}

        <div>
          Tags:{" "}
          {checkUser() || isAdmin()
            ? tags.map((tag) => {
                return (
                  <>
                    <Link
                      onClick={(e) => Delete(tag).then(getPost).then(getTags)}
                    >
                      {tag.tag.name}
                    </Link>{" "}
                  </>
                );
              })
            : tags.map((tag) => `${tag.tag.name} `)}
        </div>
        <div>
        <Button color="danger" onClick={(e) => subscribe(post.userProfileId)}>Subscribe</Button>
        </div>
        <div className="my-4">
          <PostReactions postReactions={reactionCounts} getPost={getPost} />
        </div>
        {comments ? (
          <div className="col float-left my-4 text-left">
            <CommentList postComments={comments} getPost={getPost} />
            <CommentForm getPost={getPost} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PostDetails;
