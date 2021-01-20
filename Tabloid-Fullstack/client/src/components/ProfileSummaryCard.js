import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import formatDate from "../utils/dateFormatter";
import "./PostSummaryCard.css";

const PostSummaryCard = ({ profile, pendingStatus }) => {
    return (
        <Card >
            {/* <CardImg top width="50px" src={`${profile.imageLocation}`} alt="avatar" /> */}
            <CardBody>
                <CardTitle tag="h5">{profile.displayName}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Role: {profile.userType.name}</CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Name: {profile.firstName} {profile.lastName}</CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Created on: {formatDate(profile.createDateTime)}</CardSubtitle>
                <button>Change Status</button>

            </CardBody>
        </Card >
    );
};

export default PostSummaryCard;
