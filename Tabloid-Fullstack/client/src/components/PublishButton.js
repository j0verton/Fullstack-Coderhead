import React, { useContext } from "react";
import { Button } from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useHistory } from "react-router-dom";

const PublishButton = ({ post, getMyPost }) => {

    const { getToken } = useContext(UserProfileContext);
    const history = useHistory();

    const updatePost = (post) => {
        getToken()
            .then((token) =>
                fetch(`/api/post/mypost/publish/${post.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(post),
                })
            )
            .then(() => {
                getToken()
                    .then((token) =>
                        getMyPost(token)
                    )
            })
    };
    return (<>
        {
            post.publishDateTime ? null :
                < Button
                    onClick={(e) => {
                        e.preventDefault();
                        updatePost(post);
                    }}
                >
                    Publish
                 </Button>
        }
    </>
    )
};
export default PublishButton;
