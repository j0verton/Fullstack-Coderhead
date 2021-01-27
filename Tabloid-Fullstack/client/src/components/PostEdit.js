import { getByTestId } from "@testing-library/react";
import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Jumbotron, Media, Progress } from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import firebase from "firebase/app";

const PostEdit = (props) => {
  const [postToEdit, setEditing] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const [imageLocation, setImageLocation] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);


  const { id } = useParams();

  const history = useHistory();

  useEffect(() => {
    getToken()
      .then((token) =>
        fetch(`/api/category`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then((cat) => setCategories(cat))
      .then((_) => {
        getToken()
          .then((token) =>
            fetch(`/api/post/${id}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
          .then((res) => res.json())
          .then((editing) => {
            console.log(editing)
            if (editing.post.imageLocation) {

              setImageLocation(editing.post.imageLocation);
            }
            setEditing(editing.post)
          });
      });
  }, []);


  const uploadImage = async e => {
    console.log("uploading", e.target.files[0])
    setIsLoading(true)
    const file = e.target.files[0]
    let storageRef = firebase.storage().ref(`PostHeaders/${file.name}${new Date().getTime()}`)
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
    const newPost = { ...postToEdit };
    newPost[e.target.name] = e.target.value;
    setEditing(newPost);
  };

  const updatePost = (post) => {
    post.imageLocation = imageLocation
    getToken()
      .then((token) =>
        fetch(`/api/post/mypost/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(post),
        })
      )
      .then((e) => history.push("/mypost"));
  };

  return (
    <>
      {imageLocation ?
        <Jumbotron fluid><Media src={imageLocation} /></Jumbotron> : null
      }
      <Form>
        <FormGroup>
          <Label for="title">Title of Post</Label>
          <Input
            type="title"
            name="title"
            id="title"
            value={postToEdit.title}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">Post Content</Label>
          <Input
            type="textarea"
            name="content"
            id="content"
            value={postToEdit.content}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectMulti">Category</Label>
          <Input
            type="select"
            name="categoryId"
            id="category"
            value={postToEdit.categoryId}
            onChange={(e) => handleChange(e)}
          >
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
          onClick={(e) => {
            e.preventDefault();
            updatePost(postToEdit);
          }}
        >
          Save
      </Button>
      </Form>
    </>
  );
};

export default PostEdit;
