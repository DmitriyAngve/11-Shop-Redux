import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../../store/cart-slice";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  const { title, price, description, id } = props;

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;

// 253 REFRESHER / PRACTICE
// CAME FROM Product.js
// STEP 4:
// Here I have the Add to Cart button, I wanna wire this button up to this function, to the addItemToCart function in our "cartSlice"
// 4.1 In "ProductItem" I will add new function here /// "const addToCartHandler = () => {};"
// 4.2 import "useDispatch" /// executing "useDispatch" and store into "dispatch"
// 4.3 And add that "dispatch" into "addToCartHandler"
// 4.4 Get access to "cartActions" /// "import { cartActions } from "../../store/cart-slice";"
// 4.5 "dispatch(cartActions.addItemToCart());" - I execute this action creator function, but now I also need to pass data for it, because we now want to pass that product whic should be added to that "addItemToCart" function (we are expecting it in "cart-slicer.js" "addItemToCart(state, action) {const newItem = action.payload;") Where we need to work with id/price/title so we should make sure tha we send all that data. /// "const { title, price, description, id } = props;" - i will the expect the id as a prop.
// GO TO Products.js --->> to forward the "id"

// CAME FROM Products.js
// STEP 6:
// 6.1 Inside "addItemToCart()" I pass an object as a payload to this action. Add object fields: "id: id" wich points at this id< which we're extracting from props (use shortcut "id"), do same for "title", "price" => this is the object we are dispatching.
// 6.2 Now we can connect "addToCartHandler" to our button. /// "<button onClick={addToCartHandler}>Add to Cart</button>"

// Let's start with the batch

// GO TO --->>>

// 253 REFRESHER / PRACTICE
