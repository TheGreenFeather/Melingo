// const dotenv = require('dotenv');
// const querystring = require('node:querystring');
// const fs = require('fs');
const express = require('express');
const { createServer } = require("http");
const { Server } = require('socket.io');

const port = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
  
// Creating get request simple route
app.use(express.static(__dirname));

httpServer.listen(port, () => {
	console.log('server is running at', httpServer.address().port);
});

  
// Using setInterval to read the image every one second. 

// setInterval(()=>{ 
  
    // Reading image from video capture device 
    // const frame = wCap.read(); 
  
    // Encoding the image with base64. 
    // const image = cv.imencode('.jpg', frame).toString('base64');
    // io.emit('image', image); 
// }, 5000) 



// app.listen(port, () => {
// 	console.log(`Listening on port ${port}...`);
// });

