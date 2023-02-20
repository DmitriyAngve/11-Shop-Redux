import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
// import cartSlice from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-reduxtk-ordermeals-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cart = await fetchData();
      if (cart) dispatch(cartActions.replaceCart(cart));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending!",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-reduxtk-ordermeals-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sending cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
// 261 GETTING STARTED WITH FETCHING DATA
// STEP 2:
// 2.1 Pase all "sendCartData"
// 2.2 Do all needed imports
// 2.3 In App.js change path for import.
// 2.4 Then I'll add my app action creator function in this cart-actions file as well.
// 2.5 Create "fetchCartData" function. And export it. immediately return in this function, which gets dispatched as an argument and then does something else.
// 2.7 Create a new function, "fetchData" inside of returned "fetchCartData" - another nested function with is async, because I use the fetch API and I wanna wrap a "fetchData" with "trycatch".
// 2.8 Then await fetch and get a response. /// "const response = await fetch()" and the same URL, but should a GET request.
// So, we dont need to add this configuration object then as a second parameter, because I get request is the default, anyways.
// 2.9 Instead this time I am now interested in the data, so in the result of calling await "response.json" /// "const data = await response.json()"
// 2.10 I'll add "ifcheck". If the response is maybe not okay for whatever reason and if that should be the case I'll throw a new Error.
// 2.11 Now if we make it pass this line (with "ifcheck") of code, we have the data, and I will then return it here, I'll return it here because that is not a separate nested function. Hence here I'll then "trycatch" executing "fetchData". If we get an error, we still might wanna show the error in notification. =>
// 2.12 Copy "dispatch" with errors.
// 2.13 Add async in /// "return async (dispatch) => {"
// 2.14 Add await in /// "try {await fetchData();"
// 2.15 Store this "try{}" block into const /// "const cartData = await fetchData();", because I'm returning the data which we parse in code above. (responce.json())
// 2.16 Now I use that card data to set my cart. Now the cart data we're fetching, will have that format which is stored on Firebase and that's the format which we're sending to Firebase.
// We used POST for a sending our data, not PUT as we're doing in "sendRequest", and hence we let Firebase create a list of data, which turned out to be an object when we fetched it => so when we then fetch it, we also have to correct structure and hence this cart data is correctly formatted and we can use "replaceCart(state, action)" reducer of cart slice. which I provied to you earlier to replace our front-end cart with the cart we're loading from Firebase and replace cart expects a payload which has a "totalQuantity" and an items field which is exatly the data structure we're fetching from Firebase.
// 2.17 So, we just wanna import our "cartActions" /// import { cartActions } from "./cart-slice"; - this automatically generated actions.
// 2.18 And inside of "try" block I wanna dispatch "cartActions.replaceCart(cartData)" with my carts data as a payload, which as mentioned has the correct structure already => I wanna use cartData and to moving on.
// With all that done, we now just need to call fetch "cartData" to start fetching our "cartData" from Firebase. App.js is a good place for that.
// GO TO App.js --->>>
// 261 GETTING STARTED WITH FETCHING DATA
