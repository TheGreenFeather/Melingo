import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js'
import { getFirestore,collection,getDoc,doc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js'

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

const docRef = doc(db, "melingo", "8RF5lgZ4WezxHJMCGriD");
const docSnap = await getDoc(docRef);

const artist_ele = docSnap.data().artist
const song_ele = docSnap.data().song
const score_ele = document.getElementById("score")
const compliment_ele = document.getElementById("compliment")
const check = document.getElementById("checkans")

const lyrics = document.getElementById("lyrics")

const name = document.getElementById('name-display')
const artist = document.getElementById('artist-display')
const capitalize = (str, lower = false) =>
(lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

name.innerHTML = capitalize(song_ele)
artist.innerHTML = capitalize(artist_ele)
$.ajax({
    type: 'POST',
    url: './lib/lyrics.py',
});

let miss_text = {};
function displayLyrics (){
miss_text = miss(
    //result,20
    
);

//i will do the vocab when u finish you can go help me then
// peace and love
// fuck
// :<<<<
// i mean fuck is make love :))))))))))))))))
// ohh my :)) peace and love tình yêu và nc đái
//:))))

lyrics.innerHTML = "<p>" + miss_text.text + "</p>";
console.log(artist_ele, song_ele);
}




function miss(lyrics, times) {
let words = lyrics.replaceAll(",", " ,").replaceAll(".", " .").split(" ");
let correct_words = {};
for (let i = 0; i < Math.min(times, words.length); i++) {
    let randomIndex = Math.floor(Math.random() * words.length);
    while (
    words[randomIndex].includes(
        '<input type="text" name="missing_word" class="missing'
    ) ||
    words[randomIndex] =='<br>' ||
    words[randomIndex] == "," ||
    words[randomIndex] == "." ||
    words[randomIndex] == ''
    ) {
    randomIndex = Math.floor(Math.random() * words.length);
    }
    correct_words[`missing_${i}`] = words[randomIndex];
    words[
    randomIndex
    ] = `<input type="text" name="missing_word" class="missing" id="missing_${i}" maxlength="${words[randomIndex].length}" size="${words[randomIndex].length}">`;
}
return {
    text: words.join(" ").replaceAll(" ,", ",").replaceAll(" .", "."),
    correct_words: correct_words,
};
}

displayLyrics()

function CheckAnswer(){
    let score = 0;
    for (const key in miss_text.correct_words) {
        if (Object.hasOwnProperty.call(miss_text.correct_words, key)) {
            const correct_word = miss_text.correct_words[key];
            const input_text = document.getElementById(key);
            if (input_text.value == "") {
                input_text.style.borderColor = "#1A4E88";
            } else if (input_text.value == correct_word) {
                input_text.style.borderColor = "#1fb25a";
                score+=1;
            } else {
                input_text.style.borderColor = "red";
            }
        }
    }

    score_ele.innerHTML= `${score}/20`

    if(score >=10){
        compliment_ele.innerHTML = "GOOD JOB"
    }
    else{
        compliment_ele.innerHTML="GREAT"
    }
}

check.addEventListener("click",CheckAnswer)