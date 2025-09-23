import { HttpRequestHandler } from "../Handlers/HttpRequestHandler.js";
import { ViewEventController } from "./ViewEventController.js";

class XMLHttpRequestController{
    constructor(uiElement, tableElement){
        this.httpHandler = new HttpRequestHandler();
        this.uiController = new ViewEventController(uiElement, this.httpHandler, tableElement);
    }

    onClearButtonClick(event){
        this.uiController.onClearButtonClick(event);
    }

    onRequestButtonClick(event){
        this.uiController.onRequestButtonClick(event);
    }
}

export{XMLHttpRequestController}