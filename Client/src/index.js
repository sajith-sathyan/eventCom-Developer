import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./features/user";
import adminReducer from "./features/admin";
import EvnetIdsReducer from "./features/CreateEvent";




const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    eventIDs: EvnetIdsReducer,
   
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
