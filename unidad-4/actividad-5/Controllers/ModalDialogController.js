class ModalDialogController{
    constructor(modalElement){
        this.modalElement = modalElement;
        this.modal = modalElement.modalContainer;
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

export{ModalDialogController}