class ViewEventController{
    constructor(uiElement, httpHandler, tableElement){
        this.ui = uiElement;
        this.httpHandler = httpHandler;
        this.tableElement = tableElement;
    }

    onRequestButtonClick(event){
        let self = this;
        this.ui.requestBtn.disabled = true;
        this.httpHandler.getUser()
            .then(function(data){
                self.tableElement.loadData(data);
            })
            .catch(function(error){
                console.error('Request error:', error.message);
                self.ui.requestBtn.disabled = false;
            });
    }

    onClearButtonClick(event){
        this.tableElement.clear();
    }

    setLoadingState(isLoading){
        this.ui.requestBtn.disabled = isLoading;
        this.ui.requestBtn.textContent = isLoading ? 'Cargando...' : 'Efectuar solicitud';
    }
}

export{ ViewEventController }