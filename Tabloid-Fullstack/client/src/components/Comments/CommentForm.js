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
        getToken().then((token) => {
            fetch('/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(comment)
            })
        })
        // .then(res => res.json());
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
                        <Input type="textarea"
                            id="content"
                            onChange={(e) => setContent(e.target.value)}
                        >Enter Comment</Input>
                    </FormGroup>

                </Form>
                <Button color="info" size="sm" onClick={submit}>
                    SUBMIT
            </Button>
            </CardBody>
        </Card>


    )

}