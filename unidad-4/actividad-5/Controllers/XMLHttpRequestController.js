
class XMLHttpRequestController{
    constructor(ui){
        this.ui = ui;
    }

    onClearButtonClick(event){
        this.ui.tableElement.clear();
    }

    onRequestButtonClick(event){
        const xhr = new XMLHttpRequest();
        let self = this;
        xhr.onload = function(event){
            self.handlerXhrLoad(xhr);
        };

        xhr.onerror = function(event){
            self.handlerXhrError(xhr);
        };

        xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/');
        xhr.send();
        this.ui.requestBtn.disabled = true;
    }

    handlerXhrLoad(xhr){
        if(xhr.readyState === 4 && xhr.status === 200){
            const data = JSON.parse(xhr.responseText);
            this.ui.tableElement.loadData(data);
        }else{
            console.error(xhr.statusText);
        }
        const self = this;

        setTimeout(function(){self.ui.requestBtn.disabled = false}, 2000);
    }

    handlerXhrError(xhr){
        console.error(xhr.statusText);
        this.ui.requestBtn.disabled = false;
    }
}

export{XMLHttpRequestController}