import axios from "axios";

const { NODE_ENV } = process.env;
const URL = ( NODE_ENV === "development" ? "http://localhost:3000" : "" );
const responseArtists = await axios.get(URL + '/api/artists');
const responseSongs = await axios.get(URL + '/api/songs');

export const artistArray = responseArtists.data;
export const songsArray = responseSongs.data;
