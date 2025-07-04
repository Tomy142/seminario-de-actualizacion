import { CalculatorUI } from "./CalculatorUI.js";
import { CalculatorController } from "./CalculatorController.js";

function main()
	{
		let ui = new CalculatorUI();
		let controller = new CalculatorController(ui);
		ui.controller = controller;
		document.body.appendChild(ui);
		
	}

	window.onload = main;