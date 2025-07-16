import { WCModalDialogController } from "./WCModalDialogController.js";

class WCModalDialog{
    constructor()
    {
        super()
        this.controller = null;

        this.container = document.createElement('div');
        this.container.classList.add("w3-container");

        this.h2Title = document.createElement('h2');
        this.h2Title.textContent ="W3.CSS Modal";
        
        this.button01 = document.createElement('button');
        this.button01 = document.getElementById('id01');
        this.button01.classList.add("w3-button w3-black");
        this.button01.textContent ="Open Modal";
        this.button01.style = "display: block";
    }
}