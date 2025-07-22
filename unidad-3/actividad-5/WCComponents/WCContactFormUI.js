import { WCContactFormController } from "./WCContactFormController.js";

class WCContactFormUI extends HTMLElement{
    constructor()
    {
        super()
        this.controller = null;
        this.attachShadow({ mode: 'open'});

        const link00 = document.createElement('link');
        link00.rel = 'stylesheet';
        link00.href = 'https://www.w3schools.com/w3css/5/w3.css';

        const link01 = document.createElement('link');
        link01.rel = 'stylesheet';
        link01.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

        this.form = document.createElement('form');
        this.form.action = "/action_page.php";
        this.form.classList.add("w3-container", "w3-card-4", "w3-light-grey", "w3-text-blue", "w3-margin");

        this.h2Title = document.createElement('h2');
        this.h2Title.classList.add("w3-center");
        this.h2Title.textContent ="Contact Us";

        this.createInputBlock = function(iconClass, name, placeholder){
            let block = document.createElement('div');
            block.className = "w3-row w3-section";

            let iconCol = document.createElement('div');
            iconCol.className = "w3-col";
            iconCol.style.width = "50px";

            let icon = document.createElement('i');
            icon.className = "w3-xxlarge " + iconClass;
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

        this.firstNameBlock = this.createInputBlock("fa fa-user", "first","First Name");
        this.lastNameBlock = this.createInputBlock("fa fa-user", "last","Last Name");
        this.emailBlock = this.createInputBlock("fa fa-envelope-o", "email","Email");
        this.phoneBlock = this.createInputBlock("fa fa-phone", "phone", "Phone");
        this.messageBlock = this.createInputBlock("fa fa-pencil", "message", "Message");

        this.paragraph00 = document.createElement('p');
        this.paragraph00.classList.add("w3-center");

        this.button00 = document.createElement('button');
        this.button00.classList.add("w3-button", "w3-section", "w3-blue", "w3-ripple");
        this.button00.textContent = "Send";

        this.form.appendChild(this.h2Title);
        this.form.appendChild(this.firstNameBlock);
        this.form.appendChild(this.lastNameBlock);
        this.form.appendChild(this.emailBlock);
        this.form.appendChild(this.phoneBlock);
        this.form.appendChild(this.messageBlock);
        this.form.appendChild(this.paragraph00);
        this.paragraph00.appendChild(this.button00);

        const styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.href = 'https://www.w3schools.com/w3css/5/w3.css'

        this.shadowRoot.append(link00,link01,this.form);
    }

    connectedCallback(){
        if(this.controller){
            this.button00.onclick = this.controller.onButtonOpenModalClick.bind(this.controller);
        }
    }

    disconnectedCallback(){
        this.button01.onclick = null;
        this.span.onclick = null;
        this.acceptBtn.onclick = null;
    }
}

customElements.define('wc-form', WCContactFormUI );

export{WCContactFormUI}