import { TableWC } from "./TableWC.js";
import { XMLHttpRequestController } from "../Controllers/XMLHttpRequestController.js";
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
        this.tableElement = new TableWC();

        this.requestBtn.className = 'w3-button w3-green w3-round-large';
        this.requestBtn.innerText = 'Efectuar solicitud';

        this.clearBtn.className = 'w3-button w3-red w3-round-large btn-clear';
        this.clearBtn.innerText = 'Limpiar';
        
        this.buttonContainer.appendChild(this.requestBtn);
        this.buttonContainer.appendChild(this.clearBtn);

        this.container.appendChild(this.buttonContainer);
        this.container.appendChild(this.tableElement);
        
        shadow.appendChild(w3csslink01);
        shadow.appendChild(style);
        shadow.appendChild(this.container);

        this.controller = new XMLHttpRequestController(this);
        this.onClearButtonClick = this.controller.onClearButtonClick.bind(this.controller);
        this.onRequestButtonClick = this.controller.onRequestButtonClick.bind(this.controller);
        this.handlerXhrLoad = this.controller.handlerXhrLoad.bind(this.controller);
        this.handlerXhrError = this.controller.handlerXhrError.bind(this.controller); 
    }

    connectedCallback(){
        this.requestBtn.addEventListener('click', this.onRequestButtonClick);
        this.clearBtn.addEventListener('click', this.onClearButtonClick);
    }

    disconnectedCallback(){
        this.requestBtn.removeEventListener('click', this.onRequestButtonClick);
        this.clearBtn.removeEventListener('click', this.onClearButtonClick);
    }
}

customElements.define('x-request', XMLHttpRequestExample);

export{XMLHttpRequestExample}
