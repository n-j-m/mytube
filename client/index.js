
import component from "./component";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "font-awesome/css/font-awesome.css";

import "./css/main.css";

function main() {
  const root = document.querySelector("#root");

  root.appendChild(component());
}

document.addEventListener("DOMContentLoaded", main);
