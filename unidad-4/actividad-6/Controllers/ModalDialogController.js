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

    setUserData(userData){
        this.modalElement.setUserData(userData);
    }
}

export{ModalDialogController}