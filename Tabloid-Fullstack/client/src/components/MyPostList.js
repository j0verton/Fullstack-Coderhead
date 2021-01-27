import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";
import PublishButton from './PublishButton';

const MyPostList = (props) => {

    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const history = useHistory();

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
        getToken().then((token) => {
            return fetch(`/api/post/mypost/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        })
            .then(_ => getToken()
                .then(getMyPost))
    }

    return (
        <div>
            {posts.map((post) => {
                return (<Card>
                    <CardImg top width="100%" src={post.imageLocation} alt={post.name} />
                    <CardBody>
                        <CardTitle tag="h5">{post.title}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{post.category.name}</CardSubtitle>
                        <CardText>{post.content}</CardText>
                        <Button onClick={e => history.push(`/post/edit/${post.id}`)}>Edit</Button>
                        <Button onClick={e => deletePost(post.id)}>Delete</Button>
                        <PublishButton post={post} getMyPost={getMyPost} />
                    </CardBody>
                </Card>)
            })}
        </div>
    );
};

export default MyPostList;