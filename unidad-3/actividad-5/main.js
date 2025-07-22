import{WCContactFormUI}from "./WCComponents/WCContactFormUI.js"
import{WCContactFormController}from "./WCComponents/WCContactFormController.js"

function main()
{
    let ui = new WCContactFormUI();
    let controller = new WCContactFormController(ui);
    ui.controller = controller;
    document.body.appendChild(ui);
}

window.onload = main;