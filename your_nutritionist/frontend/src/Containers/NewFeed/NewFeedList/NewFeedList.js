import React, { Component } from "react";
import NewFeedCard from "../../../Components/NewFeed/NewFeedCard";
import { Link, withRouter } from "react-router-dom";

class NewFeedList extends Component {
    constructor(props) {
        super(props);
        this.toCreator = this.toCreator.bind(this);
    }

    toCreator = (creator_id, event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.history.push("/user/" + creator_id);
    };

    render() {
        let fakeNewFeed = [
            {
                user_id: 1,
                username: "HA",
                profilepic:
                    "https://storage.googleapis.com/your-nutritionist-cdn/rushia-placeholder.jpg",
                content:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                likes: 69420,
                comments: 690,
                medias: [1, 2, 3, 4, 5],
            },
            {
                user_id: 2,
                username: "HAN",
                profilepic:
                    "https://storage.googleapis.com/your-nutritionist-cdn/rushia-placeholder.jpg",
                content:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                likes: 69420,
                comments: 690,
                medias: [1, 2, 3, 4, 5],
            },
            {
                user_id: 3,
                username: "HANG",
                profilepic:
                    "https://storage.googleapis.com/your-nutritionist-cdn/rushia-placeholder.jpg",
                content:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                likes: 69420,
                comments: 690,
                medias: [1, 2, 3, 4, 5],
            },
        ];
        return fakeNewFeed.map((post, index) => {
            return (
                <NewFeedCard
                    post={post}
                    toCreator={(event) => {
                        this.toCreator(post.user_id, event);
                    }}
                />
            );
        });
    }
}

export default withRouter(NewFeedList);
