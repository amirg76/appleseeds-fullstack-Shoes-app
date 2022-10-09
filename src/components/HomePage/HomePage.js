import React from "react";

export class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
        <a href="/shoes">Lets Find Some Shoes</a>
        <img
          alt="fff"
          className="home-img"
          src="./assets/images/shoe-background.jpg"
          style={{
            width: "100vw",
            height: "100vh",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></img>
      </div>
    );
  }
}
