import{WCModalDialogUI}from "./WCComponents/WCModalDialogUI.js"
import{WCModalDialogController}from "./WCComponents/WCModalDialogController.js"

function main()
{
    let ui = new WCModalDialogUI();
    let controller = new WCModalDialogController(ui);
    ui.controller = controller;
    document.body.appendChild(ui);
}

window.onload = main;