import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/Store.jsx";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "https://inventory-app-api-a21q.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
