import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCpvoN8Jc5VjMdYGv5Zi6148SkFgCQeefA",
    authDomain: "tatooine-transports.firebaseapp.com",
    projectId: "tatooine-transports",
    storageBucket: "tatooine-transports.appspot.com",
    messagingSenderId: "286049108243",
    appId: "1:286049108243:web:d92c8a4e36d317d1c3dae6"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();