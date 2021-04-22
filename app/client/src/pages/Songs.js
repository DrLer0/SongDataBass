import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Songs extends Component {
  state = {
    songs: [],
    title: ""
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

  render() {
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
          </Col>
          <Col size="lg-12 sm-12">
            <Jumbotron>
              <h1>Songs</h1>
            </Jumbotron>
            {this.state.songs.length ? (
              <List>
                {this.state.songs.map(song => (
                  <ListItem key={song._id}>
                    <Link to={"/songs/" + song.song_id}>
                      <strong>
                        {song.title} by {song.artist_name}
                      </strong>
                    </Link>
                    {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
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
