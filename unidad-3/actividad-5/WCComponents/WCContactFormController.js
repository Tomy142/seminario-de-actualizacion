class WCContactFormController{
    constructor(ui){
        this.ui = ui;
        this.modal = null;
    }

    onButtonOpenModalClick(event)
    {
        window.alert("Su consulta fue recibida. A la brevedad lo contactaremos. Gracias");
    }

    onButtonCloseClick(event)
    {
        
    }
}

customElements.define('x-controller', WCContactFormController);

export{WCContactFormController}