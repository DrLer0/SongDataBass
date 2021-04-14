import express from 'express';
import bodyParser from 'body-parser';
import cassandra from 'cassandra-driver';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const PORT = process.env.PORT || 9042;

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
//   keyspace: 'test'
});

client.connect()
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

// client.on('log', (level, loggerName, message, furtherInfo) => {
//     console.log(`${level} - ${loggerName}:  ${message}`);
//     });

const query = `SELECT title FROM songs.data WHERE artist_name='Michael Jackson' LIMIT 10;`
// // const query = `CREATE KEYSPACE IF NOT EXISTS test WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy', 'datacenter1' : 3 }`;
// // const query = `CREATE TABLE test.users (key UUID PRIMARY KEY, name text, email text);`;
// // const query = `INSERT INTO test.users (key, name, email) VALUES (now(), 'someone', 'someone@jon.com');`;

client.execute(query)
    .then(result => console.log(result.rows[2]));

