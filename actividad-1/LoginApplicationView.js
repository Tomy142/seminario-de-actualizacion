
class LoginApplicationView
{
	constructor(apiInstanceObject)
	{
		this._api = apiInstanceObject;
	}

	welcomeMenu()
	{
		const menuOpt = new Map();

		menuOpt.set(1,() => this.show());
		menuOpt.set(2,()=> this.createUser());
		

		let option = Number(window.prompt("1. Iniciar Sesion || 2. Crear Usuario"));
		
		if(menuOpt.has(option)){
			return menuOpt.get(option)();
		}else{
			alert("Opcion invalida");
			return {status: false, result: 'INVALID_OPTION'};
		}


	}

	show()
	{
		let username = window.prompt("Ingrese su nombre de usuario:");
		let password = window.prompt("Ingrese contraseña:");

		let api_return = this._api.authenticateUser(username,password, role);
		api_return.username = username;
		
		if ( api_return.status )
		{
			alert('Usuario autenticado exitosamente');
		}
		else 
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
		});
		optMap.set(2,()=>{this.articleHandlerMenu(username)})
		optMap.set("x",()=> {return 'EXIT_TO_MAIN'});
		optMap.set("X",()=> {return 'EXIT_TO_MAIN'});

		let option = window.prompt("1. Cambiar contraseña || 2. Gestor de Articulos || X. Salir");

		let parsedOpt = isNaN(option) ? option : Number(option);
		
		if(optMap.has(parsedOpt)){
			let result = optMap.get(parsedOpt)();
			if(result== 'EXIT_TO_MAIN') return false;
		}else{
			alert("Opcion invalida");
		}
		return true;
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

	createUser()
	{
		let user = window.prompt("Ingrese el nombre del nuevo usuario: ");
		let pass = window.prompt("Ingrese la contraseña: ");
		let rolename = window.prompt("Ingrese el rol del usuario:  Administradores | Clientes | Vendedores | Trabajadores de deposito");

		const result = this._api.addUser(user, pass, rolename);

		if(result.status)
		{
			alert("Usuario creado correctamente.");
		}else{
			switch(result.result){
				case 'USER_EXISTS' :
					alert("Ese usuario ya existe.");
					break;
				case 'INVALID_PASSWORD':
					alert("Contraseña invalida. Debe tener entre 8 y 16 caracteres alfanumericos, al menos una mayuscula y al menos dos simbolos especiales");
					break;
				case 'INVALID_ROLE':
					alert("Rol invalido. Solo se permiten: Administrador, Vendedor, Trabajador de deposito, Cliente");
					break;
				default:
					alert("Error desconocido.");
			}
		}
		return { status: false, result: 'CREATED_OR_FAILED'};
	}

	articleHandlerMenu(username)
	{
		let userdata = this._api.isValidUserGetData(username);

		if(userdata)
		{
			const ArticleOptMap = new Map();

			ArticleOptMap.set(1,()=>{this._api.listArticle()})
			ArticleOptMap.set(2,()=>{this._api.newArticle()})
			ArticleOptMap.set(3,()=>{this._api.editArticle()})
			ArticleOptMap.set(4,()=>{this._api.deleteArticle()})
			ArticleOptMap.set(5,()=>{this._api.buyArticle()})
			
			let keepRunning = true;
			while(keepRunning)
			{
				let articleOpt = Number(window.prompt("1. Listar articulos || 2. Nuevo articulo || 3. Editar articulo  || 4. Eliminar articulo  || 5. Comprar articulo"));
				if(ArticleOptMap.has(Number(articleOpt)))
				{
					ArticleOptMap.get(Number(articleOpt))();
				}else
					{
						alert("Opcion invalida");
					}
			}
		}
	}
}

export { LoginApplicationView };