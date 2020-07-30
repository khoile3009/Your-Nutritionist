import React,{Component} from 'react'
import CommentCard from '../CommentCard/CommentCard'
import './CommentList.css'
class CommentList extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return <div className='comment-list'>
            {
                this.props.comments.map(
                    (comment,index) => {
                        return <CommentCard comment={comment}/>
                    }
                )
            }
        </div>
        
    }
}

export default CommentList;