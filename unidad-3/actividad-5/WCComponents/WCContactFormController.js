class WCContactFormController{
    constructor(ui){
        this.ui = ui;
        this.form = ui.shadowRoot.querySelector('form');
    }

    onButtonOpenFormClick(event)
    {
        this.form.style.display ='block';
    }

    onButtonCloseClick(event)
    {
        this.form.style.display ='none';
    }

    onButtonSubmitFormClick(event){
        this.onButtonCloseClick();
        window.alert("Su consulta fue recibida. A la brevedad lo contactaremos. Gracias");
    }
    
}

customElements.define('x-controller', WCContactFormController);

export{WCContactFormController}