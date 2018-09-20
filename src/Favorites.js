import React, { Component, Fragment } from "react";

class Favorites extends Component {
  render() {
    const favs = this.props.favs.map(repo => {
      return (
        <Fragment>
          <tr>
            <td>{repo.full_name}</td>
            <td>{repo.language}</td>
            <td>{repo.version}</td>
          </tr>
        </Fragment>
      );
    });
    return (
      <div>
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
          <tbody>{favs}</tbody>
        </table>
      </div>
    );
  }
}
export default Favorites;
