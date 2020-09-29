import React, { Component } from "react";
import { Connect } from "react-redux";
import "../../../Components/NewFeed/PostEditModal/PostEditModal";
import "./PostEditContainer.scss";

class PostEditContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postEdit: {
                editing: false,
                postContent: this.props.post.content,
            },
        };
    }
}
