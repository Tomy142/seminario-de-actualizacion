class WCContactFormController{
    constructor(ui){
        this.ui = ui;
        this.modal = ui.shadowRoot.querySelector('.w3-modal');
    }

    onButtonOpenModalClick(event)
    {
        this.modal.style.display ='block';
    }

    onButtonCloseClick(event)
    {
        this.modal.style.display ='none';
    }
}

customElements.define('x-controller', WCContactFormController);

export{WCContactFormController}