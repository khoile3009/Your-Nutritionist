import React, {Component} from 'react'
import './CommentCard.css'
class CommentCard extends Component {
    
    // - sample data --------------------
    // "comment_id": 5,
    //         "content": "new",
    //         "profilepic": "https://storage.googleapis.com/mediastorage-cookery/1/275289.jpg?Expires=253402300799&GoogleAccessId=owner-766%40cookery-281115.iam.gserviceaccount.com&Signature=QAysahHuzlNbxWzUGtX8%2Btq%2FFp2wqy0oty3aiDt9xUVRy9QklEZcN94imDJwgpKlSCLmwhVJgZhyGTVgAV4%2FPuB2f2ppQxGWSKxS5ZdQKNP6XOzSsLV%2F3gwwynYTzISlGgyzyuuECX5pdjI5Ao%2FrNb9UPQD71ivyXWzWN02GVAqcBxlfmjT5iqzd1oK%2F09sB7Spfag%2FxAHhgrtZs0bNdUZXh7ow3aT3Vx9rXqg4Zc9UuwTQy2%2BMgmCH90LwasogGp4VLmlBXSzTJnwFv%2BSKoFGWGqq4hPWlXiSciGKVHD1SMk8qlqspOh95dpSbGaJSNyg3kToXbqIjmKSm396FAzg%3D%3D",
    //         "username": "khoibaka",
    //         "fullname": "Khoi Le",
    //         "commented_at": "2020-07-29T18:21:53.743Z",
    //         "user_id": 1
    // --------------------------------
    render() {
        return <div className='comment-box'>
            <hr></hr>
            {this.props.comment.content}
        </div>
    }
}

export default CommentCard