import { PlanListController } from "./PlanListController.js";

class PlanListUI extends HTMLElement
	{
		constructor()
		{
			super();
			this.controller = null;
			
			this.divTitle = document.createElement('div');
                this.divTitle.classList.add("w3-row-padding");
                    this.h2Title = document.createElement('h2');
                    this.h2Title.textContent = "Responsive Pricing Tables";

                this.containerCards = document.createElement('div');
                this.containerCards.classList.add("w3-row-padding");

                // card Basic

                    this.containerCardBasic = document.createElement('div');
                    this.containerCardBasic.classList.add("w3-third", "w3-margin-bottom");

                        // Lista UL 
                        this.listBasic = document.createElement('ul');
                        this.listBasic.classList.add("w3-ul", "w3-border", "w3-center", "w3-hover-shadow");

                            // Línea 1
                            this.line1Basic = document.createElement('li');
                            this.line1Basic.classList.add("w3-black", "w3-xlarge", "w3-padding-32");
                            this.line1Basic.textContent = "Basic";
                            
                            // Línea 2
                            this.line2Basic = document.createElement('li');
                            this.line2Basic.classList.add("w3-padding-16");
                            this.b1Basic = document.createElement('b');
                            this.b1Basic.textContent = "10GB";

                            // Línea 3
                            this.line3Basic = document.createElement('li');
                            this.line3Basic.classList.add("w3-padding-16");
                            this.b2Basic = document.createElement('b');
                            this.b2Basic.textContent = "10";

                            // Línea 4
                            this.line4Basic = document.createElement('li');
                            this.line4Basic.classList.add("w3-padding-16");
                            this.b3Basic = document.createElement('b');
                            this.b3Basic.textContent = "10";

                            // Línea 5
                            this.line5Basic = document.createElement('li');
                            this.line5Basic.classList.add("w3-padding-16");
                            this.b4Basic = document.createElement('b');
                            this.b4Basic.textContent = "Endless";

                            // Línea 6
                            this.line6Basic = document.createElement('li');
                            this.line6Basic.classList.add("w3-padding-16");
                            this.h2Line6Basic = document.createElement('h2');
                            this.h2Line6Basic.classList.add("w3-wide");
                            this.h2Line6Basic.textContent = "$ 10";
                            this.spanLine6Basic = document.createElement('span');
                            this.spanLine6Basic.classList.add("w3-opacity");
                            this.spanLine6Basic.textContent = "per month";

                            // Línea 7
                            this.line7Basic = document.createElement('li');
                            this.line7Basic.classList.add("w3-light-grey", "w3-padding-24");
                            this.btnSignUpBasic = document.createElement('button');
                            this.btnSignUpBasic.classList.add("w3-button", "w3-green", "w3-padding-large");
                            this.btnSignUpBasic.innerText =  "Sign Up";
                // ---------------------------------------------------------------------------------------------------

                // card Pro 

                    // Contenedor principal
                    this.containerCardPro = document.createElement('div');
                    this.containerCardPro.classList.add("w3-third", "w3-margin-bottom");

                        // Lista UL
                        this.listPro = document.createElement('ul');
                        this.listPro.classList.add("w3-ul", "w3-border", "w3-center", "w3-hover-shadow");

                            // Línea 1
                            this.line1Pro = document.createElement('li');
                            this.line1Pro.classList.add("w3-green", "w3-xlarge", "w3-padding-32");
                            this.line1Pro.textContent = "Pro";

                            // Línea 2
                            this.line2Pro = document.createElement('li');
                            this.line2Pro.classList.add("w3-padding-16");
                            this.b1Pro = document.createElement('b');
                            this.b1Pro.textContent = "25GB";

                            // Línea 3
                            this.line3Pro = document.createElement('li');
                            this.line3Pro.classList.add("w3-padding-16");
                            this.b2Pro = document.createElement('b');
                            this.b2Pro.textContent = "25";

                            // Línea 4
                            this.line4Pro = document.createElement('li');
                            this.line4Pro.classList.add("w3-padding-16");
                            this.b3Pro = document.createElement('b');
                            this.b3Pro.textContent = "25";

                            // Línea 5
                            this.line5Pro = document.createElement('li');
                            this.line5Pro.classList.add("w3-padding-16");
                            this.b4Pro = document.createElement('b');
                            this.b4Pro.textContent = "Endless";

                            // Línea 6
                            this.line6Pro = document.createElement('li');
                            this.line6Pro.classList.add("w3-padding-16");
                            this.h2Line6Pro = document.createElement('h2');
                            this.h2Line6Pro.classList.add("w3-wide");
                            this.h2Line6Pro.textContent = "$ 25";
                            this.spanLine6Pro = document.createElement('span');
                            this.spanLine6Pro.classList.add("w3-opacity");
                            this.spanLine6Pro.textContent = "per month";

                            // Línea 7
                            this.line7Pro = document.createElement('li');
                            this.line7Pro.classList.add("w3-light-grey", "w3-padding-24");
                            this.btnSignUpPro = document.createElement('button');
                            this.btnSignUpPro.classList.add("w3-button", "w3-green", "w3-padding-large");
                            this.btnSignUpPro.innerText = "Sign Up";

                // ----------------------------------------------------------------------------------------------

                // card Premium

                    // Contenedor principal
                    this.containerCardPremium = document.createElement('div');
                    this.containerCardPremium.classList.add("w3-third", "w3-margin-bottom");

                        // Lista UL
                        this.listPremium = document.createElement('ul');
                        this.listPremium.classList.add("w3-ul", "w3-border", "w3-center", "w3-hover-shadow");

                            // Línea 1
                            this.line1Premium = document.createElement('li');
                            this.line1Premium.classList.add("w3-black", "w3-xlarge", "w3-padding-32");
                            this.line1Premium.textContent = "Premium";

                            // Línea 2
                            this.line2Premium = document.createElement('li');
                            this.line2Premium.classList.add("w3-padding-16");
                            this.b1Premium = document.createElement('b');
                            this.b1Premium.textContent = "50GB";

                            // Línea 3
                            this.line3Premium = document.createElement('li');
                            this.line3Premium.classList.add("w3-padding-16");
                            this.b2Premium = document.createElement('b');
                            this.b2Premium.textContent = "50";

                            // Línea 4
                            this.line4Premium = document.createElement('li');
                            this.line4Premium.classList.add("w3-padding-16");
                            this.b3Premium = document.createElement('b');
                            this.b3Premium.textContent = "50";

                            // Línea 5
                            this.line5Premium = document.createElement('li');
                            this.line5Premium.classList.add("w3-padding-16");
                            this.b4Premium = document.createElement('b');
                            this.b4Premium.textContent = "Endless";

                            // Línea 6
                            this.line6Premium = document.createElement('li');
                            this.line6Premium.classList.add("w3-padding-16");
                            this.h2Line6Premium = document.createElement('h2');
                            this.h2Line6Premium.classList.add("w3-wide");
                            this.h2Line6Premium.textContent = "$ 50";
                            this.spanLine6Premium = document.createElement('span');
                            this.spanLine6Premium.classList.add("w3-opacity");
                            this.spanLine6Premium.textContent = "per month";

                            // Línea 7
                            this.line7Premium = document.createElement('li');
                            this.line7Premium.classList.add("w3-light-grey", "w3-padding-24");
                            this.btnSignUpPremium = document.createElement('button');
                            this.btnSignUpPremium.classList.add("w3-button", "w3-green", "w3-padding-large");
                            this.btnSignUpPremium.innerText = "Sign Up";

                
                // armado de estructura
                
                // Titulo
                this.divTitle.appendChild(this.h2Title);
                this.appendChild(this.divTitle);

                // lista Basic
                this.listBasic.appendChild(this.line1Basic);

                this.line2Basic.appendChild(this.b1Basic);
                this.line2Basic.append(" Storage");
                this.listBasic.appendChild(this.line2Basic);

                this.line3Basic.appendChild(this.b2Basic);
                this.line3Basic.append(" Emails");
                this.listBasic.appendChild(this.line3Basic);

                this.line4Basic.appendChild(this.b3Basic);
                this.line4Basic.append(" Domains");
                this.listBasic.appendChild(this.line4Basic);

                this.line5Basic.appendChild(this.b4Basic);
                this.line5Basic.append(" Support");
                this.listBasic.appendChild(this.line5Basic);
                
                this.line6Basic.appendChild(this.h2Line6Basic);
                this.line6Basic.appendChild(this.spanLine6Basic);
                this.listBasic.appendChild(this.line6Basic);

                this.line7Basic.appendChild(this.btnSignUpBasic);
                this.listBasic.appendChild(this.line7Basic);

                this.containerCardBasic.appendChild(this.listBasic);
                this.containerCards.appendChild(this.containerCardBasic);
                // --------------------------------------------------------------

                // lista Pro
                this.listPro.appendChild(this.line1Pro);

                this.line2Pro.appendChild(this.b1Pro);
                this.line2Pro.append(" Storage");
                this.listPro.appendChild(this.line2Pro);

                this.line3Pro.appendChild(this.b2Pro);
                this.line3Pro.append(" Emails");
                this.listPro.appendChild(this.line3Pro);

                this.line4Pro.appendChild(this.b3Pro);
                this.line4Pro.append(" Domains");
                this.listPro.appendChild(this.line4Pro);

                this.line5Pro.appendChild(this.b4Pro);
                this.line5Pro.append(" Support");
                this.listPro.appendChild(this.line5Pro);
                
                this.line6Pro.appendChild(this.h2Line6Pro);
                this.line6Pro.appendChild(this.spanLine6Pro);
                this.listPro.appendChild(this.line6Pro);

                this.line7Pro.appendChild(this.btnSignUpPro);
                this.listPro.appendChild(this.line7Pro);

                this.containerCardPro.appendChild(this.listPro);
                this.containerCards.appendChild(this.containerCardPro);
                // ----------------------------------------------------------------------

                // lista Premium
                this.listPremium.appendChild(this.line1Premium);

                this.line2Premium.appendChild(this.b1Premium);
                this.line2Premium.append(" Storage");
                this.listPremium.appendChild(this.line2Premium);

                this.line3Premium.appendChild(this.b2Premium);
                this.line3Premium.append(" Emails");
                this.listPremium.appendChild(this.line3Premium);

                this.line4Premium.appendChild(this.b3Premium);
                this.line4Premium.append(" Domains");
                this.listPremium.appendChild(this.line4Premium);

                this.line5Premium.appendChild(this.b4Premium);
                this.line5Premium.append(" Support");
                this.listPremium.appendChild(this.line5Premium);
                
                this.line6Premium.appendChild(this.h2Line6Premium);
                this.line6Premium.appendChild(this.spanLine6Premium);
                this.listPremium.appendChild(this.line6Premium);

                this.line7Premium.appendChild(this.btnSignUpPremium);
                this.listPremium.appendChild(this.line7Premium);

                this.containerCardPremium.appendChild(this.listPremium);
                this.containerCards.appendChild(this.containerCardPremium);
                // ----------------------------------------------------------------------


                this.appendChild(this.containerCards);
		}


		connectedCallback()
		{
			//Se va a ejecutar siempre cuando el elemento es insertado en el DOM
			//DOM = Arbol de elementos HTML ya como instancias (objetos) de JS.
			if (this.controller != null){
				this.plan.onclick = this.controller.onButtonPlanListClick.bind(this);
				
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

	customElements.define('x-planList', PlanListUI );

	export{PlanListUI}
	