import React from "react";
import "./Shoe.css";

import PopUp from "../PopUp/PopUp";

class Shoe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopUpOpen: false,
      typeOfPopup: "",
    };
  }
  // state = { value: "" };
  // handleOnChange = ({ target }) => {
  //   this.setState({ value: target.value });
  // };
  handleUpdateClick = () => {
    this.setState({ typeOfPopup: "update" });
    this.togglePopup();
    // this.props.handleUpdate(this.props.id, this.state.value);
    // this.setState({ value: "" });
  };

  togglePopup = () => {
    this.setState((prev) => ({ isPopUpOpen: !prev.isPopUpOpen }));
  };

  handleConfirmDelete = () => {
    this.setState({ typeOfPopup: "delete" });
    this.togglePopup();
  };
  // () => this.props.handleDelete(this.props.id)
  render() {
    return (
      <div className="item">
        <img alt="#" className="shoe-img" src={this.props.img} />
        <div className="item-detil">
          <h2>{this.props.price}$</h2>
          <h2>{this.props.name}</h2>
        </div>
        <div className="buttons-item">
          <button onClick={this.handleConfirmDelete}>Delete</button>
          <button onClick={this.handleUpdateClick}>Update</button>
        </div>
        {this.state.isPopUpOpen && (
          <PopUp
            closePopup={this.togglePopup}
            handleUpdate={this.props.handleUpdate}
            handleDelete={this.props.handleDelete}
            id={this.props.id}
            typeOfPopup={this.state.typeOfPopup}
          />
        )}
      </div>
    );
  }
}

export default Shoe;
