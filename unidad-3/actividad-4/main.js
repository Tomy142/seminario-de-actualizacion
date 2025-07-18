import{WCContatcFormUI}from "./WCComponents/WCContatcFormUI.js"
import{WCContatcFormController}from "./WCComponents/WCContatcFormController.js"

function main()
{
    let ui = new WCContatcFormUI();
    let controller = new WCContatcFormController(ui);
    ui.controller = controller;
    document.body.appendChild(ui);
}

window.onload = main;