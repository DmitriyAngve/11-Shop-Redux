import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
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
// 1.1 To handle  the response and potential errors, I addet a new Component "Notification.js"
// 1.2 On fetch, we can simply add then or we yse async await, since we were in use effect though, we should not add async in "useEffect", but instead wrapped us in a separate fetch then => add a new function in "useEffect" and remove fetch function inside of it.
// 1.3 Added async and await /// "const response =  await fetch(..."
// 1.4 Then we get the response we can get our "responseData" by awaiting response.json() /// "const responseData = await response.json();"
// 1.5 Add "ifcheck" of the response maybe bot okay => hence we have errors. So we might want to throw a new error. /// "throw new Error("Sending cart data failed!");" /// If we make it past this line we know that we were successful.
// NThen we know that we, well should show that success notification. Actually we weanna show notification right from the start when we start sending.
// 1.6 For this we could import use state and set up some local state and this component, some is loading state and maybe an error state. We set those states as part of our HTTP requests cycle, and we then use those states of conditionally render the notification component with the appropriate content.
// Since we already have a UI slice in Redux we add it all there

// GO TO cart-slice.js --- >>>

// CAME FROM ui-slice.js
// STEP 3:
// 3.1 Import "useDispatch" to get access to that "dispatch" function
// 3.2 Call "dispatch" in "App()" component.
// 3.3 Import "uiActions" from the store "import { uiActions } from "./store/ui-slice""
// 3.4 In "sendCartData" we initially dispatch UI action start "showNotification" /// "dispatch(uiActions.showNotification({}))" /// and pass an object to show "notification" where we set the status to pending (в ожидании); "title: "Sending...""; and "message:"...""
// That could be the "notification" we wanna set now. I also want to dispatch an action once we're done. So once we got the response data.

// 3.5 Getting rid the "const responseData = await response.json()" actually don't care about the response data in this case, because for sending the card I'm not interesting in any response. Instead knowing that we don't have an error is enough. So then I want to "dispatch" a new notification where the status is success and it should be success because I'm using that instead of the notification component then to adjust the CSS classes.
// Now, if we have an error, I also wanna dispatch and I'll do that instead of throwing an error I'll instead dispatch a new action where Isay error

// 3.6 Go below this "sendCartData" function which we defined, executed under the "dispatch" with "success" message. And then call ".catch()" to catch any errors that might be thrown from inside this function since it's an async function, this send cart data function returns a promise, so we can call ".catch()" on it. We catch any error we might be getting here, and I then dispatch my show notification action with the error in here.
// 3.7 Add dispatch: "...}, [cart, dispatch]);", because dispatch also a dependency now. The dispatch function created by "useDispatch".
// We can safle add it to the dependecies array, because React-Redux will ensure that this is a function which will never change, so dispatch will never trigger this effect to rerun only card changes will.

// STEP 4:
// 4.1 Now just need to use this new notification UI state. And i also wanna to use data and App.js (already import useSelector). And now I want to also select my notification status with "useSelector" /// "onst notification = useSelector((state) => state.ui.notification);" ///
// I get that "notification" property and that's either null initially, or it's an object as set by us as this patched by us ann therefore now we can use notification to conditionally rendered a notification component and to then provide extra data to the notifictaion component.

// 4.2 Now for rendering the notification component, I'll start by imoprting "Fragment" from React, because I want to render the notification components side-by-side to layout and since adjacent JSX isn't allowed I'll use "Fragment" and wrap that around layout /// "import { Fragment, useEffect } from "react";"
// 4.3 Add "<Notification />" after import it. /// "import Notification from "./components/UI/Notification";"
// And only render notification if we have a notification.
// 4.4 Now I'll check if notification is truthy, and only if it is I render "notification" /// "{notification && <Notification />}"
// 4.5 And then I set the status (it's from ui-slice.js): "status={notification.status}" and for "title" and "message".

// STEP 5:
// 5.1 I wanna make sure that we don't send the cart when this runs for the first time. For impementing this we could add a variable here outside of our function ("App") /// "let isInitial = true;" - defined outside and doesn't change, and it's not re initialized if the compoennt renders again! (this e initialized when this file is parsed for the first time)
// 5.2 I can use this initial to check if "isInitial" and if that's the case I'll return. I'll not continue so I'll not send my cart data. - this only blocks this cart data from being sent the first time this effect executes so application started.
// 259 HANDLING HTTP STATES & FEEDBACK

// 260 USING AN ACTION CREATOR THUNK
// Before we start fetching data let's have a look at the alternative,of putting all that side effect logic into our component.
// "uiActions.showNotification({..." - "showNotification" it's action creator!
// We get those action creators automatically by Redux TK. And we call them, to create the action objects which we "dispatch"
// custom creators thunks!
// Now i move "sendCartData" out of the component for this GO TO ui-slice.js --->>>

// CAME FROM cart-slice.js
// STEP 2:
// 2.1 Grab first "dispatch" action with "pendng!"

// CAME FROM cart-slice.js

// STEP 3:
// 3.1 Cleanup function "sendCartData" in "useEffect".
// 3.2 Rid out import of "uiActions".
// 3.3 Keep that "isInitial" code. where I return and set "isinitial" to false.
// I wanna use "sendCartData" from cart-slice.js as a action creator.
// Here, in App.js, I still wanna dispatch, after "ifcheck", dispatch "sendCartData" from cart-slice.js actions. Dont forget "export" it.
// 3.4 import "sendCartData" /// "import { sendCartData } from "./store/cart-slice"
// 3.5 In here in "useEffect" I dispatch "sendCartData" /// "dispatch(sendCartData(cart));"
// 3.6 And execute this "sendCartData" and pass my "cart" as an argument.
// 260 USING AN ACTION CREATOR THUNK

//

// 261 GETTING STARTED WITH FETCHING DATA
// CAME FROM cart-actions.js
// STEP 3:
// Here I already have a "useEffect" call and that we wanna start fetching data here, if the application loads
// 3.1 Аor the cleanliness of the code, we will create a sepaate "useEffect", which simply doesn't have any dependencies and which therefore all they will only run if this component was rendered for the first time and since it's our main component this will only render once. ///  useEffect(() => {dispatch();}, []);
// 3.2 Dispatch this new "cartAction" created, this custom "cartAction", so "fetchCartData" action /// "import { sendCartData, fetchCartData } from "./store/cart-actions";" /// Add in my new "useEffect" as argument of dispatch.
// 3.3 Add "dispatch" into array as a dependency. But I know - this effect will never change, this effect will never rerun. Andf that "dispatch(fetchCartData)" this whenever our application starts.
// 261 GETTING STARTED WITH FETCHING DATA

//

// 262 FINALIZING THE FETCHING LOGIC
// Let's fix the issue where we automaticall resent the cart, when the application loaded.
// First solution in our cart-slice.js
// GO TO cart-slice.js --->>>
// 262 FINALIZING THE FETCHING LOGIC
