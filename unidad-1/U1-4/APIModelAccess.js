class APIModelAccess
{
	constructor()
	{
		this._authData = new Map();
		this._maxLoginFailedAttempts = 3;
		
		let userData =
		[
			{
				password: '987654',
				failedLoginCounter: 0,
				isLocked: false
			},
			{
				password: '987654',
				failedLoginCounter: 0,
				isLocked: false
			}
		]

		this._authData.set('scorpion', userData[0] );
		this._authData.set('subZero', userData[1] );
	}

	isValidUserGetData( username )
	{
		return this._authData.get(username);
	}

	authenticateUser( username, password )
	{
		let api_return = 
		{
			status: false,
			result: null
		};


		if ( (username != undefined && username != null && username != '') && (password != undefined && password != null && password != '') )
		{
			let userdata = this.isValidUserGetData(username);

			if (userdata && userdata.isLocked == false )
			{
				if( userdata.password === password )
				{
					api_return.status = true;
				}
				else
				{
					api_return.status = false;
					api_return.result = 'USER_PASSWORD_FAILED';

					userdata.failedLoginCounter++;
					
					if ( userdata.failedLoginCounter == this._maxLoginFailedAttempts )
					{
						userdata.isLocked = true;
						api_return.status = false;
						api_return.result = 'BLOCKED_USER';
					}
				}
			}
			else
			{
				api_return.status = false;
				api_return.result = 'BLOCKED_USER';
			}
			
		}
		
		return api_return;
	}

	getMaxLoginAttempts()
	{
		return this._maxLoginFailedAttempts;
	}

	changePassword(username)
	{
		let userdata = this.isValidUserGetData(username);

		if(userdata)
		{
			let newPassword = window.prompt("Ingrese una nueva contraseña para "+username+": ");

			if(this.validUserPassword(newPassword))
			{
				userdata.password = newPassword;
				alert("Contraseña cambiada exitosamente");
			}
			
		}else{
			alert("Operacion Cancelada...");
		}
	}

	validUserPassword(password)
	{
		const characters = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=(?:.*[^a-zA-Z0-9]){2,})(?!.*\s).{8,16}$/;

		if(characters.test(password))
		{
			alert("Clave validada exitosamente...");
		}else{
			alert("Validacion incorrecta...")
		}
		return characters.test(password);
	}

	addUser(username, password)
	{
		if(this._authData.has(username))
		{
			return {status: false, result: 'USER_EXISTS'};
		}

		this._authData.set(username,{
			password: password,
			failedLoginCounter:0,
			isLocked: false
		});

		return{status: true};
	}
}


export { APIModelAccess };