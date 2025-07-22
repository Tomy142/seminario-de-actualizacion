import { WCModalDialogController } from "./WCModalDialogController.js";

class WCModalDialogUI extends HTMLElement{
    constructor()
    {
        super()
        this.controller = null;
        this.attachShadow({ mode: 'open'});

        this.container = document.createElement('div');
        this.container.classList.add("w3-container");

        this.h2Title = document.createElement('h2');
        this.h2Title.textContent ="W3.CSS Modal";
        
        this.button01 = document.createElement('button');
        this.button01.classList.add("w3-button", "w3-black");
        this.button01.textContent ="Open Modal";
        /*this.button01.style = "display: block";*/

        this.divModal = document.createElement('div');
        this.divModal.classList.add("w3-modal");
        this.divModal.style.display = "none";

        this.divModalContent = document.createElement('div');
        this.divModalContent.classList.add("w3-modal-content");

        this.divModalContainer = document.createElement('div');
        this.divModalContainer.classList.add("w3-container");

        this.span = document.createElement('span');
        this.span.classList.add("w3-button", "w3-display-topright");
        this.span.innerHTML ="&times;";

        this.acceptBtn = document.createElement('button');
        this.acceptBtn.classList.add("w3-button", "w3-display-bottomright", "w3-green");
        this.acceptBtn.textContent= "Aceptar";
        
        this.paragraph00 = document.createElement('p');
        this.paragraph00.textContent ="Some text. Some text. Some text.";
        
        this.paragraph01 = document.createElement('p');
        this.paragraph01.textContent ="Some text. Some text. Some text.";

        this.divModalContainer.appendChild(this.span);
        this.divModalContainer.appendChild(this.acceptBtn);
        this.divModalContainer.appendChild(this.paragraph00);
        this.divModalContainer.appendChild(this.paragraph01);

        this.divModalContent.appendChild(this.divModalContainer);

        this.divModal.appendChild(this.divModalContent);

        this.container.appendChild(this.h2Title);
        this.container.appendChild(this.button01);
        this.container.appendChild(this.divModal);

        const styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.href = 'https://www.w3schools.com/w3css/5/w3.css'

        this.shadowRoot.append(styles,this.container);
    }

    connectedCallback(){
        if(this.controller){
            this.button01.onclick = this.controller.onButtonOpenModalClick.bind(this.controller);
            this.span.onclick = this.controller.onButtonCloseClick.bind(this.controller);
            this.acceptBtn.onclick = this.controller.onButtonCloseClick.bind(this.controller);
        }
    }

    disconnectedCallback(){
        this.button01.onclick = null;
        this.span.onclick = null;
        this.acceptBtn.onclick = null;
    }
}

customElements.define('wc-modal', WCModalDialogUI );

export{WCModalDialogUI}