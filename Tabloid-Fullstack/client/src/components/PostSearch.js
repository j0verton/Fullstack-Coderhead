import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Input, Label } from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostSearch = ({ setPosts, tags }) => {
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

    const handleSelect = e => {
        console.log(e.target.value)
        return getToken().then((token) => {
            fetch(`/api/posttag/${e.target.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
                .then((res) => res.json())
                .then((posts) => {
                    console.log(posts)
                    if (posts.length === 0) {

                    }
                    setPosts(posts);
                });
        })

    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input placeholder="Search by title or category" onChange={e => setSearchTerm(e.target.value)} />
            <Button type="submit">Search</Button>
            <Input type="select" name="select" id="TagSelect" onChange={(e) => handleSelect(e)}>
                <option value="0">Search by Tag</option>
                {tags.map(tag => {
                    return <option value={tag.id} key={tag.id}>{tag.name}</option>
                }

                )}
            </Input>
        </Form>
    );
};

export default PostSearch;