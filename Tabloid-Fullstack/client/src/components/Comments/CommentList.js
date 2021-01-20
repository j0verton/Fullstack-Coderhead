import React from "react";
import { CommentCard } from "./Comment";


export const CommentList = ({ getPost, postComments }) => {
    return (
        <div>
            {postComments.map((postComment) => (
                <CommentCard comment={postComment} getPost={getPost} />
            ))}
        </div>
    );

}
