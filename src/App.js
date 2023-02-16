import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);

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

// Let's go to cart-slice.js
