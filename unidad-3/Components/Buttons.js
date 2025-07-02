class Buttons extends HTMLElement
{
    constructor()
    {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.textContent = `
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
        /*----Numbers----*/
        this.btnNumber7.style('btn_N');
        this.btnNumber7.innerText = '7';

        this.btnNumber8.style('btn_N');
        this.btnNumber8.innerText = '8';

        this.btnNumber9.style('btn_N');
        this.btnNumber9.innerText = '9';

        this.btnNumber4.style('btn_N');
        this.btnNumber4.innerText = '4';

        this.btnNumber5.style('btn_N');
        this.btnNumber5.innerText = '5';

        this.btnNumber6.style('btn_N');
        this.btnNumber6.innerText = '6';

        this.btnNumber1.style('btn_N');
        this.btnNumber1.innerText = '1';

        this.btnNumber2.style('btn_N');
        this.btnNumber2.innerText = '2';

        this.btnNumber3.style('btn_N');
        this.btnNumber3.innerText = '3';

        this.btnNumber0.style('btn_N');
        this.btnNumber0.innerText = '0';

        this.btnNumberDot.style('btn_N');
        this.btnNumberDot.innerText = '.';

        /*----Operators----*/
        this.btnOperator.style('btn_A');
        this.btnPlus.innerText = '+';

        this.btnNumber7.style('btn_N');
        this.btnSub.innerText = '-';

        this.btnNumber7.style('btn_N');
        this.btnMultiply.innerText = '*';

        this.btnNumber7.style('btn_N');
        this.btnDivide.innerText = '/';

        /*Equal*/
        this.btnEqual.style('btn_R');
        this.btnEqual.innerText = '=';
        
        /*Delete*/
        this.btnDelete.style('btn_D');
        this.btnDelete.innerText = 'Borrar';
    }
}