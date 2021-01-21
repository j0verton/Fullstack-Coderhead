import React, { useState, useContext } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostSearch = ({ setPosts }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const { getCurrentUser, getToken } = useContext(UserProfileContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        return getToken().then((token) => {
            fetch(`/api/post/search?criterion=${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
                .then((res) => res.json())
                .then((posts) => {
                    setPosts(posts);
                });
        })
    };



    return (
        <Form onSubmit={handleSubmit}>
            <Input placeholder="Search by title" onChange={e => setSearchTerm(e.target.value)} />
            <Button type="submit">Search</Button>
        </Form>
    );
};

export default PostSearch;