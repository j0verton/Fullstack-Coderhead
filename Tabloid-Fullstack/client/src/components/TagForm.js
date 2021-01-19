import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, FormGroup, Input, Label, Form } from "reactstrap";

const TagForm = () => {
  const [tag, setTag] = useState({});
  const history = useHistory();

  useEffect((_) => {}, []);

  const handleChange = (e) => {
    const newTag = { ...tag };
    newTag[e.target.name] = e.target.value;
    setTag(newTag);
  };
  const saveTagObj = (_) => {
    AddNewTag(tag).then((_) => history.push("/"));
  };
  const AddNewTag = (tag) => {
    return fetch("/api/tag", {
      method: "POST",
      headers: {
        "Content-Type": "applocation/JSON",
      },
      body: JSON.stringify(tag),
    });
  };

  return (
    <Form onSubmit={saveTagObj}>
      <FormGroup>
        <Label for="Name">Name of Tag:</Label>
        <Input type="text" name="Name" id="Name" onChange={handleChange} />
      </FormGroup>
      <Button type="submit" />
    </Form>
  );
};
export default TagForm;
