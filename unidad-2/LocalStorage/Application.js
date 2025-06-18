import { ApplicationView } from './ApplicationUI.js';

class Application
{
	constructor( apiInstanceObject )
	{
		this._api = apiInstanceObject;
		this._defaultView = new ApplicationView(this._api);		
	}

	init()
	{
		console.log("Aplicacion iniciada")
	}

	run()
	{
		this._defaultView.initializeView();
	}
}

export { Application };