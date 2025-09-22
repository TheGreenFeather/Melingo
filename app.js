const fs = require("fs");
const dotenv = require("dotenv");
const querystring = require("querystring");
const express = require("express");
const axios = require("axios");
var readline = require('readline');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;

dotenv.config();

var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '\\.credentials\\';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

const port = process.env.PORT || 3000;

const app = express();

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.get("/", (req, res) => {
  res.send(
    "<a href='https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        client_id: process.env.CLIENT_ID,
        response_type: "code",
        redirect_uri: process.env.REDIRECT_URI,
        scope: "user-read-private user-read-email",
        state: "So6NCs6RVzEojlZr",
      }) +
      "'>Authorize</a> " +
      "<a href='/get_categorized_tracks'>Get categorized tracks</a> " +
      "<a href='/filter_name_and_artist'>filter name and artist</a> " +
      "<a href='/get_artist_albums'>get artist albums</a> " +
      "<a href='/filter_id'>filter id</a> " +
      "<a href='/get_datas'>get datas</a> " +
      "<a href='/filter_with_video_id'>filter_with_video_id</a>"
  );
});

app.get("/callback", async (req, res) => {
  const spotifyResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify({
      grant_type: "authorization_code",
      code: req.query.code,
      redirect_uri: process.env.REDIRECT_URI,
    }),
    {
      headers: {
        Authorization: "Basic " + process.env.BASE64_AUTHORIZATION,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  console.log("Authorized!!");
  process.env.ACCESS_TOKEN = spotifyResponse.data["access_token"];
  process.env.REFRESH_TOKEN = spotifyResponse.data["refresh_token"];
  res.redirect("/");
});

app.get('/callbackyt', (req, res) => {
  console.log(req.query.code);
  res.redirect('/');
})

app.get("/filter_name_and_artist", (req, res) => {
  let categorized_tracks = JSON.parse(
    fs.readFileSync("categorized_tracks.json")
  );
  let tracks_datasbruh = JSON.parse(fs.readFileSync("spotify-tracks-2.json"));
  let filtered_name_and_artist = {
    happy: [],
    excited: [],
    alert: [],
    tense: [],
    angry: [],
    distressed: [],
    sad: [],
    depressed: [],
    bored: [],
    calm: [],
    relaxed: [],
    content: [],
  };

  for (const emotion in categorized_tracks) {
    if (Object.hasOwnProperty.call(categorized_tracks, emotion)) {
      const track_list = categorized_tracks[emotion];
      track_list.forEach((track_id) => {
        for (let i = 0; i < tracks_datasbruh.length; i++) {
          if (tracks_datasbruh[i].id == track_id) {
            filtered_name_and_artist[emotion].push(
              tracks_datasbruh[i].name +
                " - " +
                tracks_datasbruh[i].artists[0].name
            );
          }
        }
      });
    }
  }
  fs.writeFile(
    "filtered_name_and_artist.json",
    JSON.stringify(filtered_name_and_artist),
    (err) => {
      if (err) throw err;
      console.log("Done writing");
    }
  );
  res.send(filtered_name_and_artist);
});

app.get("/get_categorized_tracks", async (req, res) => {
  let tracks_datas = JSON.parse(fs.readFileSync("tracks_datas-2.json"));
  let categorized_tracks = {
    happy: [],
    excited: [],
    alert: [],
    tense: [],
    angry: [],
    distressed: [],
    sad: [],
    depressed: [],
    bored: [],
    calm: [],
    relaxed: [],
    content: [],
  };

  const emotion_list = [
    "happy",
    "excited",
    "alert",
    "tense",
    "angry",
    "distressed",
    "sad",
    "depressed",
    "bored",
    "calm",
    "relaxed",
    "content",
  ];

  for (const id in tracks_datas) {
    if (Object.hasOwnProperty.call(tracks_datas, id)) {
      const datas = tracks_datas[id];
      let emotion_id = -1;
      if (datas["arousal"] * 2 - 1 >= 0) {
        emotion_id = Math.floor(
          (Math.atan2(datas["arousal"] * 2 - 1, datas["valence"] * 2 - 1) * 6) /
            Math.PI
        );
      } else {
        emotion_id = Math.floor(
          ((Math.atan2(datas["arousal"] * 2 - 1, datas["valence"] * 2 - 1) +
            2 * Math.PI) *
            6) /
            Math.PI
        );
      }
      categorized_tracks[emotion_list[emotion_id]] =
        categorized_tracks[emotion_list[emotion_id]].concat(id);
    }
  }

  fs.writeFile(
    "categorized_tracks.json",
    JSON.stringify(categorized_tracks),
    (err) => {
      if (err) throw err;
      console.log("Done writing");
    }
  );
  res.send(categorized_tracks);
});

app.get("/filter_id", (req, res) => {
  fs.readFile("spotify-tracks-2.json", (err, data) => {
    const tracksjson = JSON.parse(data);
    // res.send(tracksjson);
    console.log(tracksjson.length);
    const tracksids = [];
    for (var i = tracksjson.length - 1; i >= 0; i--) {
      tracksids.push(tracksjson[i]["id"]);
    }
    res.send(tracksids);
    fs.writeFile(
      "spotify-tracks-ids-2.json",
      JSON.stringify(tracksids),
      (err) => {
        if (err) throw err;
        console.log("Done writing"); // Success
      }
    );
  });
});

app.get("/get_datas", async (req, res) => {
  let tracks_ids = JSON.parse(fs.readFileSync("spotify-tracks-ids-2.json"));
  let tracks_datas = {};
  for (let i = 0; i < tracks_ids.length; i += 100) {
    let response = (
      await axios.get(
        `https://api.spotify.com/v1/audio-features?ids=${tracks_ids.slice(
          i,
          Math.min(100, tracks_ids.length - i)
        )}`,
        {
          headers: {
            Authorization: "Bearer " + process.env.ACCESS_TOKEN,
          },
        }
      )
    ).data.audio_features;
    for (let j = 0; j < response.length; j++) {
      tracks_datas[response[j].id] = {
        arousal: response[j].energy,
        valence: response[j].valence,
      };
    }
  }
  res.send(tracks_datas);
  fs.writeFile("tracks_datas-2.json", JSON.stringify(tracks_datas), (err) => {
    if (err) throw err;
    console.log("Done writing"); // Success
  });
});

// app.get('/get_artist_albums', async (req, res) =>{
// 	let response = (await axios.get(
// 		  'https://api.spotify.com/v1/artists/6eUKZXaKkcviH0Ku9w2n3V/albums?market=VN&limit=50',
// 		  {
// 		    headers: {
// 		      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
// 		    },
// 		  }
// 		)).data;
// 	let albums = response.items;
// 	while(response.next != null){
// 		await new Promise(resolve => setTimeout(resolve, 333));
// 		response = (await axios.get(
// 		  response.next,
// 		  {
// 		    headers: {
// 		      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
// 		    },
// 		  }
// 		)).data;
// 		console.log('bruh');
// 		albums = albums.concat(response.items);
// 	}
// 	console.log('get albums done!');
// 	let musics = [];
// 	for(var i = albums.length - 1; i >= 0; i--){
// 		await new Promise(resolve => setTimeout(resolve, 333));
// 		response = (await axios.get(
// 		  `https://api.spotify.com/v1/albums/${albums[i].id}/tracks?market=VN&limit=50`,
// 		  {
// 		    headers: {
// 		      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
// 		    },
// 		  }
// 		)).data;
// 		console.log('get tracks done!', response.next);
// 		musics = musics.concat(response.items);
// 		while(response.next != null){
// 			await new Promise(resolve => setTimeout(resolve, 333));
// 			response = (await axios.get(
// 				  response.next,
// 				  {
// 				    headers: {
// 				      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
// 				    },
// 				  }
// 				)).data;
// 			console.log('get subtracks done!');
// 			musics = musics.concat(response.items);
// 		}
// 	}
// 	console.log('get all tracks done!');
// 	res.send(musics);
// 	fs.writeFile("spotify-tracks.json", JSON.stringify(musics), err => {
// 	    if (err) throw err;
// 	    console.log("Done writing"); // Success
// 	});

// });

app.get("/get_artist_albums", async (req, res) => {
  // let response = (await axios.get(
  // 	  'https://api.spotify.com/v1/artists/6eUKZXaKkcviH0Ku9w2n3V/albums?market=VN&limit=50',
  // 	  {
  // 	    headers: {
  // 	      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
  // 	    },
  // 	  }
  // 	)).data;
  // let albums = response.items;
  // while(response.next != null){
  // 	await new Promise(resolve => setTimeout(resolve, 333));
  // 	response = (await axios.get(
  // 	  response.next,
  // 	  {
  // 	    headers: {
  // 	      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
  // 	    },
  // 	  }
  // 	)).data;
  // 	console.log('bruh');
  // 	albums = albums.concat(response.items);
  // }
  let albums = [
    "32iAEBstCjauDhyKpGjTuq",
    "3T4tUhGYeRNVUGevb0wThu",
    "1xn54DMo2qIqBuMqHtUsFd",
    "5LXOgcszGvUkYzYL4v6wYg",
  ];
  console.log("get albums done!");
  let musics = [];
  for (var i = albums.length - 1; i >= 0; i--) {
    await new Promise((resolve) => setTimeout(resolve, 333));
    response = (
      await axios.get(
        `https://api.spotify.com/v1/albums/${albums[i]}/tracks?market=VN&limit=50`,
        {
          headers: {
            Authorization: "Bearer " + process.env.ACCESS_TOKEN,
          },
        }
      )
    ).data;
    console.log("get tracks done!", response.next);
    musics = musics.concat(response.items);
    while (response.next != null) {
      await new Promise((resolve) => setTimeout(resolve, 333));
      response = (
        await axios.get(response.next, {
          headers: {
            Authorization: "Bearer " + process.env.ACCESS_TOKEN,
          },
        })
      ).data;
      console.log("get subtracks done!");
      musics = musics.concat(response.items);
    }
  }
  console.log("get all tracks done!");
  res.send(musics);
  fs.writeFile("spotify-tracks-2.json", JSON.stringify(musics), (err) => {
    if (err) throw err;
    console.log("Done writing"); // Success
  });
});




var auth2c;
let categorized_videos = {
  happy: [],
  excited: [],
  alert: [],
  tense: [],
  angry: [],
  distressed: [],
  sad: [],
  depressed: [],
  bored: [],
  calm: [],
  relaxed: [],
  content: []
};
app.get('/filter_with_video_id', (req, res) => {
  fs.readFile('client_secret.json', async function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the YouTube API.
    authorize(JSON.parse(content));
    await new Promise(resolve => setTimeout(resolve, 30000));
    fs.readFile('filtered_name_and_artist.json', async (error, data) => {
      if (error) throw error;
      let categorized_tracks = JSON.parse(data);
      for (const emotion in categorized_tracks) {
        if (Object.hasOwnProperty.call(categorized_tracks, emotion)) {
          const music_names = categorized_tracks[emotion];
          for (let index = 0; index < music_names.length; index++) {
            const name = music_names[index];
            getVideo(auth2c, name, emotion);
            console.log('nice');
            await new Promise(resolve => setTimeout(resolve, 125));
          }
        }
      }
      await new Promise(resolve => setTimeout(resolve, 3000));
      res.send(categorized_videos)
      fs.writeFile("categorized_videos.json", JSON.stringify(categorized_videos), (err) => {
        if (err) throw err;
        console.log("Done writing"); // Success
      });
    });
  });
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = credentials.web.redirect_uris[0];
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      return getNewToken(oauth2Client);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      auth2c = oauth2Client;
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      console.log('bruh');
      // storeToken(token);
      auth2c = oauth2Client;
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getVideo(auth, keyword, emotion) {
  var service = google.youtube('v3');
  service.search.list({
    auth: auth,
    part: 'snippet',
    q: keyword,
    type: 'video',
    maxResults: 1,
    safeSearch: 'strict'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    categorized_videos[emotion].push({
      'video': response.data.items[0].id.videoId,
      'thumbnail': response.data.items[0].snippet.thumbnails.default.url,
      'title': response.data.items[0].snippet.title,
      'channel': response.data.items[0].snippet.channelTitle
    });
  });
}