import React, { Component, Fragment } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: [],
      favs: []
    };
  }

  componentDidMount() {
    this.searchRepositories("shopify");
  }

  searchRepositories = search => {
    const query = `{
      search(query: ${search}, type: REPOSITORY, first: 10) {
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

  render() {
    const repos = this.state.search.map(repo => {
      return (
        <Fragment>
          <tr>
            <td>{repo.name}</td>
            <td>{repo.language}</td>
            <td>{repo.latest_tag}</td>
          </tr>
        </Fragment>
      );
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" ref={input => (this.input = input)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <table style={{ "text-align": "left", margin: "10px" }}>
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
      </div>
    );
  }
}
export default Search;
