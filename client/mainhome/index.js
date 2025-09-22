const socket = io.connect('http://localhost:3000');

const webcam = document.getElementById('webcam')
const mood = document.getElementById('mood')

const videos = {
    "happy": [
        {
        "video": "7t3Re2VIbHE",
        "thumbnail": "https://i.ytimg.com/vi/7t3Re2VIbHE/default.jpg",
        "title": "Ed Sheeran - Bibia Be Ye Ye [Official Music Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "gaQcpCDX5wE",
        "thumbnail": "https://i.ytimg.com/vi/gaQcpCDX5wE/default.jpg",
        "title": "Ed Sheeran | F64 (Take It Back) [S3.EP51]: SBTV",
        "channel": "SBTV: Music"
        },
        {
        "video": "JGwWNGJdvx8",
        "thumbnail": "https://i.ytimg.com/vi/JGwWNGJdvx8/default.jpg",
        "title": "Ed Sheeran - Shape of You (Official Music Video)",
        "channel": "Ed Sheeran"
        },
        {
        "video": "omQ7l4EjJu8",
        "thumbnail": "https://i.ytimg.com/vi/omQ7l4EjJu8/default.jpg",
        "title": "Nina",
        "channel": "Ed Sheeran - Topic"
        },
        {
        "video": "tlYcUqEPN58",
        "thumbnail": "https://i.ytimg.com/vi/tlYcUqEPN58/default.jpg",
        "title": "Ed Sheeran - Sing [Official Music Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "3TqGEbROFd4",
        "thumbnail": "https://i.ytimg.com/vi/3TqGEbROFd4/default.jpg",
        "title": "Ed Sheeran - Don&#39;t [Official Audio]",
        "channel": "Ed Sheeran"
        }
    ],
    "excited": [
        {
        "video": "JATT-mgGiPQ",
        "thumbnail": "https://i.ytimg.com/vi/JATT-mgGiPQ/default.jpg",
        "title": "Ed Sheeran - Stop The Rain [Official Lyric Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "Z_MvkyuOJgk",
        "thumbnail": "https://i.ytimg.com/vi/Z_MvkyuOJgk/default.jpg",
        "title": "Ed Sheeran - 2step (feat. Lil Baby) - [Official Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "gbcGk-xYG_M",
        "thumbnail": "https://i.ytimg.com/vi/gbcGk-xYG_M/default.jpg",
        "title": "Ed Sheeran - Leave Your Life [Official Lyric Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "k6ZoE4RrcDs",
        "thumbnail": "https://i.ytimg.com/vi/k6ZoE4RrcDs/default.jpg",
        "title": "Ed Sheeran - Overpass Graffiti [Official Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "Il0S8BoucSA",
        "thumbnail": "https://i.ytimg.com/vi/Il0S8BoucSA/default.jpg",
        "title": "Ed Sheeran - Shivers [Official Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "VFlZXlfda6Y",
        "thumbnail": "https://i.ytimg.com/vi/VFlZXlfda6Y/default.jpg",
        "title": "Ed Sheeran - Nancy Mulligan [Official Audio]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "OVO4LhrOFiY",
        "thumbnail": "https://i.ytimg.com/vi/OVO4LhrOFiY/default.jpg",
        "title": "Ed Sheeran - Barcelona [Official Audio]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "EwzD8U4u76k",
        "thumbnail": "https://i.ytimg.com/vi/EwzD8U4u76k/default.jpg",
        "title": "Ed Sheeran - New Man [Official Audio]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "87gWaABqGYs",
        "thumbnail": "https://i.ytimg.com/vi/87gWaABqGYs/default.jpg",
        "title": "Ed Sheeran - Galway Girl [Official Music Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "OjGrcJ4lZCc",
        "thumbnail": "https://i.ytimg.com/vi/OjGrcJ4lZCc/default.jpg",
        "title": "Ed Sheeran - Eraser [Official Audio]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "xhI4w2GDXOI",
        "thumbnail": "https://i.ytimg.com/vi/xhI4w2GDXOI/default.jpg",
        "title": "Shirtsleeves",
        "channel": "Ed Sheeran - Topic"
        },
        {
        "video": "NpmQBfxtNyc",
        "thumbnail": "https://i.ytimg.com/vi/NpmQBfxtNyc/default.jpg",
        "title": "Ed Sheeran - The Day I Was Born (Official Lyric Video)",
        "channel": "Ed Sheeran"
        },
        {
        "video": "wUx3s8NMLcc",
        "thumbnail": "https://i.ytimg.com/vi/wUx3s8NMLcc/default.jpg",
        "title": "Ed Sheeran - Page (Official Lyric Video)",
        "channel": "Ed Sheeran"
        },
        {
        "video": "OJ_0hACuwfg",
        "thumbnail": "https://i.ytimg.com/vi/OJ_0hACuwfg/default.jpg",
        "title": "Ed Sheeran - American Town (Official Lyric Video)",
        "channel": "Ed Sheeran"
        }
    ],
    "alert": [
        {
        "video": "Ykq2qn1jjGk",
        "thumbnail": "https://i.ytimg.com/vi/Ykq2qn1jjGk/default.jpg",
        "title": "Ed Sheeran - Collide [Official Lyric Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "orJSJGHjBLI",
        "thumbnail": "https://i.ytimg.com/vi/orJSJGHjBLI/default.jpg",
        "title": "Ed Sheeran - Bad Habits [Official Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "CjcDSxRUY5g",
        "thumbnail": "https://i.ytimg.com/vi/CjcDSxRUY5g/default.jpg",
        "title": "The Man",
        "channel": "Ed Sheeran - Topic"
        },
        {
        "video": "gQX7XhHSLnU",
        "thumbnail": "https://i.ytimg.com/vi/gQX7XhHSLnU/default.jpg",
        "title": "Ed Sheeran - Midnight (Fan Created Music Video) [Japan]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "QF8wKLXyjcA",
        "thumbnail": "https://i.ytimg.com/vi/QF8wKLXyjcA/default.jpg",
        "title": "Ed Sheeran - That&#39;s On Me (Official Lyric Video)",
        "channel": "Ed Sheeran"
        },
        {
        "video": "BRxVbJmlTSo",
        "thumbnail": "https://i.ytimg.com/vi/BRxVbJmlTSo/default.jpg",
        "title": "Ed Sheeran - England (Official Lyric Video)",
        "channel": "Ed Sheeran"
        }
    ],
    "tense": [
        {
        "video": "mqjoCX4OU0w",
        "thumbnail": "https://i.ytimg.com/vi/mqjoCX4OU0w/default.jpg",
        "title": "Ed Sheeran - Be Right Now [Official Lyric Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "P_kRTqaD8Mc",
        "thumbnail": "https://i.ytimg.com/vi/P_kRTqaD8Mc/default.jpg",
        "title": "Ed Sheeran - Tides [Official Lyric Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "K0ibBPhiaG0",
        "thumbnail": "https://i.ytimg.com/vi/K0ibBPhiaG0/default.jpg",
        "title": "Ed Sheeran - Castle On The Hill [Official Music Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "0r00LHcejX0",
        "thumbnail": "https://i.ytimg.com/vi/0r00LHcejX0/default.jpg",
        "title": "Ed Sheeran - Plastic Bag (Official Lyric Video)",
        "channel": "Ed Sheeran"
        },
        {
        "video": "KsHZqgp8X8A",
        "thumbnail": "https://i.ytimg.com/vi/KsHZqgp8X8A/default.jpg",
        "title": "Ed Sheeran - Magical (Official Lyric Video)",
        "channel": "Ed Sheeran"
        }
    ],
    "angry": [
        {
        "video": "JznXx1Ns374",
        "thumbnail": "https://i.ytimg.com/vi/JznXx1Ns374/default.jpg",
        "title": "Ed Sheeran - Afire Love [Official Audio]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "enZQT7jgZaU",
        "thumbnail": "https://i.ytimg.com/vi/enZQT7jgZaU/default.jpg",
        "title": "Ed Sheeran - Amazing (Official Lyric Video)",
        "channel": "Ed Sheeran"
        }
    ],
    "distressed": [
        {
        "video": "wQpU_v2cH_w",
        "thumbnail": "https://i.ytimg.com/vi/wQpU_v2cH_w/default.jpg",
        "title": "Ed Sheeran - Love In Slow Motion [Official Lyric Video]",
        "channel": "Ed Sheeran"
        }
    ],
    "sad": [
        {
        "video": "t3CoEyYEf4A",
        "thumbnail": "https://i.ytimg.com/vi/t3CoEyYEf4A/default.jpg",
        "title": "Ed Sheeran - Visiting Hours [Official Performance Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "ZZMZiBCRX4c",
        "thumbnail": "https://i.ytimg.com/vi/ZZMZiBCRX4c/default.jpg",
        "title": "Ed Sheeran - How Would You Feel (Paean) [Official Audio]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "20pAJPNaAyw",
        "thumbnail": "https://i.ytimg.com/vi/20pAJPNaAyw/default.jpg",
        "title": "Ed Sheeran - Hearts Don&#39;t Break Round Here [Official Audio]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "iWZmdoY1aTE",
        "thumbnail": "https://i.ytimg.com/vi/iWZmdoY1aTE/default.jpg",
        "title": "Ed Sheeran - Happier (Official Music Video)",
        "channel": "Ed Sheeran"
        },
        {
        "video": "2Vv-BfVoq4g",
        "thumbnail": "https://i.ytimg.com/vi/2Vv-BfVoq4g/default.jpg",
        "title": "Ed Sheeran - Perfect (Official Music Video)",
        "channel": "Ed Sheeran"
        },
        {
        "video": "nSDgHBxUbVQ",
        "thumbnail": "https://i.ytimg.com/vi/nSDgHBxUbVQ/default.jpg",
        "title": "Ed Sheeran - Photograph (Official Music Video)",
        "channel": "Ed Sheeran"
        }
    ],
    "depressed": [
        {
        "video": "2qzcHLyv3N0",
        "thumbnail": "https://i.ytimg.com/vi/2qzcHLyv3N0/default.jpg",
        "title": "Ed Sheeran - The Joker And The Queen (feat. Taylor Swift) [Official Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "y6oryBG8xeQ",
        "thumbnail": "https://i.ytimg.com/vi/y6oryBG8xeQ/default.jpg",
        "title": "Ed Sheeran - First Times [Official Lyric Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "bIB8EWqCPrQ",
        "thumbnail": "https://i.ytimg.com/vi/bIB8EWqCPrQ/default.jpg",
        "title": "Ed Sheeran - Supermarket Flowers [Official Audio]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "mllXxyHTzfg",
        "thumbnail": "https://i.ytimg.com/vi/mllXxyHTzfg/default.jpg",
        "title": "The Hobbit: The Desolation of Smaug - Ed Sheeran &quot;I See Fire&quot; [HD]",
        "channel": "Warner Bros. Pictures"
        },
        {
        "video": "w4ziOS9Npgs",
        "thumbnail": "https://i.ytimg.com/vi/w4ziOS9Npgs/default.jpg",
        "title": "Ed Sheeran - Even My Dad Does Sometimes (Lyrics) 🎵",
        "channel": "DopeLyrics"
        },
        {
        "video": "W_nWQO6Uyfs",
        "thumbnail": "https://i.ytimg.com/vi/W_nWQO6Uyfs/default.jpg",
        "title": "Ed Sheeran - Tenerife Sea (Lyrics)",
        "channel": "DopeNetwork"
        },
        {
        "video": "-t2CR9qZRj0",
        "thumbnail": "https://i.ytimg.com/vi/-t2CR9qZRj0/default.jpg",
        "title": "Ed Sheeran - I&#39;m A Mess (x Acoustic Sessions)",
        "channel": "Ed Sheeran"
        },
        {
        "video": "Ix9NXVIbm2A",
        "thumbnail": "https://i.ytimg.com/vi/Ix9NXVIbm2A/default.jpg",
        "title": "Ed Sheeran - One [Official Music Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "eLfIS2FkWU4",
        "thumbnail": "https://i.ytimg.com/vi/eLfIS2FkWU4/default.jpg",
        "title": "Ed Sheeran - Head ▹ Heels (Official Lyric Video)",
        "channel": "Ed Sheeran"
        }
    ],
    "bored": [
        {
        "video": "qXM0JdAwabU",
        "thumbnail": "https://i.ytimg.com/vi/qXM0JdAwabU/default.jpg",
        "title": "Ed Sheeran - Save Myself [Official Audio]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "C54UkMr3Buk",
        "thumbnail": "https://i.ytimg.com/vi/C54UkMr3Buk/default.jpg",
        "title": "Ed Sheeran - When Will I Be Alright (Official Lyric Video)",
        "channel": "Ed Sheeran"
        },
        {
        "video": "0kGHRnOGVoE",
        "thumbnail": "https://i.ytimg.com/vi/0kGHRnOGVoE/default.jpg",
        "title": "Ed Sheeran - Blue (Official Lyric Video)",
        "channel": "Ed Sheeran"
        }
    ],
    "calm": [
        {
        "video": "Wv2rLZmbPMA",
        "thumbnail": "https://i.ytimg.com/vi/Wv2rLZmbPMA/default.jpg",
        "title": "Ed Sheeran - Dive [Official Audio]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "XIJHg1XWR7o",
        "thumbnail": "https://i.ytimg.com/vi/XIJHg1XWR7o/default.jpg",
        "title": "Ed Sheeran - Bloodstream [Official Audio]",
        "channel": "Ed Sheeran"
        }
    ],
    "relaxed": [
        {
        "video": "lagKeiqYKz8",
        "thumbnail": "https://i.ytimg.com/vi/lagKeiqYKz8/default.jpg",
        "title": "Ed Sheeran - Sandman [Official Lyric Video]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "lp-EO5I60KA",
        "thumbnail": "https://i.ytimg.com/vi/lp-EO5I60KA/default.jpg",
        "title": "Ed Sheeran - Thinking Out Loud (Official Music Video)",
        "channel": "Ed Sheeran"
        },
        {
        "video": "mo5361CqFGs",
        "thumbnail": "https://i.ytimg.com/vi/mo5361CqFGs/default.jpg",
        "title": "Ed Sheeran - Punchline (Official Lyric Video)",
        "channel": "Ed Sheeran"
        },
        {
        "video": "sTQJkkkWPZs",
        "thumbnail": "https://i.ytimg.com/vi/sTQJkkkWPZs/default.jpg",
        "title": "Ed Sheeran - Spring (Fan Created Music Video) [France]",
        "channel": "Ed Sheeran"
        }
    ],
    "content": [
        {
        "video": "6B9J3lEyffA",
        "thumbnail": "https://i.ytimg.com/vi/6B9J3lEyffA/default.jpg",
        "title": "Ed Sheeran - What Do I Know? [Official Audio]",
        "channel": "Ed Sheeran"
        },
        {
        "video": "G-WwNFgUCSM",
        "thumbnail": "https://i.ytimg.com/vi/G-WwNFgUCSM/default.jpg",
        "title": "Ed Sheeran - Runaway (Lyrics)",
        "channel": "Katherine DeLong"
        }
    ]
};

const recommendations = document.getElementById('recommendations');
const all_videos = document.getElementById('all_videos');
const video = document.getElementById('display_video');

function changeVideoSong(id){                 
    video.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}" title="Shape of you" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    console.log('bruh')
}

displayPlaylist();

function displayPlaylist() {
    let playlist = "";
    for (const emotion in videos) {
        if (Object.hasOwnProperty.call(videos, emotion)) {
            const video_list = videos[emotion];
            for (const video_thumbnail of video_list) {
                playlist += `<button onclick="changeVideoSong('${video_thumbnail['video']}')"><div class="video-list"><img src="${video_thumbnail['thumbnail']}" alt="beautiful"><div class="vid-info"><header class="title_thumbnail">${video_thumbnail['title']}</header><p>${video_thumbnail['channel']}</p></div></div></button>`;
            }
            
        }
    }
    all_videos.innerHTML = playlist;
}

function StartCapture() {
    navigator.getUserMedia(
        { video: {}},
        stream => webcam.srcObject = stream,
        err => console.error(err)
    )
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/client/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/client/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/client/models')
]).then(StartCapture);

// listening to the image event in index.js
// const faceapi = "dist/face-api.js";
let pre_distance = 1000;
let distance_sum = 0;
let measure_count = 0;
const threadhold = 0.45;
let ifChange = true;
webcam.addEventListener('play', ()=>{
    setInterval(async () => {
        const detection = await faceapi.detectSingleFace(webcam, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        if(detection){
            const resized_detection = faceapi.resizeResults(detection, {width: webcam.videoWidth, height: webcam.videoHeight});
            const left_eye = resized_detection.landmarks.positions[40];
            const right_eye = resized_detection.landmarks.positions[43];
            const lengthInPixel = Math.sqrt((left_eye.y-right_eye.y)*(left_eye.y-right_eye.y)+(left_eye.x-right_eye.x)*(left_eye.x-right_eye.x));
            let distance = 1278/lengthInPixel;
            if(distance>=pre_distance-threadhold&&distance<=pre_distance+threadhold){
                distance = (3*pre_distance + 2*distance)/5;
            }
            if(Math.round(distance)<20){
                showWarning("Warning","You're too close to the screen");
            }
            else if(Math.round(distance)>=20 && Math.round(pre_distance)<20){
                closeWarning();
            }

            pre_distance = distance
            console.log(distance);
            let likeliestEmotion = Object.keys(detection.expressions).reduce((a, b) => detection.expressions[a] > detection.expressions[b] ? a : b);
            if (likeliestEmotion=='disgusted'||likeliestEmotion=='fearful'){
                likeliestEmotion = "angry";
            } else if (likeliestEmotion=='surprised'){
                likeliestEmotion = "happy";
            } else if (likeliestEmotion=='neutral'){
                likeliestEmotion = "sad";
            }
            if(likeliestEmotion != mood.innerHTML && ifChange) {
                console.log('emotion changed');
                let playlist = "";
                let playlist_list = [];
                switch (likeliestEmotion) {
                    case "angry":
                        for (const video_thumbnail of videos['calm']) {
                            playlist += `<button onclick="changeVideoSong('${video_thumbnail['video']}')"><div class="video-list-recommend"><img src="${video_thumbnail['thumbnail']}" alt="beautiful"><div class="vid-info"><header class="title_thumbnail">${video_thumbnail['title']}</header><p>${video_thumbnail['channel']}</p></div></div></button>`;
                            playlist_list.push(video_thumbnail['video']);
                        }
                        for (const video_thumbnail of videos['relaxed']) {
                            playlist += `<button onclick="changeVideoSong('${video_thumbnail['video']}')"><div class="video-list-recommend"><img src="${video_thumbnail['thumbnail']}" alt="beautiful"><div class="vid-info"><header class="title_thumbnail">${video_thumbnail['title']}</header><p>${video_thumbnail['channel']}</p></div></div></button>`;
                            playlist_list.push(video_thumbnail['video']);
                        }
                        for (const video_thumbnail of videos['content']) {
                            playlist += `<button onclick="changeVideoSong('${video_thumbnail['video']}')"><div class="video-list-recommend"><img src="${video_thumbnail['thumbnail']}" alt="beautiful"><div class="vid-info"><header class="title_thumbnail">${video_thumbnail['title']}</header><p>${video_thumbnail['channel']}</p></div></div></button>`;
                            playlist_list.push(video_thumbnail['video']);
                        }
                        break;
                
                    case "happy":
                        for (const video_thumbnail of videos['alert']) {
                            playlist += `<button onclick="changeVideoSong('${video_thumbnail['video']}')"><div class="video-list-recommend"><img src="${video_thumbnail['thumbnail']}" alt="beautiful"><div class="vid-info"><header class="title_thumbnail">${video_thumbnail['title']}</header><p>${video_thumbnail['channel']}</p></div></div></button>`;
                            playlist_list.push(video_thumbnail['video']);
                        }
                        for (const video_thumbnail of videos['excited']) {
                            playlist += `<button onclick="changeVideoSong('${video_thumbnail['video']}')"><div class="video-list-recommend"><img src="${video_thumbnail['thumbnail']}" alt="beautiful"><div class="vid-info"><header class="title_thumbnail">${video_thumbnail['title']}</header><p>${video_thumbnail['channel']}</p></div></div></button>`;
                            playlist_list.push(video_thumbnail['video']);
                        }
                        break;
                    case "sad":
                        for (const video_thumbnail of videos['happy']) {
                            playlist += `<button onclick="changeVideoSong('${video_thumbnail['video']}')"><div class="video-list-recommend"><img src="${video_thumbnail['thumbnail']}" alt="beautiful"><div class="vid-info"><header class="title_thumbnail">${video_thumbnail['title']}</header><p>${video_thumbnail['channel']}</p></div></div></button>`;
                            playlist_list.push(video_thumbnail['video']);
                        }
                }
                showSuggestion("IS THE MUSIC SUITABLE?", "Yes, it is", "No, change", closeSuggestion, ()=>{
                    changeVideoSong(playlist_list[Math.floor(Math.random()*playlist_list.length)]);
                    closeSuggestion();
                });
                ifChange = false;
                setTimeout(()=>{ifChange = true}, 10000)
                recommendations.innerHTML = playlist;
                mood.innerHTML = likeliestEmotion;
            }
        }
        else{console.log('could not detect!!');}
    }, 1500);
});

setInterval(()=>{
    console.log("bruh");
    showWarning("WARNING","LET'S EXERCISE!");
    setTimeout(()=>{
        closeWarning();
    },5000)
},1800000)