import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;

// 252 REFRESHER / PRACTICE
// STEP 1:
// 1.1 Installation: npm install / npm start / npm install @redux/toolkit / npm install react-redux

// 1.2 Create folder "store" in folder "src".
// 1.3 Create file "index.js"
// in this folder i'll create multiple slices.
// 1.4 1) ui-slice.js and 2) cart-slice.js
// 1.5 Let's started with ui-slice.js
// 252 REFRESHER / PRACTICE

// 252 REFRESHER / PRACTICE
// STEP 3:
// 3.1 "import { configureStore } from "@reduxjs/toolkit";"
// 3.2 And call "configureStore".
// 3.3 "configureStore" receive the object, where we set up our roote reducer. Now that can be a signal reducer function or a MAP OF REDUCERS.
// 3.4 For redusers add a key of "ui" (custom) don't foget about import the "uiSlice". And as value to "ui" point at UI Slice reducer (so the reducer created by UI Slice). /// "reducer: { ui: uiSlice.reducer },"
// 3.5 Now store into variable "store" and export that "store"
// With the store exported, we need to provide us to the application. And we can do this in the index.js file (original)

// GO TO .src/index.js --->>>

// 252 REFRESHER / PRACTICE

//////////////////////////////////////////////////////////////////

// 253 REFRESHER / PRACTICE
// CAME FROM cart-slice.js
//
// STEP 2:
// 2.1 Here I wanna merge this new Slice into my overall Redux store for that I need import "cartSlice".
// 2.2 And update this as a number of reducer in my reducer map /// "reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer }," - wired up!
// GO TO Products.js --->>> there I need to add more products
// 253 REFRESHER / PRACTICE
