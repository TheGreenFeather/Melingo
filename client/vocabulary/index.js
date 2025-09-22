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


    const docRef = doc(db, "melingo", "XcpiNViYDzwmoVGNrIFH");
    const docSnap = await getDoc(docRef);

    const q = query(collection(db, "unit"))
    let id = []                         //title == description in firebase
                                        // id == title in firebase
    let title = []
    let k = 0;

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    id.push(doc.id);
    title.push(doc.data().title);
    k+=1;
    });
    console.log(id);
    console.log(title)

    const set = docSnap.data().set
    const date = docSnap.data().date
    // const add = document.getElementById("add")

var MyDate = new Date();
var MyDateString;
    
    MyDate.setDate(MyDate.getDate());
    
    MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
                 + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
                 + MyDate.getFullYear();
    // console.log(MyDateString);

let lastset = document.getElementById("set")
let lastdate = document.getElementById("date")

let displaySet =   `Last set learned: ${set}`
let displayDate =   `Last set learned: ${date}`

lastset.innerText = displaySet
lastdate.innerText = displayDate


const container = document.getElementById("container")
const button = document.querySelectorAll(".unit button")

console.log(button);

const pop_up = document.getElementById("pop-up")
const add = document.getElementById("add-pop-up")
const cancel = document.getElementById("cancel-pop-up")


// const 

// let button_container = []
const card = document.getElementById("card_container")
const add_card = document.querySelector(".add-cards-footer button")
card.innerHTML += `<div class="single-card"><div class="word"><input type="text" name="Vocab" id="word1" class="text" placeholder="Word" required><label for="word1" class="text_lable">Word <span>*</span></label></div><div class="meaning"><input type="text" name="Meaning" id="meaning1" class="text" placeholder="Meaning" required><label for="meaning1" class="text_lable">Meaning <span>*</span></label></div><div class="single-card-footer"></div><button>⊖ Remove card</button></div></div>` + `<div class="single-card"><div class="word"><input type="text" name="Vocab" id="word1" class="text" placeholder="Word" required><label for="word1" class="text_lable">Word <span>*</span></label></div><div class="meaning"><input type="text" name="Meaning" id="meaning1" class="text" placeholder="Meaning" required><label for="meaning1" class="text_lable">Meaning <span>*</span></label></div><div class="single-card-footer"></div><button>⊖ Remove card</button></div></div>`
let wordID = 2
let meaningID = 2

let vocab = []

function AddVocab(){
    wordID+=1
    meaningID+=1
    card.innerHTML +=`<div class="single-card"><div class="word"><input type="text" name="Vocab" id="word${wordID}" class="text" placeholder="Word" required><label for="word${wordID}" class="text_lable">Word <span>*</span></label></div><div class="meaning"><input type="text" name="Meaning" id="meaning1" class="text" placeholder="Meaning" required><label for="meaning1" class="text_lable">Meaning <span>*</span></label></div><div class="single-card-footer"></div><button>⊖ Remove card</button></div></div>`
}




async function DisplayCard(){
    for(let i = 0; i<id.length;i++){
        container.innerHTML+= `<div class="unit"><h2>${id[i]}</h2><h3>${title[i]}</h3><button>STUDY SET</button></div>`;
    }


    document.getElementById("add").addEventListener("click", showPopUp);

}

add.addEventListener("click", AddCard);
cancel.addEventListener("click", cancelPopUp);

// AddCard()

// add card tạo thẻ r cần j div

function showPopUp(){
    pop_up.style.display = "flex";
}

function cancelPopUp(){
    pop_up.style.display = "none";
    add.disabled = false;
}



async function AddCard(){
    add.disabled = true;
    const title = document.getElementById("card_title").value;
    // const description = document.getElementById("card_description").value;
    k+=1;

    console.log("hello")
    await setDoc(doc(db,"unit",`Unit${k}`),{
        data:[],
        title: title
    })

    container.innerHTML+= `<div class="unit"><h2>${`Unit${k}`}</h2><h3>${title}</h3><button>STUDY SET</button></div>`;

    // k+=1;

    document.getElementById("add").addEventListener("click", showPopUp);
    cancelPopUp();
}

DisplayCard();

