import { Table } from "./Components/Table.js";

class CalculatorUI extends HTMLElement
	{
		constructor()
		{
			super();

			const shadow = this.attachShadow({mode: 'open'});

			const style = document.createElement('style');
			style.textContent = `
				:host{
					display: flex;
					justify-content: center;
				}
			`;
			shadow.appendChild(style);

			this.table = new Table();
			shadow.appendChild(this.table);
		}

		/*---Getters--- */

		get display(){return this.table.displayer;}
		get btn0(){return this.table.btnNumber0;}
		get btn1(){return this.table.btnNumber1;}
		get btn2(){return this.table.btnNumber2;}
		get btn3(){return this.table.btnNumber3;}
		get btn4(){return this.table.btnNumber4;}
		get btn5(){return this.table.btnNumber5;}
		get btn6(){return this.table.btnNumber6;}
		get btn7(){return this.table.btnNumber7;}
		get btn8(){return this.table.btnNumber8;}
		get btn9(){return this.table.btnNumber9;}
		get btnDot(){return this.table.btnDot;}
		get btnSub(){return this.table.btnSub;}
		get btnPlus(){return this.table.btnPlus;}
		get btnMultiply(){return this.table.btnMultiply;}
		get btnDivide(){return this.table.btnDivide;}
		get btnCalculate(){return this.table.btnEqual;}
		get btnDelete(){return this.table.btnDelete;}

		connectedCallback()
		{
			//Se va a ejecutar siempre cuando el elemento es insertado en el DOM
			//DOM = Arbol de elementos HTML ya como instancias (objetos) de JS.

		}

		disconnectedCallback()
		{
			//Se va a ejecutar siempre que se quite el elemento del documento
		}

		adoptedCallback()
		{
			//Se va a ejecutar siempre que el elemento se cambie de documento.
		}

		connectedMoveCallback()
		{
			//Se ejecuta cuando se mueve el elemento dentro del DOM
		}

		static get observedAttributes()
		{
			//Solo para publicar cuáles son los atributos que tendría disponible el webcomponent
			//Si es utilizado a través de código HTML
			//Ejemplo: <mi-elemento sabor="acido"> </mi-elemento>

			return ['sabor']
		}

		attributeChangedCallback(attr, newvalue, oldvalue )
		{
			//Manejador de cambios de los valores de los atributos personalizados
		}
	}

	customElements.define('x-calculator', CalculatorUI );

	export{CalculatorUI}
	