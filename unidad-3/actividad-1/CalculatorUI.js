import { CalculatorController } from "./CalculatorController.js";

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
			`;
			shadow.appendChild(style);
			
			this.controller = null;

			const table = document.createElement('table');
			shadow.appendChild(table);
			
			/*----Input----*/
			const rowDisplay = table.insertRow();
			const cellDisplay = rowDisplay.insertCell();
			cellDisplay.colSpan = 4;
			this.display = document.createElement('input');
			this.display.type = 'text';
			this.display.readOnly = true;

			cellDisplay.appendChild(this.display);

			let buttons =[
				[{txt: '7', prop:'btn7', cls:'btn_N'}, {txt: '8', prop:'btn8', cls:'btn_N'}, {txt: '9', prop:'btn9', cls:'btn_N'}, {txt: '/', prop:'btnDivide', cls:'btn_A'}],
				[{txt: '4', prop:'btn4', cls:'btn_N'}, {txt: '5', prop:'btn5', cls:'btn_N'}, {txt: '6', prop:'btn6', cls:'btn_N'}, {txt: '*', prop:'btnMultiply', cls:'btn_A'}],
				[{txt: '1', prop:'btn1', cls:'btn_N'}, {txt: '2', prop:'btn2', cls:'btn_N'}, {txt: '3', prop:'btn3', cls:'btn_N'}, {txt: '-', prop:'btnSub', cls:'btn_A'}],
				[{txt: '0', prop:'btn0', cls:'btn_N'}, {txt: '.', prop:'btnDot', cls:'btn_N'}, {txt: '=', prop:'btnCalculate', cls:'btn_R'}, {txt: '+', prop:'btnPlus', cls:'btn_A'}]
			];

			for(let i=0; i<buttons.length; i++){
				let row = table.insertRow();
				for(let j = 0; j <buttons[i].length; j++){
					let cell = row.insertCell();
					let btn = document.createElement('button');
					btn.textContent = buttons[i][j].txt;
					btn.className = buttons[i][j].cls;
					cell.appendChild(btn);
					this[buttons[i][j].prop] = btn;
				}
			}
				
			const rowDel = table.insertRow();
			const cellDel = rowDel.insertCell();
			cellDel.colSpan = 4;
			this.btnDelete = document.createElement('button');
			this.btnDelete.textContent = 'Borrar';
			this.btnDelete.className = 'btn_D';
			cellDel.appendChild(this.btnDelete);
		}


		connectedCallback()
		{
			//Se va a ejecutar siempre cuando el elemento es insertado en el DOM
			//DOM = Arbol de elementos HTML ya como instancias (objetos) de JS.
			if (this.controller != null){
				this.btn0.onclick = this.controller.onButton0Click.bind(this);
				this.btn1.onclick = this.controller.onButton1Click.bind(this);
				this.btn2.onclick = this.controller.onButton2Click.bind(this);
				this.btn3.onclick = this.controller.onButton3Click.bind(this);
				this.btn4.onclick = this.controller.onButton4Click.bind(this);
				this.btn5.onclick = this.controller.onButton5Click.bind(this);
				this.btn6.onclick = this.controller.onButton6Click.bind(this);
				this.btn7.onclick = this.controller.onButton7Click.bind(this);
				this.btn8.onclick = this.controller.onButton8Click.bind(this);
				this.btn9.onclick = this.controller.onButton9Click.bind(this);
				this.btnDot.onclick = this.controller.onButtonDotClick.bind(this);
				this.btnSub.onclick = this.controller.onButtonSubClick.bind(this);
				this.btnPlus.onclick = this.controller.onButtonPlusClick.bind(this);
				this.btnMultiply.onclick = this.controller.onButtonMultiplyClick.bind(this);
				this.btnDivide.onclick = this.controller.onButtonDivideClick.bind(this);
				this.btnCalculate.onclick = this.controller.onButtonCalculateClick.bind(this);
				this.btnDelete.onclick = this.controller.onButtonDeleteClick.bind(this);
			}
		}

		disconnectedCallback()
		{
			//Se va a ejecutar siempre que se quite el elemento del documento

			
			if (this.controller === null){
				this.btn0.onclick = null;
				this.btn1.onclick = null;
				this.btn2.onclick = null;
				this.btn3.onclick = null;
				this.btn4.onclick = null;
				this.btn5.onclick = null;
				this.btn6.onclick = null;
				this.btn7.onclick = null;
				this.btn8.onclick = null;
				this.btn9.onclick = null;
				this.btnDot.onclick = null;
				this.btnSub.onclick = null;
				this.btnPlus.onclick = null;
				this.btnMultiply.onclick = null;
				this.btnDivide.onclick = null;
				this.btnCalculate.onclick = null;
				this.btnDelete.onclick = null;
				this.controller = null;
			}
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
	