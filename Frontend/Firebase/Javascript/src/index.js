import {
    signInWithCustomToken,
    getIdToken,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {initializeApp} from "firebase/app";
  ((o,w,n,i,d)=>{o[i]=o[i]||(async(...a)=>((o[i].q=o[i].q||[]).push(a),{error:null,data:null})),
  (d=w.createElement("script")).src='https://cdn.dev.ownid.com/sdk/'+n,d.async=1,w.head.appendChild(d)})
  (window,document,'{app_id}','ownid');
  // TODO: add your app id here from your OwnID console app (you can use your snippet) https://console.ownid.com/
const firebaseConfig = {
    //Firebase config goes here
};
initializeApp(firebaseConfig);
ownid('init', {
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