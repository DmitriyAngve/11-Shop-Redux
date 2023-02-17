import { useSelector } from "react-redux";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;

// 253 REFRESHER / PRACTICE

// CAME FROM CartButton.js
// Here we will work with <CartItem>
// STEP 8:
// 8.1 Since we need data from Redux => we need to import "useSelector".
// 8.2 Call "useSelector()" and access "state.cart" and dive into our "items". /// "useSelector((state) => state.cart.items);"
// 8.3 Store this "useSelector" into variable /// "const cartItems = useSelector((state) => state.cart.items);"
// 8.4 Then we can output then here. We can map our "CartItems" and here that <CartItem /> expects the item prop. /// "{cartItems.map((item) => (   <CartItem item={{ title: "Test Item", quantity: 3, total: 18, price: 6 }}/>))}"
// In cart-slice.js we do have a price, quantity, totalPrice, and therefore we now just need to translate those properties, which we have in our Redux store and Redux state to the properties expected here.
// 8.5 We do it on the fly (using keys from cart-slice.js in "addToCartItem")(item is the data coming from Redux): "title: item.name" / "quantity: item.quantity" / "totalPrice: item.totalPrice" / "price:item.price"
// So, that's now the item which we pass into CartItem for every item we're getting from Redux here.
// 8.6 "key={item.id}"

// GO TO CartItem.js --->>> active minus and plus button

// CAME FROM CartButton.js
// STEP 9:
// 9.7 In itemobject, which we're creating I'll add the id field and use "item={{id: item.id,title: item.name,"
// GO BACK ---> CartItem.js
// 253 REFRESHER / PRACTICE
