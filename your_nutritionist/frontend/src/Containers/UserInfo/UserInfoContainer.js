import React, {
    Component
} from 'react'
import axios from '../../axios-orders';
import UserInfo from '../../Components/UserInfo/UserInfo'
import {
    connect
} from 'react-redux';

import * as actions from '../../store/actions/index';
import ProfilePicModal from '../../Components/ProfilePicModal/ProfilePicModal';

class UserInfoContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            following: false,
            modal: 0,
            url: '',
            file: null,
            headlineEdit: {
                editing: false,
                headline: this.props.user_info.headline
            }
        }
        this.checkFollowing = this.checkFollowing.bind(this)
        this.follow = this.follow.bind(this)
        this.unfollow = this.unfollow.bind(this)

        this.showProfilePicForm = this.showProfilePicForm.bind(this)
        this.changeProfilePicFormType = this.changeProfilePicFormType.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.urlChangeHandler = this.urlChangeHandler.bind(this)
        this.resetProfilePicInput = this.resetProfilePicInput.bind(this)
        this.fileChangeHandler = this.fileChangeHandler.bind(this)
        this.editHeadlineChangeHandler = this.editHeadlineChangeHandler.bind(this)
        this.startHeadlineEdit = this.startHeadlineEdit.bind(this)
        this.stopHeadlineEdit = this.stopHeadlineEdit.bind(this)
        this.submitHeadline = this.submitHeadline.bind(this)
        this.submitProfilePic = this.submitProfilePic.bind(this)
    }


    componentDidMount = () => {

        this.checkFollowing()
    }

    showProfilePicForm = () => {
        this.resetProfilePicInput()
        this.setState({
            modal: 1
        })
    }

    changeProfilePicFormType = (event) => {
        event.preventDefault()
        this.resetProfilePicInput()
        this.setState({
            modal: -this.state.modal
        })
    }

    hideModal = () => {
        this.setState({
            modal: 0,
            uploading: false
        })
    }

    urlChangeHandler = (event) => {
        this.setState({
            url: event.target.value
        })
    }

    fileChangeHandler = (event) => {
        if (event.target.files && event.target.files.length !== 0) {
            this.setState({
                file: event.target.files[0],
                file_title: event.target.files[0].name
            })
        }
    }

    submitProfilePic = (event) => {
        event.preventDefault();
        this.setState({uploading: true})
        let data = new FormData()
        data.append('url', this.state.url)
        data.append('image_0', this.state.file)
        axios.put('api/user/profilepic', data, {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Authorization': 'Token ' + this.props.token
                }
            })
            .then((response) => {
                this.props.updateProfilePic(response.data.url)
                this.hideModal()
            })
    }


    resetProfilePicInput = () => {
        this.setState({
            url: '',
            file: null,
            file_title: ''
        })
    }

    editHeadlineChangeHandler = (event) => {
        this.setState({headlineEdit: {...this.state.headlineEdit, headline: event.target.value}})
    }

    startHeadlineEdit = () => {
        this.setState({headlineEdit: {editing: true, headline: this.props.user_info.headline}})
    }

    stopHeadlineEdit = () => {
        this.setState({headlineEdit: {...this.state.headlineEdit, editing: false}})
    }

    submitHeadline = (event) => {
        event.preventDefault()
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.props.token
        }
        axios.put('api/user/headline', {headline: this.state.headlineEdit.headline}, {
            headers: headers
        }). then((response) => {
            this.props.updateHeadline(response.data.headline)
            this.stopHeadlineEdit()
        })
    }
    checkFollowing = () => {
        if (this.props.token) {
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.props.token
            }
            axios.get('api/user/' + this.props.userId + '/isfollowing', {
                    headers: headers
                })
                .then(
                    (response) => {
                        this.setState({
                            following: response.data.following
                        })

                    }
                )
                .catch(
                    (err) => {}
                )
        }

    }

    follow = () => {
        if (this.props.token) {
            let data = null
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.props.token
            }
            let url = 'api/user/' + this.props.userId + '/follow';
            axios.post(url, data, {
                    headers: headers
                })
                .then(response => {
                    console.log(response)
                    this.setState({
                        following: true
                    })
                })
                .catch(err => {
                    console.log(err)
                })

        } else {
            this.props.showSigninRequiredModal()
        }
    }

    unfollow = () => {
        let data = null
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.props.token
        }
        let url = 'api/user/' + this.props.userId + '/follow';
        axios.delete(url, {
                headers: headers
            })
            .then(response => {
                console.log(response)
                this.setState({
                    following: false
                })
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        return this.props.user_info ?
            < >
            <ProfilePicModal
        modal = {
            this.state.modal
        }
        hideModal = {
            this.hideModal
        }
        changeProfilePicFormType = {
            this.changeProfilePicFormType
        }
        urlChangeHandler = {
            this.urlChangeHandler
        }
        fileChangeHandler = {
            this.fileChangeHandler
        }
        submitProfilePic = {
            this.submitProfilePic
        }
        url = {
            this.state.url
        }
        file_title = {
            this.state.file_title
        }
        uploading={this.state.uploading}
        />

        <UserInfo
        user_info = {
            this.props.user_info
        }
        following = {
            this.state.following
        }
        follow = {
            this.follow
        }
        unfollow = {
            this.unfollow
        }
        isSelf = {
            this.props.id === this.props.userId
        }
        logged_in = {
            (this.props.id)
        }
        showProfileEditForm = {
                this.showProfilePicForm
            }
        headlineEdit = {this.state.headlineEdit}
        editHeadlineChangeHandler = {this.editHeadlineChangeHandler}
        startHeadlineEdit = {this.startHeadlineEdit}
        stopHeadlineEdit = {this.stopHeadlineEdit}
        submitHeadline = {this.submitHeadline}
            /> 
        </>
        : null
    }

}



const mapStateToProps = state => {
    return {
        token: state.auth.token,
        id: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showSigninRequiredModal: () => dispatch(actions.showSigninRequiredModal()),
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(UserInfoContainer)