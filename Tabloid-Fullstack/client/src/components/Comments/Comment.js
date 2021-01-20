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
} from "reactstrap";
export const CommentCard = (comment, getPost) => {

    const [user, setUser] = useState()
    const { getCurrentUser } = useContext(UserProfileContext)

    const [isEditing, setIsEditing] = useState(false)


    // const editComment =() => {
    //     setIsEditing(true);
    //     set
    // }
    useEffect(() => {
        setUser(getCurrentUser())
        console.log("user", user)
        console.table(comments)
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

        </Card>
    )
} 