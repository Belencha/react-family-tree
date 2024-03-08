import React from "react";
import ReactDOM from "react-dom";
import Tree from "./Tree/Tree";
import { simpsonsTree } from "./data";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Tree root="abe" datalist={JSON.parse(JSON.stringify(simpsonsTree))} />,
  document.getElementById("root")
);

registerServiceWorker();
