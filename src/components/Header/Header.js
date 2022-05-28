import React from "react";
export class Header extends React.Component {
  constructor(props) {
    super(props);
  }

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
