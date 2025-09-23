class TableController{
    constructor(tableElement, modalController, httpHandler = null){
        this.table = tableElement;
        this.modalController = modalController;
        this.httpHandler = httpHandler;
    }

    showUserDetails(userId){
        let self = this;
        let xhr = new XMLHttpRequest();
        if(this.httpHandler){
            this.httpHandler.getUserById(userId)
            .then(function(userData){
                self.modalController.setUserData(userData);
                self.modalController.onButtonOpenModalClick();
            })
            .catch(function(error){
                console.error('Error cargando detalles de usuario: ', error.message);
            });
        }else{
            
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        let userData = JSON.parse(xhr.responseText);
                        self.modalController.setUserData(userData);
                        self.modalController.onButtonOpenModalClick();
                    }else{
                        console.error('Error desplegando detalles de usuario', xhr.statusText);
                    }
                }
            }
        }
    
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/' + userId);
        xhr.send();
    }
}

export{TableController};