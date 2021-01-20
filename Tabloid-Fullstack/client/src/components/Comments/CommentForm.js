import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
    CardHeader,
} from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";


export const CommentForm = ({ comment, GetPost }) => {
    const { getToken } = useContext(UserProfileContext)
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const { postId } = useParams()
    const history = useHistory()

    const addComment = (comment) => {
        return getToken().then((token) => {
            fetch('/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(comment)
            })
        }).then(() => GetPost())
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

    useEffect(() => {
        if (comment) {
            return getToken().then((token) => {
                fetch(`/api/comment/${comment.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}` // The token gets added to the Authorization header
                    }
                })
                    .then(data => {
                        setSubject(data.subject)
                        setContent(data.content)
                        setIsLoading(false)
                    })

            })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <Card className="mt-2">
            <CardHeader>Add A New Comment</CardHeader>
            <CardBody>
                <Form onSubmit={submit}>
                    <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input
                            id="subject"
                            type="text"
                            defaultValue={subject}
                            onChange={(e) => setSubject(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input type="textarea"
                            id="content"
                            onChange={(e) => setContent(e.target.value)}
                            defaultValue={content}
                            placeholder="Enter Comment"
                        />

                    </FormGroup>

                    <Button type="submit" color="info" size="sm">
                        SUBMIT
            </Button>
                </Form>
            </CardBody>
        </Card>


    )

}