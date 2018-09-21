import React, { Component, Fragment } from "react";
import Search from "./Search";
import Favorites from "./Favorites";
import "bootstrap/dist/css/bootstrap.css";
// import { Button, Grid, Row, Col } from "react-bootstrap/lib";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favs: []
    };
  }

  addToFavorites(repo) {
    this.setState({ favs: [...this.state.favs, repo] });
  }

  removeFromFavorites(repo) {
    let temp_favs = this.state.favs;
    temp_favs.splice(
      temp_favs.findIndex(function(i) {
        return i.id === repo.id;
      }),
      1
    );
    this.setState({ favs: temp_favs });
  }

  render() {
    return (
      <Fragment>
        <header className="App-header">
          <h1 className="App-title">My Github Favorites</h1>
        </header>
        <div class="split left">
          <Search
            favs={this.state.favs}
            addToFavorites={this.addToFavorites.bind(this)}
          />
        </div>
        <div class="split right">
          <Favorites
            favs={this.state.favs}
            removeFromFavorites={this.removeFromFavorites.bind(this)}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
