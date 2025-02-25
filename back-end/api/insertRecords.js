import { artistArray } from "../../front-end/src/assets/database/artists.js";
import { songsArray } from "../../front-end/src/assets/database/songs.js";
import { db } from "./connect.js";

// currentObj --> os objetos, elementos, campos (ex.: image, name etc)
// { ...currentObj }  --> todos os campos
const newArtistArray = artistArray.map((currentObj) => {
    const newArtistObj = {...currentObj};
    delete newArtistObj.id;
    return newArtistObj;
});

const newSongsArray = songsArray.map((currentObj) => {
    const newSongObj = {...currentObj};
    delete newSongObj.id;
    return newSongObj;
});

const responseSongs = await db.collection('songs').insertMany(newSongsArray);
const responseArtists = await db.collection('artists').insertMany(newArtistArray);

console.log(responseSongs);
console.log(responseArtists);