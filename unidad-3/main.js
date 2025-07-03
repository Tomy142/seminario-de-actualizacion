import { CalculatorUI } from "./CalculatorUI.js";
import { CalculatorController } from "./CalculatorController.js";

function main()
	{
		let ui = new CalculatorUI();
		document.body.appendChild(ui);
		new CalculatorController(ui);
	}

	window.onload = main;