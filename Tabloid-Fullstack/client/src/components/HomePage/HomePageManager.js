import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PostSummaryCard from '../PostSummaryCard';




const HomePageManager = () => {
    const [posts, setTopPosts] = useState([]);

    useEffect(() => {
        getTopPosts()
    }, [])


    //getTopPosts will be passed and called at the end to refresh
    const getTopPosts = () => {
        fetch("/api/homepage")
            .then((res) => res.json())
            .then((posts) => {
                setTopPosts(posts)
            });
    }
    return (
        <Container>
            <Row>
                <Col><h1>Welcome back!</h1></Col>
            </Row>
            <Row>
                <Col xs="2"> <h4>Our Recent Authors</h4></Col>
                <Col xs="10" >
                    <h2>Most Recent Posts</h2>
                    {posts.map((post) => {
                        return <PostSummaryCard post={post} />
                    })}
                </Col>


            </Row>
        </Container >
    )

}
export default HomePageManager;