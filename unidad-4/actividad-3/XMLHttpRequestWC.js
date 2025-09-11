import { TableWC } from "./TableWC.js";
class XMLHttpRequestExample extends HTMLElement{
    constructor(){
        super();
        
        const shadow = this.attachShadow({mode: 'open'});
        
        const style = document.createElement('style');
        style.textContent=`
            .container{
                padding: 20px;
                font-family: Arial, sans-serif;
            }
            
            button{
                padding: 12px 20px;
                margin: 0 10px 20px 0;
                border: none;
                border-radius: 4px;
                background-color: #007bff;
                color: white;
                font-size: 14px;
                cursor: pointer;
            }
            
            button.clear{
                background-color: #dc3545;
            }
        `;
        

        this.container = document.createElement('div');
        this.container.className ='container';

        this.requestBtn = document.createElement('button');
        this.clearBtn = document.createElement('button');
        this.tableElement = document.createElement('table-wc');
        
        this.requestBtn.innerText = 'Efectuar solicitud';

        this.clearBtn.innerText = 'Limpiar';
        this.clearBtn.className = 'clear';

        this.container.appendChild(this.requestBtn);
        this.container.appendChild(this.clearBtn);
        this.container.appendChild(this.tableElement);
        
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
        const self = this;
        const xhr = new XMLHttpRequest();

        xhr.onload = function(event){
            self.handlerXhrLoad.call(self, xhr);
        };

        xhr.onerror = function (event){
            self.handlerXhrError.call(self, xhr);
            console.error(xhr.statusText);
            this.requestBtn.disabled = false;
        };

        xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
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
        setTimeout(()=>{this.requestBtn.disabled = false}, 2000);
    }

    handlerXhrError(xhr){
        this.requestBtn.disabled = false;
    }

    connectedCallback(){
        this.requestBtn.addEventListener('click', this.onRequestButtonClick);
        this.clearBtn.addEventListener('click', this.onClearButtonClick);
    }

    disconnectedCallback(){
        this.requestBtn.onclick = null;
    }
}

customElements.define('x-request', XMLHttpRequestExample);

export{XMLHttpRequestExample}
