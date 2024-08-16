import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/Store.jsx";
import { Provider } from "react-redux";
import axios from "axios";

const superBaseUrl = import.meta.env.VITE_SUPABASE_URL;

axios.defaults.baseURL = superBaseUrl;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
