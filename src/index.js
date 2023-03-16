import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store";
import "./sass/index.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/reenbit-test-task">
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
);
