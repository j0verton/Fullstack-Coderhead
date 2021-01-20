import React, { useEffect, useState, useContext } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

const MyPostList = (props) => {

    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    useEffect(() => {
        getToken().then((token) => {
            return getMyPost(token)
        })
    }, [])

    const getMyPost = (token) => {
        return fetch(`/api/post/mypost`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => res.json())
        .then(p => setPosts(p))
    }

    const deletePost = (id) => {
        return fetch(`/api/post/mypost/${id}`, {
            method: "DELETE",
        })
            .then(_ => getToken()
                .then(getMyPost))
    }

    const editPost = (post) => {
        return fetch(`/api/post/mypost/${post.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then(res => res.json())
            .then(_ => getToken()
                .then(getMyPost))
    }

    return (
        <div>
            {posts.map((post) => {
                return (<Card>
                    {/* <CardImg top width="100%" src={post.imageLocation} alt={post.name} /> */}
                    <CardBody>
                        <CardTitle tag="h5">{post.title}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{post.category.name}</CardSubtitle>
                        <CardText>{post.content}</CardText>
                        <Button onClick={e => editPost(post)}>Edit</Button>
                        <Button onClick={e => deletePost(post.id)}>Delete</Button>
                    </CardBody>
                </Card>)
            })}
        </div>
    );
};

export default MyPostList;