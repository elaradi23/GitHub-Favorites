import React, { Component, Fragment } from "react";
import "./Favorites.css";

class Favorites extends Component {
  removeFromFavorites = repo => {
    this.props.removeFromFavorites(repo);
  };

  render() {
    const favs = this.props.favs.map(repo => {
      return (
        <Fragment>
          <tr>
            <td>{repo.name}</td>
            <td>{repo.language}</td>
            <td>{repo.latest_tag}</td>
            <td>
              <a
                className="Favorites-Remove"
                onClick={() => this.removeFromFavorites(repo)}
              >
                Remove
              </a>
            </td>
          </tr>
        </Fragment>
      );
    });
    return (
      <div>
        <table className="Favorites-Table">
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
          <tbody>{favs}</tbody>
        </table>
      </div>
    );
  }
}
export default Favorites;
