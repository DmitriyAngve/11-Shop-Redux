import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { uiActions } from "../../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;

// 252 REFRESHER / PRACTICE

// CAME FROM index.js (original)
// STEP 5:
// Here I have button, need add an on click listener to make sure that I can do something when it's clicked.
// 5.1 Add click listener."<button className={classes.button} onClick={}>"
// 5.2 Add a new function in the "CartButton" component."const toggleCartHandler = () =>{}", where I want to "dispatch" logic for toggling the cart, for showing or hinding the cart, and for this we need to dispatch an action which triggers "toggle" (from ui-slice reducers:...) method. Do this with help of the "uiActions" which we are exporting in CartButton.
// 5.3 "import { uiActions } from "../../store/ui-slice""
// 5.4 Now need bind "toggleCartHandler" to the click. And to dispatch, we need access to the dispatch function.
// 5.5 For this I need "import { useDispatch } from "react-redux""
// 5.6 Now we can execute this hook in our component function, when we do so, this will give me access to the dispatch function provided vy Redux. /// "const dispatch = useDispatch()"
// 5.7 Now I can use this "dispatch" inside of "toggleCartHandler"
// 5.8 Then (in dispatch) simply dispatch the action, which is created by the "uiActions" toggle action creator. /// "dispatch(uiActions.toggle())"
// Here I executed toggle() because these auto-generated actions, which you get here, are actually action creator methods, which you have to execute and when you execute them, they return actions objects. So it's then this returned action object which we dispatch here.

// GO TO App.js --- >>> Because that is where we render that Cart!!!
// 252 REFRESHER / PRACTICE

//////////////////////////////////////////////////////////////////////

// 253 REFRESHER / PRACTICE

// CAME FROM ProductItems.js

// STEP 7:
// 7.1 Here we also need data from the cart, we need to "totalQuantity" => I add "state.totalQuantity++" and "state.totalQuantity--" in cart-slice.js
// 7.2 We can now after "7.1" read data from the state by also importing "useSelector" /// "import { useDispatch, useSelector } from "react-redux";" and selecting a piece of data.
// 7.3 Call "useSelector()" and pass is function for selecting data from the "state" and dive into "state.cart", because in index.js ("...cart: cartSlice.reducer}") we gave this a cart key, and then into the properties we set up in the "state" of "cartSlice" in cart-slice.js - where we take a "totalQuantity"
// 7.4 "const cartQuantity = useSelector((state) => state.cart.totalQuantity);" - store in variable.
// 7.5 And now this "cartQuantity" which will output in "<span className={classes.badge}>{cartQuantity}</span>"

// Now let's make sure we rendered this cart correctly. For that, we need to go to the Cart.js file --->>> GO TO
// 253 REFRESHER / PRACTICE
