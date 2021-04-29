# SongDataBass
## Setup
### Setup Client
1. Download and open the project.
2. CD into app/server and run "npm install":
```
$ cd app/server
$ npm install
```
3. CD into app/client and run "npm intall"
```
$ cd app/client
$ npm install
```
4. Go to https://console.developers.google.com/project to make an API key for YouTube Data API v3.
5. Create a ".env" file in the client folder.
```
$ touch .env
```
6. In the .env file, input your API key in <your key> (from the Google developer console) and save file.
```
REACT_APP_YOUTUBE_API_KEY=<your key>
```
  - If you'll be adding more API keys, prepend "REACT_APP_" to the name of your API key variable so React can access it without any problems.
___
### Setup Cassandra Server
1. Assuming Cassandra is installed on your local machine: start Cassandra server.
  - If you're having trouble installing Cassandra on Mac OS, follow: [Install Cassandra on Mac OS](https://medium.com/@manishyadavv/how-to-install-cassandra-on-mac-os-d9338fcfcba4)
  - Ensure that you're using Java v1.8.0_*
    ```
    $ export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_282`
    ```
2. Create keyspace: songs
```
CREATE KEYSPACE songs WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': '3'}  AND durable_writes = true;
```
3. Create Tables: data and data2. Copy and Paste the CQLSH commands
```
CREATE TABLE songs.data (artist_name text,title text,release text,song_id ascii,year int,PRIMARY KEY (artist_name, title, release, song_id, year));
CREATE INDEX data_title_idx ON songs.data (title);
CREATE TABLE songs.data2 (title text,artist_name text,release text,song_id ascii,year int,PRIMARY KEY (title, artist_name, release, song_id, year);
)
```
4. Populate the tables with the csv files: artist_name.csv and title.csv for tables data and data2, respectively. CSV files are located in app/data. In CQLSH, prepend the full path of the CSV when doing COPY FROM.
```
COPY songs.data(artist_name, title, release, song_id, year) FROM 'artist_name.csv';
COPY songs.data2(title, artist_name, release, song_id, year) FROM 'title.csv';
```
5. To search data from other columns, create a table with the **primary key** of the desired query. For example, to create a table based on year:
```
CREATE TABLE songs.year (title text,artist_name text,release text,song_id ascii,year int,PRIMARY KEY (year, artist_name, release, song_id, title); // Table for year
COPY songs.data(year, artist_name, release, song_id, title) TO 'year.csv'; // CSV file ordered by year, artist_name, release, song_id, title since Cassandra organizes columns alphabetically
COPY songs.year(year, artist_name, release, song_id, title) FROM 'year.csv' // Populate the year table with the data from the csv file
```
You can change the names of the tables, but don't forget to change the names in the app/server/index.js Line 47 and 48 in mapper.forModel().

___
# Running on localhost
1. CD into app/server in one terminal window and app/client in another terminal window and run "yarn start":
```
$ cd app/server
$ yarn start
$ cd app/client
$ yarn start
```

2. To use the app, when the client opens up the window or go to localhost:3000:
   1. On the main page: Search by song names by typing in the text field, and presing the "Search Song" button.
   2. Select a song that comes up, and a Youtube video will start to automatically play the song.
   3. Navigate to the Artist page using the "Artist" button at the top.
   4. Search for an artist, and click on a song by the artist to play a Youtube video.
