import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./assets/css/index.css";
import store from "./redux/store/store";
import RouterList from "./routes/RouterList";

const queryMovie = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryMovie}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_ID}>
        {/* ... */}
        <RouterList />
      </GoogleOAuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  </Provider>
  </React.StrictMode>
);
