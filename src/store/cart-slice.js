import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalQuantity: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart() {},
  },
});

export const cartActions = cart.actions;

export default cart;

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
