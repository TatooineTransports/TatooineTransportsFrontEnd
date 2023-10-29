import { auth } from "./firebaseSetup";
import axios from 'axios';

const url = "https://23c6-35-229-53-249.ngrok-free.ap";

const signUpValidation = async (data: any) => {
    try {
        const response = axios.post(
            url + "/validUser",
            data
        );
        const valid = await response;
        return valid;
    } catch (error) {
        console.log("Nope");
        console.log(error);
    }
}

export const createNewAccount = async (data:
    {
        uid: string,
        userName: string,
        phoneNum: string,
        email: string,
        favorites: string[],
        balance: number
    }) => {
    try {
        const result = await signUpValidation(data);
        if (result) {
            await auth.createUserWithEmailAndPassword(
                (document.getElementById('emailInput') as HTMLInputElement).value,
                (document.getElementById('passwordInput') as HTMLInputElement).value
            ).then(function (userCredential) {
                data.uid = userCredential.user?.uid!;

                axios.post(
                    url + "/user/User",
                    data
                )
            });
            auth.onAuthStateChanged(function(user) {
                if(user) {
                  window.open("/home", '_self');
                } else {
                  window.open("/", '_self');
                }
              })
        } else {
            console.log("Sign Up info: " + result + "already exists")
        }
    } catch (error) {
        console.error(error);
    }
};

export const emailPassSignIn = async (email : string, pass : string) => {
    try {
      await auth.signInWithEmailAndPassword( email, pass );
      auth.onAuthStateChanged(function(user) {
        if(user) {
          window.open("/home", '_self');
        } else {
          window.open("/", '_self');
        }
      })
      
    } catch (error) {
      console.error(error);
    }
  };