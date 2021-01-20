import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostForm = (props, GetPost) => {

    const [post, setPost] = useState({})
    const [categories, setCategories] = useState([])
    const { getToken } = useContext(UserProfileContext);

    const history = useHistory()

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/category`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }))
            .then(res => res.json())
            .then(cat => setCategories(cat))
    }, [])

    const handleChange = (e) => {
        const newPost = { ...post }
        newPost[e.target.name] = e.target.value
        setPost(newPost)
    }

    const addNewPost = (post) => {
        getToken().then((token) =>
            fetch('/api/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(post)
            }))
            .then(() => GetPost())
    }

    return (
        <Form>
            <FormGroup>
                <Label for="title">Title of Post</Label>
                <Input type="title" name="Title" id="title" onChange={(e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
                <Label for="content">Post Content</Label>
                <Input type="textarea" name="Content" id="content" onChange={(e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelectMulti">Category</Label>
                <Input type="select" name="CategoryId" id="category" onChange={(e) => handleChange(e)} >
                    <option>Select a Category for your Post!</option>
                    {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Input>
            </FormGroup>
            <Button
                onClick={e => {
                    e.preventDefault()
                    addNewPost(post)
                }}>Save</Button>
        </Form>
    );
}

export default PostForm;