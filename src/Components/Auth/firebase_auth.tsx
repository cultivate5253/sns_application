import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {

}

firebase.initializeApp(firebaseConfig);


const email
const password
const displayName
const avater


firebase
    .auth()
    .createUserWithWmailAndPassword(email,password)  //emailとpasswordで、userを作成し、そのuserを返す（thenの引数に渡される）
    .then((user) =>{
        user.updateProfile({
            displayName:
            photoURL:

        })
    })
    .then(((=>{
        console.log("success")
    }))
    .catch((error) =>{
        console.log(error)
    })



const auth = firebase.auth();
const emailaddress 

auth 
    .sendPasswordResetEmail(email)
    .then(()=> {
        console.log("success")
    }
    })


const googleProvider = new firebase.auth.GogleAuthProvider();


firebase
  .auth()
  .signInWithPopup(googleProvider)
  .then((result) => {
    console.log("Googleアカウント認証に成功しました。");
  })
  .catch((error) => {
    console.error(error);
  });