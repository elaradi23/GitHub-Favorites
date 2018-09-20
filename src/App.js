import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: [],
      favs: []
    };
  }

  componentDidMount() {
    this.searchRepositories();
  }

  searchRepositories = search => {
    const query = `{
      search(query: shopify, type: REPOSITORY, first: 10) {
        edges {
          node {
            ... on Repository {
              id
              nameWithOwner
              url
              primaryLanguage {
                name
              }
              tags: refs(refPrefix: "refs/tags/", last: 1) {
                edges {
                  tag: node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }`;

    fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer 942a7dd991ce48117fe510b30572fe4eb8eafe18`
      }
    })
      .then(res => res.text())
      .then(body => {
        let repos = [];
        for (var _repo of JSON.parse(body).data.search.edges) {
          let repo = {
            id: _repo.node["id"],
            name: _repo.node["nameWithOwner"],
            language: _repo.node["primaryLanguage"]["name"],
            url: _repo.node["url"]
          };
          if (_repo.node["tags"]["edges"][0]) {
            repo["version"] = _repo.node["tags"]["edges"][0]["tag"]["name"];
          }
          repos.push(repo);
        }
        console.log(repos);
        this.setState({ repos: repos });
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
