import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CardHeader } from "reactstrap";

export const CommentList = ({ postComments }) => {
    return (
        <div className="float-left">
            {postComments.map((postComment) => (
                <Card key={postComment.id} className="col-sm-12 col-lg-6">
                    <CardHeader>{postComment.Subject}</CardHeader>
                    <CardBody>
                        {postComment.Content}
                    </CardBody>
                    <Button color="info" onClick={ }>
                        Delete
            </Button>
                    <Button color="info" onClick={ }>
                        Edit
            </Button>

                </Card>
            ))}
        </div>
    );

}
