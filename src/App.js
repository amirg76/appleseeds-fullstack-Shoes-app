import React from "react";
import "./App.css";

import { API } from "./components/Api";
import { Header } from "./components/Header/Header";
import { Shoes } from "./components/Shoes/Shoes";
import Shoe from "./components/Shoe/Shoe";
import { HomePage } from "./components/HomePage/HomePage";
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
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
      name: newShoeName,
      avatar: newShoeImg,
      price: newShoePrice,
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
      <>
        <div className="nav-bar-continer">
          <Header />
        </div>
        <div className="main-app">
          <BrowserRouter>
            <div className="home-page">
              <Route path="/" exact component={HomePage} />
            </div>
            <div className="main-shoes-continer">
              <Route path="/shoes" exact component={Shoes} />
            </div>
          </BrowserRouter>
        </div>
      </>
    );
  }
}

export default App;
