import { PlanListUI } from "./PlanListUI.js";
import { PlanListController } from "./PlanListController.js";

function main()
	{
		let ui = new PlanListUI();
		let controller = new PlanListController(ui);
		ui.controller = controller;
		document.body.appendChild(ui);
		
	}

	window.onload = main;