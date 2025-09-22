import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js'
import { getFirestore,collection,setDoc,doc,getDoc,query,getDocs,addDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js'

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
const db = getFirestore(app)


const docRef = doc(db, "timer", "setTime");
const docSnap = await getDoc(docRef);

const time = docSnap.data().time
const timeSet = docSnap.data().timeSet

setInterval(()=>{
let date = new Date()
let h = date.getHours()
let m = date.getMinutes()
let s = date.getSeconds()
let ampm = "AM"

if (h>=12){
h=h-12
ampm = "PM"
}

h = h == 0 ? h = 12 : h

h = h < 10 ? "0" + h : h
m = m < 10 ? "0" + m : m
s = s < 10 ? "0" + s : s

const now= `${h}:${m} ${ampm}`

},1000)

if(timeSet){
if(time === now){

    // Phát cảnh báo ở đây nha @NguyenVuong

}
}