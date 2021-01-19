import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";


export const CommentForm = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const { postId } = useParams()

    const addComment = (comment) => {
        return getToken().then((token) =>
            fetch('/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(comment)
            })
        )
            .then(res => res.json());
    }


    const submit = (e) => {
        const comment = {
            subject,
            content,
            postId
        };
        console.log(comment)
        addComment(comment)
    }

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    type="text"
                                    onChange={(e) => setSubject(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Content</Label>
                                <textarea
                                    id="content"
                                    onChange={(e) => setContent(e.target.value)}
                                >Enter Comment</textarea>
                            </FormGroup>

                        </Form>
                        <Button color="info" onClick={submit}>
                            SUBMIT
            </Button>
                    </CardBody>
                </Card>
            </div>


        </div>

    )

}