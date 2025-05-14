import { use } from "react";

class LoginApplicationView
{
	constructor(apiInstanceObject)
	{
		this._api = apiInstanceObject;
	}

	show()
	{
		let username = window.prompt("Ingrese su nombre de usuario:");
		let password = window.prompt("Ingrese contraseña:");

		let api_return = this._api.authenticateUser(username,password);
		api_return.username = username;
		
		if ( api_return.status )
		{
			alert('Usuario autenticado exitosamente');
		}
		else if ( api_return.status == false )
		{
			switch ( api_return.result ) 
			{
				case 'BLOCKED_USER':
					alert('Usuario bloqueado. Contacte al administrador');
				break;

				case 'USER_PASSWORD_FAILED':
					alert('Usuario y/o contraseña incorrecta');
				break;

				default:
					alert('Error desconocido');
				break;
			}
		}

		return api_return;	
	}

	userOptions(username)
	{
		
		const optMap = new Map();
		optMap.set(1,() => {
			this._api.changePassword(username);
			this.userOptions(username);
		});

		optMap.set("x",()=> this._api.exitToMain());
		optMap.set("X",()=> this._api.exitToMain());

		let option = window.prompt("1. Cambiar contraseña || X. Salir");
		
		if(optMap.has(option)){
			optMap.get(option)();
		}else{
			alert("Opcion invalida");
			this.userOptions(username);
		}
		
	}

	exitToMain()
	{
		alert("Saliendo...");
		
		let exit = this.show();

		if(exit.status)
		{
			this.userOptions(exit.username);
		}
	}

}

export { LoginApplicationView };