import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    CardFooter,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export const CommentCard = (comment, getPost) => {
    const [pendingDelete, setPendingDelete] = useState(false);
    const [user, setUser] = useState()
    const { getCurrentUser, getToken } = useContext(UserProfileContext)
    const [isEditing, setIsEditing] = useState(false)

    const Delete = (comment) => {
        getToken().then(token => {
            return fetch(`/api/comment/${comment.id}`, {
                metohd: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            })
                .then(() => {
                    setPendingDelete(false);
                    getPost();
                })
        }

        )
    }

    // const editComment =() => {
    //     setIsEditing(true);
    //     set
    // }
    useEffect(() => {
        console.log(comment)
        setUser(getCurrentUser())
        console.log("user", user)
    }, [])

    return (


        <Card key={comment.id} className="mt-2">
            <CardHeader>{comment.subject}</CardHeader>
            <CardBody>
                {comment.content}
            </CardBody>
            {comment.userProfileId === user.id ?

                <CardFooter className="row">

                    <Button color="info" size="sm"
                    // onClick={ }
                    >
                        Delete
                    </Button>
                    <Button color="info" size="sm"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button>
                </CardFooter> : null
            }
            <Modal isOpen={pendingDelete}>
                <ModalHeader>Delete {comment.subject}?</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this comment? This action cannot be
                    undone.
        </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                    <Button
                        className="btn btn-outline-danger"
                        onClick={(e) => Delete(comment)}
                    >
                        Yes, Delete
          </Button>
                </ModalFooter>
            </Modal>

        </Card>
    )
} 