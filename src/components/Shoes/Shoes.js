import React from "react";
import "./Shoes.css";
import { API } from "../Api";
import Shoe from "../Shoe/Shoe";
export class Shoes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoesArr: [],
      newShoeName: "",
      newShoeImg: "",
      newShoePrice: "",
      isSpinning: true,
    };
  }

  async componentDidMount() {
    try {
      const { data } = await API.get("/shoes");
      this.setState({ shoesArr: data, isSpinning: false }, () => {
        console.log(this.state.shoesArr);
      });
    } catch (e) {
      console.log(e);
    }
  }
  showShoes = () => {
    return this.state.shoesArr.map(({ name, avatar, price, id }) => {
      return (
        <Shoe
          key={id}
          name={name}
          img={avatar}
          price={price}
          id={id}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
        />
      );
    });
  };
  handleCreate = async (e) => {
    this.setState({ isSpinning: true });
    const newShoe = {
      name: this.state.newShoeName,
      avatar: this.state.newShoeImg,
      price: this.state.newShoePrice,
    };
    try {
      const postedData = await API.post("/shoes", newShoe);
      console.log(postedData);
      this.setState((prev) => {
        return {
          shoesArr: [...prev.shoesArr, postedData.data],
          newShoeName: "",
          newShoeImg: "",
          newShoePrice: "",
          isSpinning: false,
        };
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  handleInputChange = ({ target }) => {
    this.setState({ [target.id]: target.value, isSpinning: false });
  };
  handleUpdate = async (id, newShoeName, newShoeImg, newShoePrice) => {
    this.setState({ isSpinning: true });
    const shoeToUpdate = this.state.shoesArr.find((shoe) => shoe.id === id);
    const updatedShoe = {
      ...shoeToUpdate,
      name: newShoeName !== "" ? newShoeName : shoeToUpdate.name,
      avatar: newShoeImg !== "" ? newShoeImg : shoeToUpdate.avatar,
      price: newShoePrice !== "" ? newShoePrice : shoeToUpdate.price,
    };
    const { data } = await API.put(`/shoes/${id}`, updatedShoe);
    this.setState((prev) => {
      return {
        shoesArr: prev.shoesArr.map((shoe) => {
          if (shoe.id === id) {
            return data;
          }
          return shoe;
        }),
        isSpinning: false,
      };
    });
  };

  handleDelete = async (id) => {
    this.setState({ isSpinning: true });
    try {
      await API.delete(`/shoes/${id}`);
      this.setState((prev) => {
        const newShoesArr = prev.shoesArr.filter((shoe) => shoe.id !== id);
        return { shoesArr: newShoesArr, isSpinning: false };
      });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <div className="main-continer">
        {this.state.isSpinning ? (
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
            <form>
              <div className="main-form">
                <div class="title">Welcome</div>
                <div class="subtitle">Let's create your product!</div>
                <div className="form-handle">
                  <input
                    id="newShoeName"
                    onChange={this.handleInputChange}
                    value={this.state.newShoeName}
                    placeholder="New shoe name"
                  />
                  <input
                    id="newShoePrice"
                    onChange={this.handleInputChange}
                    value={this.state.newShoePrice}
                    placeholder="New shoe price"
                  />
                  <input
                    id="newShoeImg"
                    onChange={this.handleInputChange}
                    value={this.state.newShoeImg}
                    placeholder="New shoe image"
                  />
                  <button
                    type="button"
                    className="submit-btn"
                    onClick={this.handleCreate}
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>

            <div className="item-wrapper">{this.showShoes()}</div>
          </>
        )}
      </div>
    );
  }
}
