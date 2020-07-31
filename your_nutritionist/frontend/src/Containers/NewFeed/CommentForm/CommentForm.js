import React, {Component} from 'react'
import {Form, InputGroup, Button, FormControl} from 'react-bootstrap'

class CommentForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            comment: ''
        }
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    onChangeHandler = (event) => {
        this.setState({comment: event.target.value})
    }

    render(){
        return <div className='comment-form'>
            <Form onSubmit={(event)=>{this.props.submitComment(event,this.state.comment)}}>
                <InputGroup>          
                    <FormControl placeholder='Write a comment...' as='textarea' rows='2' name='comment' value={this.state.comment} onChange={this.onChangeHandler}/>
                    <InputGroup.Append>
                        <Button type='submit' variant='primary'>Submit</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        </div>;
    }
}

export default CommentForm;