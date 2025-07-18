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
        this.form.action("/action_page.php");
        this.form.classList.add("w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin");

        this.h2Title = document.createElement('h2');
        this.h2Title.classList.add("w3-center");
        this.h2Title.textContent ="Contact us";

        /*-------Seccion  Name-------*/
        this.divSection00 = document.createElement('div');
        this.divSection00.classList.add("w3-row w3-section");

        this.divCol00 = document.createElement('div');
        this.divCol00.classList.add("w3-col");
        this.divCol00.style = "width:50px";

        this.icon00 = document.createElement('i');
        this.icon00.classList.add("w3-xxlarge fa fa-user");

        this.divRest00 = document.createElement('div');
        this.divRest00.classList.add("w3-rest");

        this.input00 = document.createElement('input');
        this.input00.classList.add("w3-input w3-border");
        this.input00.name ="first";
        this.input00.type ="text";
        this.input00.placeholder ="First Name";

        /*-------Seccion  Surname-------*/
        this.divSection01 = document.createElement('div');
        this.divSection01.classList.add("w3-row w3-section");

        this.divCol01 = document.createElement('div');
        this.divCol01.classList.add("w3-col");
        this.divCol01.style = "width:50px";

        this.icon01 = document.createElement('i');
        this.icon01.classList.add("w3-xxlarge fa fa-user");

        this.divRest01 = document.createElement('div');
        this.divRest01.classList.add("w3-rest");

        this.input01 = document.createElement('input');
        this.input01.classList.add("w3-input w3-border");
        this.input01.name ="last";
        this.input01.type ="text";
        this.input01.placeholder ="Last Name";

        /*-------Seccion  Email-------*/
        this.divSection01 = document.createElement('div');
        this.divSection01.classList.add("w3-row w3-section");

        this.divCol01 = document.createElement('div');
        this.divCol01.classList.add("w3-col");
        this.divCol01.style = "width:50px";

        this.icon01 = document.createElement('i');
        this.icon01.classList.add("w3-xxlarge fa fa-user");

        this.divRest01 = document.createElement('div');
        this.divRest01.classList.add("w3-rest");

        this.input01 = document.createElement('input');
        this.input01.classList.add("w3-input w3-border");
        this.input01.name ="last";
        this.input01.type ="text";
        this.input01.placeholder ="Last Name";


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
        this.acceptBtn.classList.add("w3-button", "w3-display-bottomleft", "w3-green");
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

customElements.define('wc-form', WCContactFormUI );

export{WCContactFormUI}