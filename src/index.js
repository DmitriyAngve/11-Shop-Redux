import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// 252 REFRESHER / PRACTICE
// CAME FROM .store/index.js
// STEP 4:
// 4.1 "import { Provider } from "react-redux""
// 4.2 Wrap that around "App" and prop our "store".
// 4.3 For that import store.
// 4.4 Add to Provider prop "store={store}"
// 252 REFRESHER / PRACTICE
