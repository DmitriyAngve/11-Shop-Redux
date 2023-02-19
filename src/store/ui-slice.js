import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
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

//

// 259 HANDLING HTTP STATES & FEEDBACK
// STEP 2:
// 2.2 We add more to the state we're managing with Redux and we managed the notification, which we showing with help of Redux now. Add "notification" property to initial state and I'll set it to null initially = > so that initially we have no "notification".
// 2.3 Then we can add a new reducer, which we could call set "showNotification" where we get our "state", and we also use the "action", because I expect some action payload here, because the kind of "notification" that should be shown should be ebcoded in the action as a payload.
// 2.4 Then there for a set "state.notification ={}" equal to an object.
// 2.5 Add in that object "status" key, which I expect to get from my action payload, we all expect the status property and status could be something like pending error and success. /// "status: action.payload.status"
// 2.6 Then we also expect a title, which we also get from the action payload and a message, which we also expect.
// Now we want to dispatch these "showNotification" action, when we start sending the data, when we're done with the data and if we have an error.

// For this we GO TO App.js --->>>

// 259 HANDLING HTTP STATES & FEEDBACK

//
