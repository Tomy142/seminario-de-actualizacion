import { CalculatorController } from "./CalculatorController.js";

class CalculatorUI extends HTMLElement
	{
		constructor()
		{
			super();
			this.controller = null;
			
			this.header = document.createElement('header');
			this.header.classList.add("w3-container", "w3-teal");
			this.h1Titleheader = document.createElement('h1');
			this.h1Titleheader.textContent ="Login Example";
			
			this.divContainer = document.createElement('div');
			this.divContainer.classList.add("w3-container", "w3-half", "w3-margin-top");

			this.formContainer = document.createElement('form');
			this.formContainer.classList.add("w3-container", "w3-card-4");

			this.containerName = document.createElement('p');
			this.inputName = document.createElement('input');
			this.inputName.classList.add("w3-input");
			this.inputName.type= "text";
			this.inputName.style = "width:90%";
			this.inputName.required = true;
			this.labelName = document.createElement('label');
			this.labelName.textContent = 'Name';

			this.containerPassword = document.createElement('p');
			this.inputPassword = document.createElement('input');
			this.inputPassword.classList.add("w3-input");
			this.inputPassword.type= "password";
			this.inputPassword.style = "width:90%";
			this.inputPassword.required = true;
			this.labelPassword = document.createElement('label');
			this.labelPassword.textContent = 'Password';

			this.containerMale = document.createElement('p');
			this.inputMale = document.createElement('input');
			this.inputMale.classList.add("w3-radio");
			this.inputMale.type= "radio";
			this.inputMale.name = "gender";
			this.inputMale.value = "male";
			this.labelMale = document.createElement('label');
			this.labelMale.textContent = 'Male';

			this.containerFemale = document.createElement('p');
			this.inputFemale = document.createElement('input');
			this.inputFemale.classList.add("w3-radio");
			this.inputFemale.type= "radio";
			this.inputFemale.name = "gender";
			this.inputFemale.value = "female";
			this.labelFemale = document.createElement('label');
			this.labelFemale.textContent = 'Female';

			this.containerDont = document.createElement('p');
			this.inputDont = document.createElement('input');
			this.inputDont.classList.add("w3-radio");
			this.inputDont.type= "radio";
			this.inputDont.name = "gender";
			this.inputDont.value = "";
			this.inputDont.disabled = true;
			this.labelDont = document.createElement('label');
			this.labelDont.textContent ="Don't know(Disabled)";

			this.containerStayLogged = document.createElement('p');
			this.inputStayLogged = document.createElement('input');
			this.inputStayLogged.id = "milk";
			this.inputStayLogged.classList.add("w3-check");
			this.inputStayLogged.type= "checkbox";
			this.inputStayLogged.checked = true;
			this.labelStayLogged = document.createElement('label');
			this.labelStayLogged.setAttribute('for', 'milk');
			this.labelStayLogged.textContent = 'Stay logged in';

			this.containerButtonLogin = document.createElement('p');
			this.btnLogin = document.createElement('button');
			this.btnLogin.classList.add("w3-button", "w3-section", "w3-teal", "w3-ripple");
			this.btnLogin.innerText = "Log in";

			this.header.appendChild(this.h1Titleheader);
			this.appendChild(this.header);

			this.containerName.appendChild(this.inputName);
			this.containerName.appendChild(this.labelName);

			this.containerPassword.appendChild(this.inputPassword);
			this.containerPassword.appendChild(this.labelPassword);

			this.containerMale.appendChild(this.inputMale);
			this.containerMale.appendChild(this.labelMale);

			this.containerFemale.appendChild(this.inputFemale);
			this.containerFemale.appendChild(this.labelFemale);

			this.containerDont.appendChild(this.inputDont);
			this.containerDont.appendChild(this.labelDont);
			
			this.containerStayLogged.appendChild(this.inputStayLogged);
			this.containerStayLogged.appendChild(this.labelStayLogged);

			this.containerButtonLogin.appendChild(this.btnLogin);

			this.formContainer.appendChild(this.containerName);
			this.formContainer.appendChild(this.containerPassword);
			this.formContainer.appendChild(this.containerMale);
			this.formContainer.appendChild(this.containerFemale);
			this.formContainer.appendChild(this.containerDont);
			this.formContainer.appendChild(this.containerStayLogged);
			this.formContainer.appendChild(this.containerButtonLogin);
			this.divContainer.appendChild(this.formContainer);

			this.appendChild(this.divContainer);
		}


		connectedCallback()
		{
			//Se va a ejecutar siempre cuando el elemento es insertado en el DOM
			//DOM = Arbol de elementos HTML ya como instancias (objetos) de JS.
			if (this.controller != null){
				this.login.onclick = this.controller.onButtonLoginClick.bind(this);
				
			}
		}

		disconnectedCallback()
		{
			//Se va a ejecutar siempre que se quite el elemento del documento

			
			if (this.controller === null){
				this.login.onclick = null;
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
	