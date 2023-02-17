import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { title, quantity, total, price, id } = props.item;

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;

// 253 REFRESHER / PRACTICE
// CAME FROM Cart.js
// STEP 9:
// For activate minus and plus button we need to dispatch actions when they are clicked
// 9.1 import "useDispatch"
// 9.2 And we need our "cartActions", let's import "cartActions"
// 9.3 And call "useDispatch" to get access to that dispatch function /// "const dispatch = useDispatch();"
// Then we add new functions whic will be wired up to these buttons
// 9.4 Add new functions: "removeItemHandler" and "addItemHandler"
// 9.5 Add "dispatch()" into functions.
// 9.6 "removeItemHandler" - Let's dispatch that remove action, for this we need "dispatch(cartActions.removeItemFromCart())" that's action wants a payload, it wants the "id" as a payload (see cart-slice.js {28 string}).
// Add "id" as a prop in "const { title, quantity, total, price, id } = props.item;" in CartItem.js (this file) and then Cart.js make sure that we pass it as a prop.
// GO TO Cart.js --->>>
// CAME FROM Cart.js
// 9.8 "id" pass as a payload to the "removeItemFromCart" action. /// "dispatch(cartActions.removeItemFromCart(id));"
// 9.9 Let's work with "addItemHandler". /// "dispatch(cartActions.addItemToCart({}));" we pass in that object which "addItemToCart" expects this object (from cart-slice.js {12-21 Strings}) /// "id, title, price".
// 9.10 Now we just wire up these functions to buttons (+-);
// 9.11
// 253 REFRESHER / PRACTICE
