import React from "react";
import "./PopUp.css";

class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newShoeName: "", newShoeImg: "", newShoePrice: "" };
  }
  handleInputChange = ({ target }) => {
    this.setState({ [target.id]: target.value, isSpinning: false });
  };

  handleNewUpdate = () => {
    return this.props.handleUpdate(
      this.props.id,
      this.state.newShoeName,
      this.state.newShoeImg,
      this.state.newShoePrice
    );
  };
  render() {
    return (
      <>
        <div className="popup-continer">
          {this.props.typeOfPopup === "delete" ? (
            <div className="popup-card-delete">
              <h4> You really want to delete that shoe?</h4>
              <button
                onClick={() => {
                  this.props.handleDelete(this.props.id);
                  this.props.closePopup();
                }}
              >
                Yes
              </button>
              <button onClick={this.props.closePopup}>No</button>
            </div>
          ) : (
            <div className="popup-card-update">
              <h4> Confirm or cancel update</h4>

              <input
                id="newShoeName"
                onChange={this.handleInputChange}
                value={this.state.newShoeName}
                placeholder="Update shoe name"
              />
              <input
                id="newShoePrice"
                onChange={this.handleInputChange}
                value={this.state.newShoePrice}
                placeholder="Update shoe price"
              />
              <input
                id="newShoeImg"
                onChange={this.handleInputChange}
                value={this.state.newShoeImg}
                placeholder="Update shoe img"
              />
              <div className="buttons-update">
                <button
                  onClick={() => {
                    this.handleNewUpdate();
                    this.props.closePopup();
                  }}
                >
                  Confirm
                </button>
                <button onClick={this.props.closePopup}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
export default PopUp;
