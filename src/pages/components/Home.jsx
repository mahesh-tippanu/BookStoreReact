import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate, useParams, Link, redirect } from "react-router-dom";
import BookService from "../../services/BookService";
import Button from "@mui/material/Button";
import Header from "../header/Header";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import CartService from "../../services/CartService";
import image1 from "../assets/image1.jpg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      selectBoxValue: "none",
    };
  }

  componentDidMount() {
    this.fetchData();
    console.log(this.props);
  }

  fetchData() {
    BookService.getAllBooks().then((response) => {
      this.setState({ books: response.data.data });
      console.log(response);
    });
  }

  addToCart(bookId) {
    const id = localStorage.getItem("Authorization");
    const user_id = JSON.parse(id);
    // console.log("User_Id", user_Id)
    let object = {
      bookId: bookId,
      quantity: 1,
      user_Id: 1,
    };
    console.log("BookId", bookId);
    console.log(object);
    CartService.addCartItem(object).then((response) => {
      console.log(response);
      console.log(response.data.data.cartId);
    });
  }
  

  sortByLower = () => {
    console.log("Sort to low");
    BookService.sortByLower()
      .then((response) => {
        this.setState({ books: response.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sortByHigher = () => {
    console.log("High to low");
    BookService.sortByHigher()
      .then((response) => {
        this.setState({ books: response.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onSelect = (event) => {
    console.log("Hello");
    if (event.target.value === "low_to_high") {
      console.log("High");

      this.sortByLower();
    } else {
      this.sortByHigher();
    }
  };

  render = () => {
    return (
      <>
        <Header />
        <p style={{ marginTop: "0rem", marginRight: "85rem" }}>
          Books:({this.state.books.length})
        </p>

        <FormControl
          sx={{ marginTop: "0rem", marginLeft: "70rem", marginbottom: "0rem" }}
        >
          <InputLabel htmlFor="grouped-native-select">
            Sort by Relevence
          </InputLabel>
          <Select
            native
            defaultValue=""
            id="grouped-native-select"
            label="Grouping"
            onChange={this.onSelect}
          >
            <option aria-label="None" />
            <option
              value="low_to_high"
              id="low_to_high"
              onClick={this.sortByLower}
            >
              Low to high
            </option>
            <option
              value="high_to_low"
              id="high_to_low"
              onClick={this.sortByHigher}
            >
              high to low
            </option>
          </Select>
        </FormControl>

        <div style={{ width: "100%", margin: "3rem" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "stretch",
              bgcolor: "background.paper",
              gap: "2.5rem",
              marginLeft: "0.5rem",
              marginTop: "0rem",
            }}
          >
            {this.state.books &&
              this.state.books.map((book, index) => (
                <p key={`${index}`}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      border: "1px solid",
                      padding: "1rem",
                    }}
                  >
                    <FormControl>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="203px"
                          padding="1rem"
                          width="50"
                          src={book.profilePic}
                        />
                        <CardContent>
                          <h3>{book.bookName}</h3>
                          <h6>{book.authorName}</h6>
                          <h5>RS.{book.price}</h5>
                          <Button
                            variant="contained"
                            disabled={book.quantity == "1"}
                            size="large"
                            type="submit"
                            id="submitButton"
                            onClick={() => this.addToCart(book.bookId)}
                          >
                            {"Add to Cart"}
                          </Button>

                          <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            id="submitButton"
                          >
                            {"WishList"}
                          </Button>
                        </CardContent>
                      </CardActionArea>
                    </FormControl>
                  </Card>
                </p>
              ))}
          </Box>
        </div>
      </>
    );
  };
}
export default Home;
