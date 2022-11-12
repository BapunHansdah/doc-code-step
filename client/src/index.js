import React from 'react'
import App from './App'
import store from './store'
import {Provider} from 'react-redux'
import { StrictMode } from "react";
import ReactDOM from "react-dom";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
        <Provider store={store}>
              <App/>
        </Provider>
  </StrictMode>,
  rootElement
);

