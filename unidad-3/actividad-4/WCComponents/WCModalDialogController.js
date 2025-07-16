class WCModalDialogController{
    constructor(ui){
        this.ui = ui;
        this.display = ui.display;
    }

    onButtonOpenModalClick(event)
    {
        this.display;
    }

    onButtonCloseClick(event)
    {

    }
}

customElements.define('x-controller', WCModalDialogController);

export{WCModalDialogController}