import { LoginUI } from "./LoginUI.js";
import { LoginController } from "./LoginController.js";

function main()
	{
		let ui = new LoginUI();
		let controller = new LoginController(ui);
		ui.controller = controller;
		document.body.appendChild(ui);
		
	}

	window.onload = main;