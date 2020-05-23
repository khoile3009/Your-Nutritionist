import axios from '../../axios-orders';

export const follow = (targetId, token) => {
    return dispatch => {
        let data = null
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
        let url = 'api/user/' + targetId + '/follow';
        axios.post(url, data, { headers: headers })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const unfollow = (targetId, token) => {
    return dispatch => {
        let data = null
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
        let url = 'api/user/' + targetId + '/follow';
        axios.delete(url, data, { headers: headers })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

// export const 
