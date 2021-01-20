import React, { useEffect, useState, useContext } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

const MyPostList = (props) => {

    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/post/mypost`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }))
            .then(res => res.json())
            .then(p => setPosts(p))
    }, [])

    return (
        <div>
            {posts.map((post) => {
                return (<Card>
                    <CardImg top width="100%" src={post.imageLocation} alt={post.name} />
                    <CardBody>
                        <CardTitle tag="h5">{post.title}</CardTitle>
                        <CardText>{post.content}</CardText>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </CardBody>
                </Card>)
            })}
        </div>
    );
};

export default MyPostList;