import React, { useState, useContext } from 'react';
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



    return (
        <Form onSubmit={handleSubmit}>
            <Input placeholder="Search by title" onChange={e => setSearchTerm(e.target.value)} />
            <Label for="Select">Search By Tag</Label>
            <Button type="submit">Search</Button>
            <Input type="select" name="select" id="exampleSelect">
                {tags.map(tag => {

                    <option value={tag.id}>{tag.name}</option>
                }

                )}
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Input>
            <Input placeholder="Search by title or category" onChange={e => setSearchTerm(e.target.value)} />
        </Form>
    );
};

export default PostSearch;