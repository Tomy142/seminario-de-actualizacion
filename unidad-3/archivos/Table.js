class Table extends HTMLElement
{
    constructor()
    {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent =`
            .table-panel{
                margin-left: 5px;
                width: 300px;
                padding: 5px;
                box-sizing: border-box;
            }

            table{
                width: 100%;
                border-collapse: collapse;
                background-color: #979797;
            }

            th, td{
                padding: 8px;
                border: 1px solid #ccc;
                text-align: left;
                background-color: #979797;
            }
            
            td input[type="radio"]{
                display: block;
                margin: auto;
            }
        `;

        const tablePanel = document.createElement('div');
        tablePanel.className = 'table-panel';
        
        this.table = document.createElement('table');
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');

        const thId = document.createElement('th');
        thId.textContent = 'ID'; 
        const thName = document.createElement('th');
        thName.textContent = 'Nombre'; 
        const thSelect= document.createElement('th');
        thSelect.textContent = 'Seleccionar'; 

        trHead.appendChild(thId);
        trHead.appendChild(thName);
        trHead.appendChild(thSelect);
        thead.appendChild(trHead);
        this.table.appendChild(thead);

        this.tbody = document.createElement('tbody');
        this.table.appendChild(this.tbody);

        tablePanel.appendChild(this.table);
        shadow.appendChild(style);
        shadow.appendChild(tablePanel);
    }

    addRow(id, name){
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = id;

        const tdName = document.createElement('td');
        tdName.textContent = name;

        const tdSelect = document.createElement('td');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'figuraSeleccionada';
        radio.value = id;
        tdSelect.appendChild(radio);

        radio.addEventListener('change',() =>{
            this.dispatchEvent(new CustomEvent('figureSelectionChanged',{
                detail:{id: id},
                bubbles: true,
                composed: true
            }));
        });
        
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdSelect);

        this.tbody.appendChild(tr);
    }

    getSelectedFigureId(){
        const selected = this.tbody.querySelector('input[type="radio"]:checked');
        return selected ? selected.value : null;
    }
}

customElements.define('table-wc', Table);

export{Table};