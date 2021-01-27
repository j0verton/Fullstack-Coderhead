import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import formatDate from "../../utils/dateFormatter";

const AuthorCard = ({ author }) => {
    return (
        <div>
            <Card>
                <CardImg top width="100%" src={author.imageLocation} alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5">{author.displayName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Member since: {formatDate(author.createDateTime)}</CardSubtitle>
                </CardBody>
            </Card>
        </div>
    );
}

export default AuthorCard;