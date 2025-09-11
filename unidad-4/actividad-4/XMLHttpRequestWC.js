import { TableWC } from "./TableWC.js";
class XMLHttpRequestExample extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});

        const w3csslink01= document.createElement('link');
        w3csslink01.rel = 'stylesheet';
        w3csslink01.href = 'https://www.w3schools.com/w3css/4/w3.css';

        const style = document.createElement('style');
        style.textContent=`
            .container{
                padding: 20px;
                font-family: Arial, sans-serif;
            }
            
            .w3-card{
                margin: 20px 0;
            }

            button-container{
                padding: 16px;
                background-color: #f5f5f5;
                border-bottom: 1px solid #ddd;
            }
            
            button.clear{
                background-color: #dc3545;
            }
        `;
        

        this.container = document.createElement('div');
        this.container.className ='container';

        this.card = document.createElement('div');
        this.card.className = 'w3-card-4';

        this.buttonContainer = document.createElement('div');
        this.buttonContainer.className = 'w3-container button-container';

        this.requestBtn = document.createElement('button');
        this.clearBtn = document.createElement('button');
        this.tableElement = document.createElement('table-wc');
        
        this.requestBtn.className = 'w3-button w3-green w3-round-large';
        this.requestBtn.innerText = 'Efectuar solicitud';

        this.clearBtn.innerText = 'Limpiar';
        this.clearBtn.className = 'w3-button w3-red w3-round-large';

        
        this.buttonContainer.appendChild(this.requestBtn);
        this.buttonContainer.appendChild(this.clearBtn); 

        this.container.appendChild(this.buttonContainer);
        this.container.appendChild(this.tableElement);
        
        shadow.appendChild(w3csslink01);
        shadow.appendChild(style);
        shadow.appendChild(this.container);

        this.onClearButtonClick = this.onClearButtonClick.bind(this);
        this.onRequestButtonClick = this.onRequestButtonClick.bind(this);
        this.handlerXhrLoad = this.handlerXhrLoad.bind(this);
        this.handlerXhrError = this.handlerXhrError.bind(this); 
    }

    onClearButtonClick(event){
        this.tableElement.clear();
    }

    onRequestButtonClick(event){
        const xhr = new XMLHttpRequest();
        let self = this;

        xhr.onload = function(event){

            self.handlerXhrLoad(xhr);
        };

        xhr.onerror = function (event){
            self.handlerXhrError(xhr);
        };

        xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/');
        xhr.send();
        this.requestBtn.disabled = true;
    }

    handlerXhrLoad(xhr){
        if(xhr.readyState === 4 && xhr.status === 200){
                const data = JSON.parse(xhr.responseText);
                this.tableElement.loadData(data);
            }else{
                console.error(xhr.statusText);
            }
            const self = this;

            setTimeout(function(){self.requestBtn.disabled = false}, 2000);
    }

    handlerXhrError(xhr){
        console.error(xhr.statusText);
        this.requestBtn.disabled = false;
    }
    connectedCallback(){
        this.requestBtn.onclick = this.onRequestButtonClick.bind(this);
        this.clearBtn.onclick = this.onClearButtonClick.bind(this);
    }

    disconnectedCallback(){
        this.requestBtn.onclick = null;
    }
}

customElements.define('x-request', XMLHttpRequestExample);

export{XMLHttpRequestExample}
