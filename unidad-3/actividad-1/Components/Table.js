class Table extends HTMLElement
{
    constructor()
    {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.textContent = `
            table{
                background-color: rgb(31, 31, 31);
                margin-top:10%;
                width: 400px;
                height:400px;
                padding: 10px 10px 10px 10px;
                border-radius: 5%;
            }

            input{
                color: black;
                font-family: Arial;
                font-weight: bold;
                font-size: 200%;
                height: 60px;
                width: 99%;
                border-radius: 5px;
                border-color: rgb(76, 83, 97);;
                box-shadow: 2px rgb(76, 83, 97);
            }

            .btn_N{
                color: white;
                font-family: Arial;
                font-weight: bold;
                font-size: 100%;
                background-color: rgb(0, 81, 255);
                box-shadow: 0px 5px rgb(45, 112, 255);
                width: 100%;
                height: 40px;
                border-radius: 6px;
                border-color: rgb(45, 112, 255);
            }

            .btn_R{
                color: white;
                font-family: Arial;
                font-weight: bold;
                font-size: 100%;
                background-color: rgb(221, 170, 31);
                box-shadow: 0px 5px rgb(255, 227, 150);
                width: 100%;
                height: 40px;
                border-radius: 6px;
                border-color: rgb(255, 227, 150);
            }

            .btn_A{
                color: white;
                font-family: Arial;
                font-weight:600;
                font-size: 100%;
                background-color: rgb(125, 192, 119);
                box-shadow: 0px 5px rgb(148, 199, 143);
                width: 100%;
                height: 40px;
                border-radius: 6px;
                border-color: rgb(148, 199, 143);
            }


            .btn_D{
                color: white;
                font-family: Arial;
                font-weight: bold;
                font-size: 100%;
                margin-left: 90px;

                background-color: red;
                box-shadow: 0px 5px #BB3E22;

                width: 50%;
                height: 40px;

                border-radius: 6px;
                border-color: #BB3E22;

            }
        `
        /*----Crear tabla----*/
        const table = document.createElement('table');
        const trow1 = document.createElement('tr');
        const trow2 = document.createElement('tr');
        const trow3 = document.createElement('tr');
        const trow4 = document.createElement('tr');
        const trow5 = document.createElement('tr');
        const trow6 = document.createElement('tr');
        
        /*----Input----*/
        const tdDisplay = document.createElement('td');
        tdDisplay.colSpan = 4;
        this.displayer = document.createElement('input');
        this.displayer.className = 'input';
        this.displayer.type = 'text';
        tdDisplay.appendChild(this.displayer);
        trow1.appendChild(tdDisplay);
        table.appendChild(trow1);

        /*---Row-2--- */
        this.btnNumber7 = document.createElement('button');
        this.btnNumber7.className = 'btn_N';
        this.btnNumber7.innerText = '7';
        const td7 = document.createElement('td');
        td7.appendChild(this.btnNumber7);
        trow2.appendChild(td7);

        this.btnNumber8 = document.createElement('button');
        this.btnNumber8.className = 'btn_N';
        this.btnNumber8.innerText = '8';
        const td8 = document.createElement('td');
        td8.appendChild(this.btnNumber8);
        trow2.appendChild(td8);

        this.btnNumber9 = document.createElement('button');
        this.btnNumber9.className = 'btn_N';
        this.btnNumber9.innerText = '9';
        const td9 = document.createElement('td');
        td9.appendChild(this.btnNumber9);
        trow2.appendChild(td9);

        this.btnPlus = document.createElement('button');
        this.btnPlus.className = 'btn_A';
        this.btnPlus.innerText = '+';
        const tdPlus = document.createElement('td');
        tdPlus.appendChild(this.btnPlus);
        trow2.appendChild(tdPlus);

        table.appendChild(trow2);

        /*---Row-3--- */
        this.btnNumber4 = document.createElement('button');
        this.btnNumber4.className = 'btn_N';
        this.btnNumber4.innerText = '4';
        const td4 = document.createElement('td');
        td4.appendChild(this.btnNumber4);
        trow3.appendChild(td4);

        this.btnNumber5 = document.createElement('button');
        this.btnNumber5.className = 'btn_N';
        this.btnNumber5.innerText = '5';
        const td5 = document.createElement('td');
        td5.appendChild(this.btnNumber5);
        trow3.appendChild(td5);

        this.btnNumber6 = document.createElement('button');
        this.btnNumber6.className = 'btn_N';
        this.btnNumber6.innerText = '6';
        const td6 = document.createElement('td');
        td6.appendChild(this.btnNumber6);
        trow3.appendChild(td6);

        this.btnSub = document.createElement('button');
        this.btnSub.className = 'btn_A';
        this.btnSub.innerText = '-';
        const tdSub = document.createElement('td');
        tdSub.appendChild(this.btnSub);
        trow3.appendChild(tdSub);

        table.appendChild(trow3);

        /*---Row-4--- */
        this.btnNumber1 = document.createElement('button');
        this.btnNumber1.className = 'btn_N';
        this.btnNumber1.innerText = '1';
        const td1 = document.createElement('td');
        td1.appendChild(this.btnNumber1);
        trow4.appendChild(td1);

        this.btnNumber2 = document.createElement('button');
        this.btnNumber2.className = 'btn_N';
        this.btnNumber2.innerText = '2';
        const td2 = document.createElement('td');
        td2.appendChild(this.btnNumber2);
        trow4.appendChild(td2);

        this.btnNumber3 = document.createElement('button');
        this.btnNumber3.className = 'btn_N';
        this.btnNumber3.innerText = '3';
        const td3 = document.createElement('td');
        td3.appendChild(this.btnNumber3);
        trow4.appendChild(td3);

        this.btnMultiply = document.createElement('button');
        this.btnMultiply.className = 'btn_A';
        this.btnMultiply.innerText = '*';
        const tdMultiply = document.createElement('td');
        tdMultiply.appendChild(this.btnMultiply);
        trow4.appendChild(tdMultiply);

        table.appendChild(trow4);

        /*---Row-5-- */
        this.btnNumber0 = document.createElement('button');
        this.btnNumber0.className = 'btn_N';
        this.btnNumber0.innerText = '0';
        const td0 = document.createElement('td');
        td0.appendChild(this.btnNumber0);
        trow5.appendChild(td0);

        this.btnDot = document.createElement('button');
        this.btnDot.className = 'btn_N';
        this.btnDot.innerText = '.';
        const tdDot = document.createElement('td');
        tdDot.appendChild(this.btnDot);
        trow5.appendChild(tdDot);

        this.btnDivide = document.createElement('button');
        this.btnDivide.className = 'btn_A';
        this.btnDivide.innerText = '/';
        const tdDivide = document.createElement('td');
        tdDivide.appendChild(this.btnDivide);
        trow5.appendChild(tdDivide);


        this.btnEqual = document.createElement('button');
        this.btnEqual.className = 'btn_R';
        this.btnEqual.innerText = '=';
        const tdEqual = document.createElement('td');
        tdEqual.appendChild(this.btnEqual);
        trow5.appendChild(tdEqual);

        table.appendChild(trow5);

        /*---Row-6---- */

        this.btnDelete = document.createElement('button');
        this.btnDelete.className = 'btn_D';
        this.btnDelete.innerText = 'Borrar';
        const tdDelete = document.createElement('td');
        tdDelete.colSpan = 4;
        tdDelete.appendChild(this.btnDelete);
        trow6.appendChild(tdDelete);

        table.appendChild(trow6);
        
        /*--Shadow-Childs--*/
        shadow.appendChild(style);
        shadow.appendChild(table);
    }
}

customElements.define('x-table', Table);
export{Table};