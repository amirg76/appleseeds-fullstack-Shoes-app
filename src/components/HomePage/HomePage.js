import React from "react";

export class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
        <img
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
        {/* <h1>This is my beautiful landing page</h1> */}
      </div>
    );
  }
}
