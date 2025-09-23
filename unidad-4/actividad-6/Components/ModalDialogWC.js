import { ModalDialogController } from "../Controllers/ModalDialogController.js";

class ModalDialogWC extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode :'open'});
        this.data = null;
        this.controller = null;
        this.render();
    }

    render(){

        const w3csslink00= document.createElement('link');
        w3csslink00.rel = 'stylesheet';
        w3csslink00.href = 'https://www.w3schools.com/w3css/4/w3.css';
        this.shadowRoot.appendChild(w3csslink00);

        /*Ventana Modal */
        this.modalContainer = document.createElement('div');
        this.modalContainer.classList.add("w3-modal");
        this.modalContainer.style.display = "none";

        /*Contenido del Modal*/
        this.modalContent = document.createElement('div');
        this.modalContent.classList.add("w3-modal-content", "w3-card-4", "w3-border-black", "w3-display-topmiddle", "w3-margin-top");

        this.span = document.createElement('span');
        this.span.classList.add("w3-button", "w3-display-topright");
        this.span.innerHTML ="&times;";
        /*despues tiene que llamar al controller para ejecutar el close*/

        this.acceptBtn = document.createElement('button');
        this.acceptBtn.classList.add("w3-button", "w3-right", "w3-green", "w3-margin");
        this.acceptBtn.textContent= "Aceptar";
        /*despues tiene que llamar al controller para ejecutar el close*/

        /*ContenedorAddress*/
        this.addressContainer = document.createElement('div');
        this.addressContainer.classList.add("w3-container", "w3-border");

        this.addressTitle = document.createElement('h4');
        this.addressTitle.textContent ="Dirección: ";
        this.addressContainer.appendChild(this.addressTitle);

        this.createAddressFields();
        this.createCompanyFields();

        this.modalContent.appendChild(this.span);
        this.modalContent.appendChild(this.addressContainer);
        this.modalContent.appendChild(this.companyContainer);
        this.modalContent.appendChild(this.acceptBtn);
        this.modalContainer.appendChild(this.modalContent);
        this.shadowRoot.appendChild(this.modalContainer);

        this.setupEventListeners();

        this.controller = new ModalDialogController(this);
    }

    setupEventListeners(){
        let self = this;

        this.span.onclick = function(){
            self.hide();
        };

        this.acceptBtn.onclick = function(){
            self.hide();
        }
    }

    createAddressFields(){

        this.streetSection = document.createElement('div');
        this.streetSection.classList.add("w3-container", "w3-border");
        this.streetSubTitle= document.createElement('h5');
        this.streetSubTitle.textContent ="Calle: ";
        this.streetContent = document.createElement('p');
        this.streetContent.classList.add("w3-container", "w3-border");
        this.streetSection.appendChild(this.streetSubTitle);
        this.streetSection.appendChild(this.streetContent);

        this.suiteSection = document.createElement('div');
        this.suiteSection.classList.add("w3-container", "w3-border");
        this.suiteSubTitle= document.createElement('h5');
        this.suiteSubTitle.textContent ="Suite: ";
        this.suiteContent = document.createElement('p');
        this.suiteContent.classList.add("w3-container", "w3-border");
        this.suiteSection.appendChild(this.suiteSubTitle);
        this.suiteSection.appendChild(this.suiteContent);

        this.citySection = document.createElement('div');
        this.citySection.classList.add("w3-container", "w3-border");
        this.citySubTitle= document.createElement('h5');
        this.citySubTitle.textContent ="Ciudad: ";
        this.cityContent = document.createElement('p');
        this.cityContent.classList.add("w3-container", "w3-border");
        this.citySection.appendChild(this.citySubTitle);
        this.citySection.appendChild(this.cityContent);

        this.zipcodeSection = document.createElement('div');
        this.zipcodeSection.classList.add("w3-container", "w3-border");
        this.zipcodeSubTitle= document.createElement('h5');
        this.zipcodeSubTitle.textContent ="Código Postal: ";
        this.zipcodeContent = document.createElement('p');
        this.zipcodeContent.classList.add("w3-container", "w3-border");
        this.zipcodeSection.appendChild(this.zipcodeSubTitle);
        this.zipcodeSection.appendChild(this.zipcodeContent);

        this.geoSection = document.createElement('div');
        this.geoSection.classList.add("w3-container", "w3-border");
        this.geoSubTitle= document.createElement('h5');
        this.geoSubTitle.textContent ="Geolocalización: ";
        this.geoContent = document.createElement('p');
        this.geoContent.classList.add("w3-container", "w3-border");
        this.geoSection.appendChild(this.geoSubTitle);
        this.geoSection.appendChild(this.geoContent);

        this.addressContainer.appendChild(this.streetSection);
        this.addressContainer.appendChild(this.suiteSection);
        this.addressContainer.appendChild(this.citySection);
        this.addressContainer.appendChild(this.zipcodeSection);
        this.addressContainer.appendChild(this.geoSection);

    }

    createCompanyFields(){

        this.companyContainer = document.createElement('div');
        this.companyContainer.classList.add("w3-container", "w3-border");

        this.companyTitle = document.createElement('h4');
        this.companyTitle.textContent ="Compañia: ";
        this.companyContainer.appendChild(this.companyTitle);

        this.nameSection = document.createElement('div');
        this.nameSection.classList.add("w3-container", "w3-border");
        this.nameSubTitle= document.createElement('h5');
        this.nameSubTitle.textContent ="Nombre: ";
        this.nameContent = document.createElement('p');
        this.nameContent.classList.add("w3-container", "w3-border");
        this.nameSection.appendChild(this.nameSubTitle);
        this.nameSection.appendChild(this.nameContent);

        this.catchSection = document.createElement('div');
        this.catchSection.classList.add("w3-container", "w3-border");
        this.catchSubTitle= document.createElement('h5');
        this.catchSubTitle.textContent ="Eslogan: ";
        this.catchContent = document.createElement('p');
        this.catchContent.classList.add("w3-container", "w3-border");
        this.catchSection.appendChild(this.catchSubTitle);
        this.catchSection.appendChild(this.catchContent);

        this.bsSection = document.createElement('div');
        this.bsSection.classList.add("w3-container", "w3-border");
        this.bsSubTitle= document.createElement('h5');
        this.bsSubTitle.textContent ="Negocio: ";
        this.bsContent = document.createElement('p');
        this.bsContent.classList.add("w3-container", "w3-border");
        this.bsSection.appendChild(this.bsSubTitle);
        this.bsSection.appendChild(this.bsContent);

        this.companyContainer.appendChild(this.nameSection);
        this.companyContainer.appendChild(this.catchSection);
        this.companyContainer.appendChild(this.bsSection);

    }

    setUserData(userData){
        this.data = userData;
        this.updateContent();
    }

    updateContent(){
        if(!this.data)return;

        this.streetContent.textContent = this.data.address.street;
        this.suiteContent.textContent = this.data.address.suite;
        this.cityContent.textContent = this.data.address.city;
        this.zipcodeContent.textContent = this.data.address.zipcode;
        this.geoContent.textContent ="Lat:" + this.data.address.geo.lat +", Lng: " + this.data.address.geo.lng;

        this.nameContent.textContent = this.data.company.name;
        this.catchContent.textContent = this.data.company.catchPhrase;
        this.bsContent.textContent = this.data.company.bs;
    }

    show(){
        this.controller.onButtonOpenModalClick();
    }

    hide(){
        this.controller.onButtonCloseClick();
    }

    connectedCallback(){

    }

    disconnectedCallback(){

    }
}

customElements.define('modal-dialog', ModalDialogWC);

export{ModalDialogWC};