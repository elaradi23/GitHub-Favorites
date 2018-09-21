import React, { Component, Fragment } from "react";
import "./Search.css";
import { Button } from "react-bootstrap/lib";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: []
    };
  }

  searchRepositories = e => {
    e.preventDefault();
    const query = `{
      search(query: ${this.input.value}, type: REPOSITORY, first: 10) {
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
        for (var r of JSON.parse(body).data.search.edges) {
          let repo = {
            id: r.node["id"],
            name: r.node["nameWithOwner"],
            language: r.node["primaryLanguage"]["name"],
            url: r.node["url"]
          };
          if (r.node["tags"]["edges"][0]) {
            repo["latest_tag"] = r.node["tags"]["edges"][0]["tag"]["name"];
          }
          repos.push(repo);
        }
        console.log(repos);
        this.setState({ search: repos });
      })
      .catch(error => console.error(error));
  };

  addToFavorites = repo => {
    this.props.addToFavorites(repo);
  };

  existsInFavorites = repo => {
    return this.props.favs.some(fav_repo => {
      return fav_repo.id === repo.id;
    });
  };

  render() {
    const repos = this.state.search.map(repo => {
      return (
        <Fragment>
          <tr>
            <td>
              <a href={repo.url}>{repo.name}</a>
            </td>
            <td>{repo.language}</td>
            <td>{repo.latest_tag}</td>
            {!this.existsInFavorites(repo) && (
              <td>
                <a
                  className="Search-Add"
                  onClick={() => this.addToFavorites(repo)}
                >
                  Add
                </a>
              </td>
            )}
          </tr>
        </Fragment>
      );
    });
    return (
      <Fragment>
        <form
          className="input-group"
          onSubmit={this.searchRepositories.bind(this)}
        >
          <input
            className="Search-Bar form-control col"
            type="text"
            ref={input => (this.input = input)}
          />
          <Button className="Search-Button" type="submit">
            Search
          </Button>
        </form>
        {this.state.search.length === 0 ? (
          <p className="Search-No-Results">No Results</p>
        ) : (
          <table className="Search-Table">
            <thead>
              <td>
                <strong>Name</strong>
              </td>
              <td>
                <strong>Language</strong>
              </td>
              <td>
                <strong>Latest Tag</strong>
              </td>
            </thead>
            <tbody>{repos}</tbody>
          </table>
        )}
      </Fragment>
    );
  }
}
export default Search;
