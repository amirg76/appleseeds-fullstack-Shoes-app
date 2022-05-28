import React from "react";
export class Header extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/shoes">Shoes</a>{" "}
          </li>
        </ul>
      </nav>
    );
  }
}
