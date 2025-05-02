import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import model from "./model/model.js";
import {History} from "./model/history";


import { observable, configure } from "mobx";
configure({ enforceActions: "never" }); // we don't use Mobx actions
const reactiveModel = observable(model);


const root = ReactDOM.createRoot(globalThis.document.getElementById("root"));
root.render(
    <App model={reactiveModel}/>
);


// ------ for debug purposes ----------
globalThis.window.myModel = model; // make the model available in the Console

