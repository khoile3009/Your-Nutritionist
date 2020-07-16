import React from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import './UserInfo.css'

const UserInfo = (props) => {
    console.log(props)
    return <>
        <Row>
            <Col>
                <div className='user-head'>
                    <div 
                        className='profile-pic shadow '
                        style={{backgroundImage:"url('" + props.user_info.profilepic+"')"}}
                    >
                        {props.logged_in && props.isSelf 
                        ? <div className="editable" onClick={props.showProfileEditForm}>
                        </div>
                        :null
                        }   
                    </div>
                    <div className='user-info'>
                        <div>
                            <p className='title'>{props.user_info.name}</p>
                            <p className='subtitle'>@{props.user_info.username}</p>
                            {
                                props.headlineEdit.editing 
                                ? <>
                                <Form onSubmit={props.submitHeadline}>
                                    <Form.Control value={props.headlineEdit.headline} onChange={props.editHeadlineChangeHandler}></Form.Control>
                                    <Button type='submit'>Edit</Button>
                                    <Button variant='secondary' onClick={props.stopHeadlineEdit}>Cancel</Button>
                                </Form>
                                </>
                                :<>
                                <Row className="headline-wrapper">
                                    <Col className='headline'>{props.user_info.headline}{props.logged_in && props.isSelf ? (<Button onClick={props.startHeadlineEdit} className="edit-headline-btn">&nbsp;<i class="material-icons">edit</i></Button>) : null}</Col>
                                </Row>
                                </>
                            }
                            
                            {console.log(props.user_info)}
                            {(props.logged_in &&!props.isSelf)
                                ?
                                props.following == false
                                    ? <Button className="follow-btn" onClick={props.follow}>Follow</Button>
                                    : <Button className="following-btn" onClick={props.unfollow}>Following</Button>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </Col>

        </Row >
        




    </>



}

export default UserInfo;