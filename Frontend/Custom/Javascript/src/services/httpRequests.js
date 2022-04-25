const API_URL = 'http://localhost:3002/'

function registerUser(bodyData) {
    return httpPostRequest('users/register',bodyData)
}

function loginUser(bodyData) {
    return httpPostRequest('users/login',bodyData);
}

function  httpPostRequest(route,bodyData) {
    return fetch(API_URL + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
    }).then(response => response.json());
}