const { useState } = require("react");
const {
  InputGroup,
  Input,
  ButtonGroup,
  Button,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} = require("reactstrap");

const ShowTag = ({ tag }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [tagEdits, setTagEdits] = useState("");
  const showEditForm = (_) => {
    setIsEditing(true);
    setTagEdits(tag.name);
  };
  const hideEditForm = (_) => {
    setIsEditing(false);
    setTagEdits("");
  };
  return (
    <div className="justify-content-between row">
      {isEditing ? (
        <Form className="w-100">
          <InputGroup>
            <Input
              size="sm"
              onChange={(e) => setTagEdits(e.target.value)}
              value={tagEdits}
            />
            <ButtonGroup size="sm">
              <Button onClick={showEditForm}>Save</Button>
              <Button outline color="danger" onClick={hideEditForm}>
                Cancel
              </Button>
            </ButtonGroup>
          </InputGroup>
        </Form>
      ) : (
        <>
          <div className="p-1">{tag.name}</div>
          <ButtonGroup size="sm">
            <Button className="btn btn-primary" onClick={showEditForm}>
              Edit
            </Button>
            <Button
              className="btn btn-danger"
              onClick={(e) => setPendingDelete(true)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </>
      )}
      <Modal isOpen={pendingDelete}>
        <ModalHeader>Delete {tag.name}?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this category? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
          <Button className="btn btn-outline-danger">Yes, Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ShowTag;
