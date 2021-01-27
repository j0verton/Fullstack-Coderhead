import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Jumbotron, Progress, Media } from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";
import firebase from "firebase/app";

const PostForm = (props) => {

    const [post, setPost] = useState({})
    const [categories, setCategories] = useState([])
    const [imageLocation, setImageLocation] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
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

    const uploadImage = async e => {
        console.log("uploading", e.target.files[0])
        setIsLoading(true)
        const file = e.target.files[0]
        let storageRef = firebase.storage().ref(`ProfilePictures/${file.name}`)
        let task = storageRef.put(file)
        task.on('state_changed',
            function progess(snapshot) {

                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setLoadingProgress(percentage)
            },
            function error(err) {

            },
            function complete() {
                task.snapshot.ref.getDownloadURL()
                    .then(setImageLocation)
                setIsLoading(false)

            }
        )
    }

    const handleChange = (e) => {
        const newPost = { ...post }
        newPost[e.target.name] = e.target.value
        setPost(newPost)
    }

    const addNewPost = (post) => {
        post.imageLocation = imageLocation
        getToken().then((token) =>
            fetch('/api/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(post)
            }))
            .then(() => history.push('/'))
    }

    return (
        <>
            {imageLocation ?
                <Jumbotron fluid><Media src={imageLocation} /></Jumbotron> : null
            }
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
                <FormGroup>
                    {
                        isLoading ? <>
                            <div className="text-center">{loadingProgress}%</div>
                            <Progress className="mb-2" value={loadingProgress} /> </> : null
                    }
                    <Input className="mb-2"
                        type="file"
                        id="profilePicUpload"
                        placeholder="Upload a Profile Picture"
                        onChange={uploadImage}
                    />
                </FormGroup>
                <Button
                    onClick={e => {
                        e.preventDefault()
                        addNewPost(post)
                    }}>Save</Button>
            </Form>
        </>
    );
}

export default PostForm;