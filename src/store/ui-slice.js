import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

// 252 REFRESHER / PRACTICE
// STEP 2:
// 2.1 "import createSlice" first.
// 2.2 Call it: "createSlice({})" with object for configuration where I give this slice a unique "name: "ui""(ui - custom)
// 2.3 Then set up some initial state (I can create a separate constant for this, or do it on the fly) /// "initialState: {cartIsVisible: false}"
// 2.4 Then need the reducers key which is a map of all the reducers or to be precise it's a map of methods that represent all the different cases, the different actions, we wanna handle with that reducer.
// 2.5 Add only one method: toggle, which receives the old state and where I then wanna set "state.cartIsVisible" to the opposite of what it was. It's not mutated code because when using Redux Toolkit we are not really mutating the state (even though it looks like we do. Redux Toolkit will kind of capture this code and use another third party library "imer" to ensure that this is actually translated to some immutable code, which creates a new state object instead of manipulating the existing one) /// "state.cartIsVisible = !state.cartIsVisible"
// 2.6 Store in variable and export. /// "export default uiSlice".
// 2.7 I also wanna export the actions: create a new constant which I export the UI actions, which we get by accessing uiSlice.actions

// GO TO index.js to create our store --->>>

// 252 REFRESHER / PRACTICE
