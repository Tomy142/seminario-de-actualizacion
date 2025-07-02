import { CalculatorUI } from "./CalculatorUI";

function main()
	{
		document.body.appendChild( new CalculatorUI() );
	}

	window.onload = main;