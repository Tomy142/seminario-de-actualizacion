import { ApplicationView } from './ApplicationUI.js';

class Application
{
	constructor( apiInstanceObject )
	{
		this._api = apiInstanceObject;
		this._defaultView = new ApplicationView(this._api);		
		this._maxLoginFailedAttempts = this._api.getMaxLoginAttempts();
		this._attempts = 0;
		this._api_return = null;
	}

	init()
	{
		console.log("Aplicacion iniciada")
	}

	run()
	{
		this._api_return = this._defaultView.initializeView();
	}
}

export { Application };