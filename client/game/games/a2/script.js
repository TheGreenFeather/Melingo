


import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'
// import {artist_name,song_name} from "./script.js"

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js'
import { getFirestore,collection,setDoc,doc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js'

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

// import {getId} from "./pass.js"   //Problems here help me






                    

                    let artist = document.getElementById("artist")
                    let song = document.getElementById("song")
                    let search = document.getElementById("search_btn_wrapper")

                    let display_music = document.getElementById("container")

                    // import {lyrics_list} from "./list.js"

                    // const play_button = document.querySelectorAll(".lyrics_box button")
                   

                    // console.log(lyrics_list)
                    let id= []

                    lyrics_list.forEach(track => {
                        display_music.innerHTML+=`<div class="lyrics_box"><h2>${track.song}</h2><h4>${track.artist}</h4><div class="thumbnail"></div><button id="${track.song}/${track.artist}" >PLAY THIS SONG</button></div>`
                        id.push(`${track.song}/${track.artist}`)
                    });


                    for (const pressed of id){
                        const press = document.getElementById(`${pressed}`)
                        press.addEventListener("click",()=>{PassInfo(getId(pressed)[0],getId(pressed)[1])})
                    }

                    

                    


                
                    // Lyrics
                    // const lyrics1 = document.getElementById("play_lyrics1")
                    // const lyrics2 = document.getElementById("play_lyrics2")
                    // const lyrics3 = document.getElementById("play_lyrics3")
                    // const lyrics4 = document.getElementById("play_lyrics4")
                    // const lyrics5 = document.getElementById("play_lyrics5")
                    // const lyrics6 = document.getElementById("play_lyrics6")
                    // const lyrics7 = document.getElementById("play_lyrics7")
                    // const lyrics8 = document.getElementById("play_lyrics8")
                
                    // lyrics1.addEventListener("click",async() => {await PassInfo("ed sheeran","shape of you")})
                    // lyrics2.addEventListener("click",async() => { await PassInfo("bruno mars","the lazy song")})
                    // lyrics3.addEventListener("click",async() => { await PassInfo("julie fowlis","touch the sky")})
                    // lyrics4.addEventListener("click",async() => { await PassInfo("mandy moore","i see the light")})
                    // lyrics5.addEventListener("click",async() => { await PassInfo("alessia cara","how far i'll go")})
                    // lyrics6.addEventListener("click",async() => { await PassInfo("verna hills","wheels on the bus")})
                    // lyrics7.addEventListener("click",async() => { await PassInfo("charles bradlee","the abc song")})
    
    

                    async function PassInfo(artist,song){
                        // Add a new document in collection "cities"
                        console.log(artist,song);
                        await setDoc(doc(db, "melingo", "8RF5lgZ4WezxHJMCGriD"), {
                            artist: artist,
                            song:song
                        });
                        // console.log(1);
                        location.replace('/client/game/games/a2/displayLyrics/index.html');
                    }