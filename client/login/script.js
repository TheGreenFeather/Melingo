
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js'
// import { getFirestore,collection,setDoc,doc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js'
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDshsATIzdV48PSItUv0ePHJIaB2RwAEyA",
    authDomain: "weatherforecast-184a2.firebaseapp.com",
    databaseURL: "https://weatherforecast-184a2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "weatherforecast-184a2",
    storageBucket: "weatherforecast-184a2.appspot.com",
    messagingSenderId: "842320066215",
    appId: "1:842320066215:web:40d1eac20f905293640d82",
    measurementId: "G-17Q4Q5XKGB"
    };

    // Initialize Firebase


    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    let password = document.getElementById("password_input");
    let email = document.getElementById("username_imput");



    const auth = getAuth();
    const login = document.getElementById("login")

async function Login(email,password){
    await signInWithEmailAndPassword(auth, email+"@gmail.com", password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        // console.log(user)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
    });
}

login.addEventListener("click", async()=> await Login(email.value , password.value ))