var user_pool = {}

function addNewUser(userObject) {
    if (!user_pool[userObject.email]) {
        user_pool[userObject.email] = userObject;
    } else {
        return false;
    }
    return true;
}

function updateUser(loginId, field, data) {
    if (user_pool[loginId]) {
        user_pool[loginId][field] = data;
    } else {
        return false;
    }
    return true;
}

function getUser(loginId) {
    if (user_pool[loginId]) {
        return user_pool[loginId];
    } else {
        return null;
    }
}

module.exports = {
    addNewUser,
    updateUser,
    getUser
}

