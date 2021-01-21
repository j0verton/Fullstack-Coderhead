import { getByTestId } from "@testing-library/react";
import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostEdit = (props) => {
  const [postToEdit, setEditing] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const { getToken } = useContext(UserProfileContext);

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
          .then((editing) => setEditing(editing.post));
      });
  }, []);

  const handleChange = (e) => {
    const newPost = { ...postToEdit };
    newPost[e.target.name] = e.target.value;
    setEditing(newPost);
  };

  const updatePost = (post) => {
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
      <Button
        onClick={(e) => {
          e.preventDefault();
          updatePost(postToEdit);
        }}
      >
        Save
      </Button>
    </Form>
  );
};

export default PostEdit;
