import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import { store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor } from "./app/store";

// web3
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";

// // web3 function
function getLibrary(provider) {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App />
        </Web3ReactProvider>,
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
