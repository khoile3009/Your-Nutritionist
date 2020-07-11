import React,{Component} from 'react'
import {Button} from 'react-bootstrap'
import './SigninRequiredForm.css'
const SigninRequiredForm = (props) => {
    return <div className='center'>
            <Button variant="primary" onClick={props.showSigninModal}>
                Sign in
            </Button>
            <Button variant="primary" onClick={props.showRegisterModal}>
                Register
            </Button>
    </div>
}

export default SigninRequiredForm