var ownIdDataString;

function onSubmitRegister(userData) {
    const user = {loginId: userData.email.value, password: userData.password.value, ownIdData: ownIdDataString};
    registerUser(user)
        .then(data => {
            if (data.created) {
                window.location.href = "../index.html";
            } else {
                alert(data.error);
            }
        })
        .catch(error => console.error('Error:', error))
}

function onSubmitLogin(userData) {
    const user = {loginId: userData.email.value, password: userData.password.value};
    loginUser(user)
        .then(data => {
            if (data.logged) {
                window.location.href = 'pages/account.html';
            }
            else {
                alert(data.error);
            }
        })
        .catch(error => alert(error))
}