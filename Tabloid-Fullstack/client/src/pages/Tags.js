import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import ShowTag from "../components/ShowTag";
import { UserProfileContext } from "../providers/UserProfileProvider";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    getTags();
  }, []);
  const getTags = (_) => {
    getToken()
      .then((token) =>
        fetch(`/api/tag`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then((tags) => {
        setTags(tags);
      });
  };
  const saveNewTag = (_) => {
    const tagToAdd = { name: newTag };
    getToken().then((token) =>
      fetch("/api/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tagToAdd),
      }).then((_) => {
        setNewTag("");
        getTags();
      })
    );
  };

  return (
    <div className="container mt-5">
      <img
        height="100"
        src="/quill.png"
        alt="Quill Logo"
        className="bg-danger rounded-circle"
      />
      <h1>Tag Management</h1>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-8 col-md-6">
          <ListGroup>
            {tags.map((tag) => (
              <ListGroupItem key={tag.id}>
                <ShowTag tag={tag} getTags={getTags} />
              </ListGroupItem>
            ))}
          </ListGroup>
          <div className="my-4">
            <InputGroup>
              <Input
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                placeholder="Add a new tag"
              />
              <Button onClick={saveNewTag}>Save</Button>
            </InputGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
