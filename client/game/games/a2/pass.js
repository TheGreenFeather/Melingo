let artist_name="";
let song_name="";
                        
function getId(btn){
    id = btn.split("/")
                        
    artist_name = id[1]
    song_name = id[0]
                        
    console.log(artist_name,song_name); //Can't log anything
    return([artist_name,song_name])
} 

// export{artist_name,song_name}

// export {getId}