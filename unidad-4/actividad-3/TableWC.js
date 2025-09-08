
class TableWC extends HTMLElement{
    constructor(){
        super();

        const shadow = this.attachShadow({mode:'open'});

        const style = document.createElement('style');
        style.textContent =`
            .table-container{
                margin: 20px 0;
                overflow-x: auto;
            }

            .data-table{
                width: 100%;
                border-collapse: collapse;
                background-color: #979797;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .data-table th{
                background-color: #f5f5f5;
                padding: 12px;
                text-align: left;
                font-weight: bold;
                border-bottom: 2px solid #ddd;
                color: #333;
            }

            .data-table td{
                padding: 10px 12px;
                border-bottom: 1px solid #eee;
                color: black;
            }
        `;
        shadow.appendChild(style);

        this.container = document.createElement('div');
        this.container.className = 'table-container';

        this.table = document.createElement('table');
        this.table.className = 'data-table';

        this.container.appendChild(this.table);
        shadow.appendChild(this.container);
    }

    formatHeader(header){
        return header
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    formatCellContent(content){
        if(typeof content === 'object'){
            return JSON.stringify(content);
        }
        return content;
    }

    loadData(data){
        this.table.textContent = '';
        
        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');

        //Obtener key del primer objeto
        let columns = Object.keys(data[0]);

        columns.forEach(column =>{
            let th = document.createElement('th');
            th.textContent = this.formatHeader(column);
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        this.table.appendChild(thead);

        let tbody = document.createElement('tbody');

        data.forEach(item=>{
            let row = document.createElement('tr');
            columns.forEach(column=>{
                let td = document.createElement('td');
                td.textContent = this.formatCellContent(item[column]);
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });

        this.table.appendChild(tbody);
    }

    clear(){
        this.table.textContent = '';
    }
}

customElements.define('table-wc', TableWC);

export{TableWC};