import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity || 0;
      state.items = action.payload.items || [];
    },
    addItemToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

// 252 REFRESHER / PRACTICE
// CAME FROM App.js
// STEP 7:
// 7.1 "import { createSlice } from "@reduxjs/toolkit";"
// 7.2 Create Slice and configured with an object.
// 7.3 "name", "initialState", "reducers"
// 7.4 "initialState{}" with "items: []" - with array of items /// "totalQuantity" of items in the cart. And with that, I don't mean the length of this array, but the quantity of the items of that array summed up, initially is 0.
// 7.5 Now we also need functions i our reducer, so different actions which this part of our state should handle in the end. And here be clearly need a "addItemToCart" action. In object: "removeItemFromCart()"
// 7.6 Add action,
// So we get a state and we'll also accept this action argument,because this action, wjen it is dispatched, should carry extra information. We need to know which items should be added after all.
// 7.7 In "addItemToCart" we should propably extract the item from the action and keep in mind that it will be the payload which Redux Toolkit sets for you, which contains any extra data you added to the action. I assume that this extra data is another object describing the item that should be added. /// "const newItem = action.payload"
// Now we could just push it to array ("items:[]"), but actually I wanna check if it's part of that array already and if it is, I wanna increase of quantity of the existing cart item instead of push it as an additional item.
// 7.8 Now I want to get my existing item let's say, by reaching out to the state items and finding an item in there where the item ID (let's assume the items have ID's) is equal to the item ID (of item ID getting "const newItem = action.payload") /// "const existingItem = state.items.find((item) => newItem.id)" => that's how I chec if that ite, already exist.
// 7.9 Add "ifcheck" is doesn't exist "if (!existingItem)" if existing Item is falsy, so if it's not part of the array yet then we wanna add it. /// "state.items.push({});" - in Redux Toolkit it's normal.
// 7.10 Let's push new object to array ("items: []") whre we have an "itemID" field which is "newItem.id", where we have a price field (price:newItem.price), expecting a price filed on all our products. Then the "quantity:1" (1 - because if we add an item for the first time, the quantity will be one)$ and "totalPrice: newItem.price" and "name: newItem.title"
// 7.11 Add "else" case: update "existingItem.quantity"
// 252 REFRESHER / PRACTICE

///////////////////////////////////////////////////
// 253 REFRESHER / PRACTICE
// STEP 1:
// 1.1 For removeItems from the cart we wanna get a "state" and "action", because we'll get some extra payload that heps us identify the ite, that should be removed. Add "state" and "action" /// "removeItemFromCart(state, action) {},"
// 1.2 In "removeItemFromCart" add const id. We nee d find and remove it from the array /// "const id = action.payload"
// 1.3 Now we don't need to check if it's part of the array, we need to find out how many items are in the array. /// "const existingItem = state.items.find((item) => item.id === id);" id - as a payload.
// 1.4 "ifcheck" /// "if (existingItem.quantity === 1) {" if "1" then we wanna remove this item from the array. If greater than "1" we just reduce the quantity by one. /// "} else {existingItem.quantity--;}"
// 1.5 If the quantity is one, we wanna remove the item from the array. /// "state.items = state.items.filter();" and then filter out that one item that we wanna remove. That's overwrite the array of items with a new array where this item, which we wanna remove will be missing. It will be missing because we filter for the item where "item.id !== id". /// "state.items = state.items.filter((item) => item.id !== id);"
// So i keep all items, where the ids do not matcdh the one id, we're trying to remove. One items remve from the array whilst keeping all the other items.
// 1.6 Need to update existingItem.totalPrice /// "existingItem.totalPrice = existingItem.totalPrice - existingItem.price;"
// 1.7 Store and export with actions
// NOW GO TO ./store/index.js --->>>
// 253 REFRESHER / PRACTICE

// 255 FONTEND VS BACKEND CODE
// Don't perform a side effect inside of your reducer!!!!
// Let's start with adding items to a cart from inside the product item component. That means that in here we have this add to cart handler and we could then not just dispatch an action to our Redux store but we could also send that data to Firebase to the backend. If we just send the product data to Firebase, so the data which we're sending to Redux here, if we just send that to Firebase, we would just store that product data in Firebase. But Firebase the way we are using it does not have any logic on its own on the backend. So on the Firebase backend we don't run any extra code. So if we send some product data there, that product data would simply be added to the database, but all the logic we have in the reducer for checking whether a product is already part of the cart, and if it is updating as quantity, if it's not adding it that kind of logic simply does not run on Firebase, because that's a pretty dumb backend here the way we're using it and therefore we don't have such logic there.
// 255 FONTEND VS BACKEND CODE

//

// 260 USING AN ACTION CREATOR THUNK

// CAME FROM App.js
// Now for create action creator, we can go to the end of the file after this "cartSlice", that's important! So outside of the slice object, and there we can create a new function.
// STEP 1:
// 1.1 Create function "sendCartData" in this function we expect the "cartData" /// "const sendCartData = (cart) => {}"
// 1.2 Now we could write this as a cation creator, by now returning an action object in here. For all reducers methods Rudex TK creates action creators automatically for us by using that reducer function name (that's what's inside ".actions").
// 1.3 In this function we need returns another function. This function should receive the "dispatch" function as a argument. Inside of this returned function we can then therefore, "dispatch", the actual action we wanna perfom (showing a notification or adding a cart item).
// Before we call "dispatch()" we can perfom any async code, any side effects, because we will not yet, have reached our reducer. (It's a separate standalone JS function)
// GO TO App.js --->>>

// CAME FROM App.js with "dispatch"

// STEP 2
// 2.2 Paste "dispatch" from App.js to returned function in "sendCartData"
// 2.3 import "uiActions".
// 2.4 Go for all code for sending the request and hendling the response.
// 2.5 Execute this copyend code here after dispatching that first notification.
// 2.6 Convert returned function to an async
// 2.7 Go to App.js for a new code
// 2.8 Execute this code.
// 2.9 TAnd now when it comes to handling the potential errors, I will actually create a new function "const sendRequest = async () => {};", and put my code in this function (code of sending the response and hendling the response).
// 2.10 Call this "sendRequest" function with await.
// 2.11 Add "try catch" around await block and inside "catch(error)" block move "dispatch" with error notification. And with success above it block.
//
// GO TO App.js --->>>
// 260 USING AN ACTION CREATOR THUNK

// 261 GETTING STARTED WITH FETCHING DATA
// STEP: 1
// Let's start build a app action creator that fetches the cart when the application loads. Because at the moment we're only sending data, but we never fetched data when the application load, if we reload, all our state is still lost, that's not the goal. We can ride that code in the component or as action creator, but here I now wanna stick to action creators amd hence we can add a second function cart slice.
// Let's create a new file - cart-actions.js GO TO ---->>>
// Before to go out cut "sendCartData" function and paste into new file cart-actions.js
// 261 GETTING STARTED WITH FETCHING DATA

// 262 FINALIZING THE FETCHING LOGIC
// CAME FROM App.js
// STEP 1:
// 1.1 In "initialState" add a "changed" property, which is "false".
// 1.2 And we don't change this if we replaced a cart, but we do changed it if we add or remove items, to or from the cart, then we set state.changed to true. /// "state.changed = true;" inside of addItemToCart.
// 1.3 And "removeItemFromCart" and "addItemToCart", are only executed from our local application.
// So if we fetch data from Firebase, where we then execute "replaceCart" - "changed" will not change. it will stay "false"
// GO TO App.js --->>>
// 262 FINALIZING THE FETCHING LOGIC
