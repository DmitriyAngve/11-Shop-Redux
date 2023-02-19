import { useEffect } from "react";
import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  // https://react-reduxtk-ordermeals-default-rtdb.firebaseio.com/cart.json
  useEffect(() => {
    fetch(
      "https://react-reduxtk-ordermeals-default-rtdb.firebaseio.com/cart.json",
      {
        method: "PUT",
        body: JSON.stringify(cart),
      }
    );
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

// 252 REFRESHER / PRACTICE
// CAME FROM CartButton.js
// STEP 6:
// Now I wanna render it conditionally based on that "uiSlice" state value. In that inside of "App" Component we need to extract data from Redux. We do taht with another hook which we import from React-Redux
// 6.1 "import { useSelector } from "react-redux";"
// 6.2 Then execute "useSelector" inside of "App". And we need to pass a function which receives the Redux state automatically because this function which we pass to use selector will be executed by React-Redux.
// So it receives the current state automatically and we should return the data which we wanna use in this Component. In my case is "cartIsVisible" property value. But for this we'll need to drill into that state slice and since I'm setting up a map of reducers in ./store/index.js file we need to use "ui" key to drill into that part of the state, and then use that property name in which we're interested.
// 6.3 "useSelector((state) => state.ui.cartIsVisible);" - that's how we extract that value!!!
// 6.4 And then store this in a constant: "const showCart = useSelector((state) => state.ui.cartIsVisible);"
// 6,5 Now use this constant to conditionally show or hide this cart component.
// 252 REFRESHER / PRACTICE

// Let's go to cart-slice.js ---- >>>>>

// 257 USING USEFFECT WITH REDUX
// Here, in App.js as our root component we added "fetch". There we can simply get hold of our overall cart by basically using "useSeclector" and listening to changes to our cart state. And whenever our cart state does change we can send HTTP request.
// 1.1 Use "useSelector" which we're already importing to get hold of my overall cart. /// "useSelector((state) => state.cart)"
// 1.2 Store it in that constant "cart=..."
// 1/3 Now we "useEffect" which we import from React to watch for changes in our cart state, because that "useEffect" allows you to run side effects. /// "import { useEffect } from "react";"
// 1.4 Call "useEffect" in the "App" component. Here we then define our Effect function and array of dependecies.
// 1.5 Inside of the Effect function I wanna send a HTTP request with the Fetch API, and I wanna send it to Firebase (grab URL from Firebase project)
/// "fetch("https://react-reduxtk-ordermeals-default-rtdb.firebaseio.com/cart.json");" /// and maybe target a "cart.json" (added after last "/") node. It will create a new cart Node in the database and then store the data there.
// 1.6 We wanna send a PUT request, because that will tell Firebase to store new data (PUT differs from POST is that the new data will not be added in a list of data, but that it will override existing data) => so when sending a PUT request, will override the existing cart with the incoming data, that's exatcly what we want here.
// 1.7 Add request "body" to "JSON.stringify(cart)" - this "cart", which I get from Redux, I convert this from JSON data and send it as part of the request
// Since we're using "cart" in here we should add it as a dependecy to useEffect /// ", [cart]"
// So this Effect function "fetch(...)" re-executes whenever our cart changes, which is exactly what we want.
// "useSelector" sets up a subscription to Redux, so whenever our Redux store does change this component function will be re-exucted and we will get the latest state. (in this case: "const cart = useSelector((state) => state.cart)" - the letest cart), that means that effect (fetch...) will also be re-evaluated and it will re-executed if our carts did change.
// With this simple addition we will send this HTTP request whenever our cart changes and I keep logic from "cart-slice.js" for updating ("addItemToCart") the cart inside of the reducer, because we simply switched the order. We first update our Redux store, and we're done with that. And then we select the updated store to send the request and that allows us to keep lean components create a fet reducer with all the logic and then perform any side effects that might depend on our Redux state
// 257 USING USEFFECT WITH REDUX

// 259 HANDLING HTTP STATES & FEEDBACK
// STEP 1:
// To handle  the response and potential errors, I addet a new Component
// 259 HANDLING HTTP STATES & FEEDBACK
