import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import youtube from "../utils/youtube"
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import YouTube from "react-youtube";

class Songs extends Component {
  state = {
    songs: [],
    title: "",
    videoID: "",
    display: "none"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.getSongs(this.state.title)
        .then(res => this.setState({ songs: res.data._rs.rows, title: ""}))
        .catch(err => console.log(err));
    }
  };

  getVideo = async (event) => {
    // console.log(event.target.innerHTML)
    const res = await youtube.get('/search', {
      params: {
        q: event.target.innerHTML
      }
    })
    .then(res => {
      this.setState({
        videoID: res.data.items[0].id.videoId,
        display: "block"});
      console.log(this.state.display);
    })
    .catch(err => console.log(err));
  };
  render() {
    const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <Container fluid>
        <Row>
          <Col size="lg-12">
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Song Title "
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search Song
              </FormBtn>
            </form>
            <div className="video" style={{display: this.state.display, marginBottom: 10}}>
            <YouTube
            videoId={this.state.videoID}
            containerClassName="embed embed-youtube"
            opts={opts}
            />
            </div>
          </Col>
          <Col size="lg-12 sm-12">
            <Jumbotron>
              <h1>Songs</h1>
            </Jumbotron>
            {this.state.songs.length ? (
              <List>
                {this.state.songs.map(song => (
                  <ListItem key={song.song_id}>
                    <div onClick={this.getVideo} >
                      <strong name="text">
                        {song.title} by {song.artist_name}
                      </strong>
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Songs;
