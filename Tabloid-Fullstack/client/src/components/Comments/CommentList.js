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
import { UserProfileContext } from "../../providers/UserProfileProvider";


export const CommentList = ({ postComments }) => {
    const { getCurrentUser } = useContext(UserProfileContext)
    const [user, setUser] = useState()

    useEffect(() => {
        setUser(getCurrentUser())
        console.log("user", user)
        console.table(postComments)
    }, [])

    return (
        <div>
            {postComments.map((postComment) => (
                <Card key={postComment.id} className="mt-2">
                    <CardHeader>{postComment.subject}</CardHeader>
                    <CardBody>
                        {postComment.content}
                    </CardBody>
                    { postComment.userId === user.id ?

                        <CardFooter className="row">

                            <Button color="info" size="sm"
                            // onClick={ }
                            >
                                Delete
                        </Button>
                            <Button color="info" size="sm"
                            // onClick={ }
                            >
                                Edit
                        </Button>
                        </CardFooter> : null
                    }

                </Card>
            ))}
        </div>
    );

}
