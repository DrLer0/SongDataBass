import express from 'express';
import bodyParser from 'body-parser';
import cassandra from 'cassandra-driver';
import cors from 'cors';

import songRoutes from './routes/songs.js';
import artistRoutes from './routes/artist.js';


const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

app.use('/songs', songRoutes);
app.use('/artist', artistRoutes);

const PORT = process.env.PORT || 9042;

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'songs'
});

client.connect()
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

    const Mapper = cassandra.mapping.Mapper;

const mapper = new Mapper(client, {
    models: {'Songs': {
      tables: ['data'],
      columns: {
        'song_id': 'SongID',
        'artist_name': 'ArtistName',
        'release': 'Release',
        'title': 'Title',
        'year': 'Year'
      }
    }}
  })
const artistMapper = mapper.forModel('data');
const songsMapper = mapper.forModel('data2');

export {
  songsMapper,
  artistMapper
};
