import {
    signInWithCustomToken,
    getIdToken,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {initializeApp} from "firebase/app";
(function (w, d, s, u, o, e, p) {
    w[o] = w[o] || function () {
        return (w[o].q = w[o].q || []).push(arguments), Promise.resolve({error: null, data: null})
    },
        e = d.createElement(s), p = d.getElementsByTagName(s)[0];
    e.src = u;
    e.async = 1;
    p.parentNode.insertBefore(e, p)
})(window, document, 'script', 'https://cdn.ownid.com/js/firebase.sdk.js', 'ownid');
const firebaseConfig = {
    //Firebase config goes here
};
initializeApp(firebaseConfig);
ownid('init', {
    appId: '{app_id}',
    firebaseAuth: {getAuth, getIdToken, signInWithCustomToken},
})

export function logout() {
    signOut(getAuth())
        .then(()=> window.location.href = '../index.html')
        .catch(e=>alert(e));
}

export async function onRegisterSubmit(formData) {
    //Call your existing firebase register function
    createUserWithEmailAndPassword(getAuth(), formData.email.value, formData.password.value)
        .then(async () => {
            window.location.href = '../index.html';
            //Enroll device with OwnID
            await ownid('enrollDevice');
        }).catch(e => alert(e));
    return false;
}

export async function onLoginSubmit(formData) {
    signInWithEmailAndPassword(getAuth(), formData.email.value, formData.password.value)
        .then(() => window.location.href = 'pages/account.html')
        .catch(e => alert(e));
    return false;
}