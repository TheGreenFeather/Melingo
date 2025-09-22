import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
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



    // timer

const selectorMenu = document.querySelectorAll("select")
const content = document.querySelector(".content")
const currentTime = document.querySelector("h1")
const setAlarmButton = document.getElementById("setalarm")


let alarmTime, isAlarmSet = false
let ringtone = new Audio("/assets/Ringtone/ringtone.mp3")

for (let i = 12; i > 0; i--){
    i = i <10? "0" + i : i
    let option = `<option value="${i}">${i}</option>`
    selectorMenu[0].firstElementChild.insertAdjacentHTML("afterend",option)
}

for (let i = 59; i >= 0; i--){
    i = i <10? "0" + i : i
    let option = `<option value="${i}">${i}</option>`
    selectorMenu[1].firstElementChild.insertAdjacentHTML("afterend",option)
}

for (let i = 2  ; i > 0; i--){
    let apm = i ==  1 ? "AM" : "PM"
    let option = `<option value="${apm}">${apm}</option>`
    selectorMenu[2].firstElementChild.insertAdjacentHTML("afterend",option)
}

let H
let M 
let AMPM


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

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`

    if(alarmTime == `${h}:${m} ${ampm}`){
        ringtone.play()
        ringtone.loop = true
        
        // setAlarmButton.innerText = "Set Alarm"
        // return isAlarmSet = truef
    }

    H = h 
    M = m 
    AMPM = ampm
},1000)

async function setAlarm(){
    

    if(isAlarmSet){
       //  console.log("hello")
        alarmTime=""
        ringtone.loop = false
        ringtone.pause()
        content.classList.remove("disable")
        setAlarmButton.innerHTML = "Set Alarm"

        await setDoc(docRef,{
            time: `00:00`,
            timeSet: false
        })

        return isAlarmSet = false 
    }
    let time = `${selectorMenu[0].value}:${selectorMenu[1].value} ${selectorMenu[2].value}`

    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Please, set a valid time to set Alarm")
    }

    isAlarmSet = true
    alarmTime = time




        await setDoc(docRef,{
            time: `${H}:${M}:${AMPM}`,
            timeSet: true
        })

    console.log(isAlarmSet)

    content.classList.add("disable")
    setAlarmButton.innerHTML = "Clear Alarm"
}

setAlarmButton.addEventListener("click", setAlarm)
