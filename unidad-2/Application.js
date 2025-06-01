import { LoginApplicationView } from './ApplicationUI.js';

class Application
{
	constructor( apiInstanceObject )
	{
		this._api = apiInstanceObject;
		this._defaultView = new LoginApplicationView(this._api);		
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
		while(true)
		{
			this._api_return = this._defaultView.welcomeMenu();

			if ( this._api_return.result == 'USER_PASSWORD_FAILED' )
			{
				this._attempts++;
			}

			if(this._api_return.status){
				let keeprunning = true;
				while(keeprunning){
					keeprunning = this._defaultView.userOptions(this._api_return.username, this._api_return.role);
				}
			}
		}
	}
}

export { Application };