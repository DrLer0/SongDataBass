import axios from "axios";

export default {
  // Gets songs
  getSongs: function(song) {
    return axios.get("http://localhost:9042/songs/"+song);
  },
  // Gets artist
  getArtist: function(artist) {
    return axios.get("http://localhost:9042/artist/" + artist);
  }
};
