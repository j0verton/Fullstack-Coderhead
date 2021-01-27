import React from 'react'
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Link
} from 'reactstrap';
import formatDate from "../../utils/dateFormatter";

const AuthorCard = ({ author }) => {
    return (
        <div>
            <Card border="none" style={{ width: '11rem', border: 'none' }}>
                {author.imageLocation ? <CardImg top width="100%" src={author.imageLocation} alt="Card image cap" />
                    : <CardImg top width="100%" src="https://static.thenounproject.com/png/1485884-200.png" alt="Card image cap" />}
                <CardBody>
                    <CardTitle tag="h5">{author.displayName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Member since: {formatDate(author.createDateTime)}</CardSubtitle>
                </CardBody>
            </Card>
        </div>
    );
}

export default AuthorCard;