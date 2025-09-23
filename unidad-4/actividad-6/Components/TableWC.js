import { ModalDialogController } from "../Controllers/ModalDialogController.js";
import { ModalDialogWC } from "./ModalDialogWC.js";
import{ TableController } from "../Controllers/TableController.js"

class TableWC extends HTMLElement{
    constructor(modal, modalController, tableController){
        super();

        this.attachShadow({mode: 'open'});

        const w3csslink00= document.createElement('link');
        w3csslink00.rel = 'stylesheet';
        w3csslink00.href = 'https://www.w3schools.com/w3css/4/w3.css';

        const style = document.createElement('style');
        style.textContent = `
            .w3-table tr:hover {
                background-color: #606b7cff !important;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .email-tag{
                background-color: rgba(73, 5, 163, 1);
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.9em;
                display: inline-block;
            }

            .website-link{
                color: #2196f3;
                text-decoration: none;
            }

            .website-link:hover{
                text-decoration: underline;
                color: #eeeeeeff;
            }
        `;

        this.container = document.createElement('div');
        this.container.className = 'w3-container';

        this.table = document.createElement('table');
        this.table.className = 'w3-table w3-striped w3-bordered w3-card-4';

        this.container.appendChild(this.table);
        this.shadowRoot.appendChild(w3csslink00);
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(this.container);

        this.modal = modal;
        this.modalController = modalController;
        this.tableController = tableController;
        this.shadowRoot.appendChild(this.modal);

        this.fullData = null;
    }

    loadData(data){
        this.fullData = data;
        this.clearTable();
        
        if(!data || data.length === 0){
            this.showNoData();
            return;
        }

        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        headerRow.className = 'w3-indigo';

        const customHeaders=['ID', 'Usuario', 'Nombre', 'Correo', 'Web', 'Celular'];

        for(let i = 0 ; i < customHeaders.length; i++){
            let th = document.createElement('th');
            th.textContent = customHeaders[i];
            headerRow.appendChild(th);
        }

        thead.appendChild(headerRow);
        this.table.appendChild(thead);

        let tbody = document.createElement('tbody');

        for(let j = 0; j < data.length; j++){

            let user = data[j];
            let row = document.createElement('tr');

            let tdId = document.createElement('td');
            tdId.textContent = user.id;
            row.appendChild(tdId);

            let tdUser = document.createElement('td');
            tdUser.textContent = user.username;
            row.appendChild(tdUser);

            let tdName = document.createElement('td');
            tdName.textContent = user.name;
            row.appendChild(tdName);

            let tdEmail = document.createElement('td');
            let emailTag = document.createElement('span');
            emailTag.className = 'w3-tag w3-round-large  email-tag';
            emailTag.textContent = user.email;
            tdEmail.appendChild(emailTag);
            row.appendChild(tdEmail);

            let tdWeb = document.createElement('td');
            let websiteLink = document.createElement('a');
            websiteLink.className = 'website-link';
            websiteLink.href =`http://${user.website}`;
            websiteLink.target = '_blank';
            websiteLink.textContent = user.website;
            tdWeb.appendChild(websiteLink);
            row.appendChild(tdWeb);

            let tdPhone = document.createElement('td');
            tdPhone.textContent = user.phone;
            row.appendChild(tdPhone);

            tbody.appendChild(row);
        }

        this.table.appendChild(tbody);

        this.addRowClickListeners();
    }

    addRowClickListeners(){
        let rows = this.table.querySelectorAll('tbody tr');
        let self = this;

        for(let i = 0; i < rows.length; i++){
            rows[i].style.cursor = 'pointer';
            rows[i].onclick = function(){
                let userId = this.querySelector('td:first-child').textContent;
                self.tableController.showUserDetails(userId);
            };
        }
    }

    clearTable(){
        while(this.table.firstChild){
            this.table.removeChild(this.table.firstChild);
        }
    }


    showNoData(){
        const row = document.createElement('tr');
        const cell = document.createElement('td');

        cell.colSpan = 6;
        cell.textContent = 'No hay datos disponibles';
        cell.className = 'w3-center  w3-padding-16';
        cell.style.color = '#666';
        row.appendChild(cell);
        this.table.appendChild(row);
    }

    clear(){
        this.clearTable();
        this.showNoData();
    }
}

customElements.define('table-wc', TableWC);

export{TableWC};