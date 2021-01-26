import React, { useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap';




const HomePageManager = () => {

    return (
        <Container>
            <Row>
                <Col><h1>Welcome back!</h1></Col>
            </Row>
            <Row>
                <h2>Most Recent Posts</h2>
            </Row>
            <Row>
                <h2>A sample of our authors</h2>
            </Row>
        </Container >
    )

}
export default HomePageManager;