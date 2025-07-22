import { WCContactFormController } from "./WCContactFormController.js";

class WCContactFormUI extends HTMLElement{
    constructor()
    {
        super()
        this.controller = null;
        this.attachShadow({ mode: 'open'});

        this.container = document.createElement('div');
        this.container.classList.add("w3-container");

        this.h2MainTitle = document.createElement('h2');
        this.h2MainTitle.textContent ="W3.CSS Modal";
        
        this.button00 = document.createElement('button');
        this.button00.classList.add("w3-button", "w3-center", "w3-blue");
        this.button00.textContent ="Contact Us";

        const link00 = document.createElement('link');
        link00.rel = 'stylesheet';
        link00.href = 'https://www.w3schools.com/w3css/5/w3.css';

        const link01 = document.createElement('link');
        link01.rel = 'stylesheet';
        link01.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';

        this.shadowRoot.append(link00,link01);

        this.form = document.createElement('form');
        /*this.form.action = "/action_page.php";*/
        this.form.classList.add("w3-container", "w3-card-4", "w3-light-grey", "w3-text-blue", "w3-margin");
        this.form.style.display = "none";


        this.createInputBlock = function(iconClass, name, placeholder){
            let block = document.createElement('div');
            block.className = "w3-row w3-section";

            let iconCol = document.createElement('div');
            iconCol.className = "w3-col";
            iconCol.style.width = "50px";

            let icon = document.createElement('i');
            icon.className = `fa-solid ${iconClass} w3-xxlarge `;
            iconCol.appendChild(icon);

            let inputContainer = document.createElement('div');
            inputContainer.className = "w3-rest";

            let input = document.createElement('input');
            input.className = "w3-input w3-border";
            input.name = name;
            input.placeholder = placeholder;    
            inputContainer.appendChild(input);

            block.appendChild(iconCol);
            block.appendChild(inputContainer);

            return block;
        }.bind(this);

        this.firstNameBlock = this.createInputBlock("fa-user", "first","First Name");
        this.lastNameBlock = this.createInputBlock("fa-user", "last","Last Name");
        this.emailBlock = this.createInputBlock("fa-envelope", "email","Email");
        this.phoneBlock = this.createInputBlock("fa-phone", "phone", "Phone");
        this.messageBlock = this.createInputBlock("fa-pen", "message", "Message");

        this.paragraph00 = document.createElement('p');
        this.paragraph00.classList.add("w3-center");

        this.button01 = document.createElement('button');
        this.button01.classList.add("w3-button", "w3-section", "w3-blue", "w3-ripple");
        this.button01.textContent = "Send";

        this.span = document.createElement('span');
        this.span.classList.add("w3-button", "w3-display-topright");
        this.span.innerHTML ="&times;";

        this.form.appendChild(this.span);
        this.form.appendChild(this.firstNameBlock);
        this.form.appendChild(this.lastNameBlock);
        this.form.appendChild(this.emailBlock);
        this.form.appendChild(this.phoneBlock);
        this.form.appendChild(this.messageBlock);
        this.form.appendChild(this.paragraph00);
        this.paragraph00.appendChild(this.button01);

        this.container.appendChild(this.h2MainTitle);
        this.container.appendChild(this.button00);
        this.container.appendChild(this.form);

        
        this.shadowRoot.append(this.container);
    }

    connectedCallback(){
        if(this.controller){
            this.button00.onclick = this.controller.onButtonOpenFormClick.bind(this.controller);
            this.span.onclick = this.controller.onButtonCloseClick.bind(this.controller);
            this.button01.onclick = this.controller.onButtonSubmitFormClick.bind(this.controller);
        }
    }

    disconnectedCallback(){
        this.button00.onclick = null;
        this.button01.onclick = null;
        this.span.onclick = null;
    }
}

customElements.define('wc-form', WCContactFormUI );

export{WCContactFormUI}