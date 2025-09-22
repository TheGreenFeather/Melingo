import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js'
import { getFirestore,collection,setDoc,doc,getDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js'

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


    const docRef = doc(db, "melingo", "XcpiNViYDzwmoVGNrIFH");
    const docSnap = await getDoc(docRef);

    const set = docSnap.data().set
    const title = docSnap.data().title

let setTitle = document.getElementById("title")
setTitle.innerText = `${set}: ${title}`

// vocabularies
const vocabRef = doc(db, "unit", set);
const vocabSnap = await getDoc(vocabRef)

const dt = vocabSnap.data().data
const data = dt
console.log(data);

// console.log(data)
// let t = []


// const data = [
//     {vocab:"Melingo",meaning:"Web App học Tiếng Anh"},
//     {vocab:"Melody",meaning:"Giai điệu"},
//     {vocab:"English",meaning:"Tieensg Anh"},
//     {vocab:"Lovely",meaning:"Đáng yêu"},
//     {vocab:"Independence",meaning:"Độc lập"},
//     {vocab:"Notable",meaning:"Nổi bật"},
//     {vocab:"Gainful",meaning:"Có lợi,mang lại lợi ích"}
// ]



let i = 0
const next = document.getElementById("next")
const back = document.getElementById("back")

const vocabularies = document.getElementById("vocab")
const meanings = document.getElementById("meaning")

let number = document.getElementById("number")
number.innerText =`${i+1}/${data.length}`
function Next(){
    i+=1
    if(i>=data.length){
        i=0
    }
    number.innerText = `${i+1}/${data.length}`
    vocabularies.innerText = data[i].vocab
    meanings.innerText = data[i].meaning
}

function Back(){
    i-=1
    if(i<0){
        i = data.length-1
    }
    number.innerText = `${i+1}/${data.length}`
    vocabularies.innerText = data[i].vocab
    meanings.innerText = data[i].meaning
}

next.addEventListener("click", ()=>{Next()})
back.addEventListener("click", ()=>{Back()})