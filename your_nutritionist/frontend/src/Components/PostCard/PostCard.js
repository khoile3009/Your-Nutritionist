import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PostCardMedia from "./PostCardMedia.js";
import "./PostCard.scss";

const PostCard = (props) => {
    console.log(props);
    return (
        <div className="postcard-wrapper">
            <Container className="postcard card shadow">
                <Row>
                    <Col xs="auto" className="post-profile-pic-wrapper">
                        <div className="post-porfile-pic" style={{ backgroundImage: "url('" + props.post_info.authorpic + "')" }}></div>
                    </Col>
                    <Col className="post-content-wrapper">
                        <div className="post-content"></div>
                    </Col>
                    <Row>
                        <Col className="post-media-wrapper">
                            <PostCardMedia></PostCardMedia>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </div>
    );
};

export default PostCard;
