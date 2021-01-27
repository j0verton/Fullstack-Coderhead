import React, { useEffect, useState } from 'react';
import { Container, Row, Col, CardDeck } from 'reactstrap';
import PostSummaryCard from '../PostSummaryCard';
import AuthorCard from './AuthorCard'




const HomePageManager = () => {
    const [posts, setRecentPosts] = useState([]);
    const [authors, setRecentAuthors] = useState([]);

    useEffect(() => {
        getRecentAuthors()
        getRecentPosts()
    }, [])


    //getRecentPosts will be passed and called at the end to refresh
    const getRecentPosts = () => {
        fetch("/api/homepage/recentPosts")
            .then((res) => res.json())
            .then((posts) => {
                setRecentPosts(posts)
            });
    }
    //
    const getRecentAuthors = () => {
        fetch("/api/homepage/recentAuthors")
            .then((res) => res.json())
            .then((authors) => {
                setRecentAuthors(authors)
            });
    }

    console.log(authors)
    return (
        <Container fluid={true}>
            <Row>
                <Col xs="6" >
                    <h2>Most Recent Posts</h2>
                    {posts.map((post) => {
                        return <PostSummaryCard post={post} />
                    })}
                </Col>
                <Col xs="1"></Col>
                <Col xs="4"> <h4>Our Recent Authors</h4>
                    <CardDeck>
                        {
                            authors.map((author) => {
                                return <AuthorCard author={author} />
                            })
                        }
                    </CardDeck>
                </Col>
                <Col xs="1"></Col>
            </Row>
        </Container >
    )

}
export default HomePageManager;