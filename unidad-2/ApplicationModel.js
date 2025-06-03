
class APIModelAccess
{
	constructor()
	{
		this._authData = new Map();
		this._authArticle = new Map();
		this._maxLoginFailedAttempts = 3;
		
		let userData =
		[
			{
				password: '987654',
				role: 'Administrador',
				failedLoginCounter: 0,
				isLocked: false
			},
			{
				password: '987654',
				role: 'Vendedor',
				failedLoginCounter: 0,
				isLocked: false
			},
			{
				password: '987654',
				role: 'Trabajador de deposito',
				failedLoginCounter: 0,
				isLocked: false
			},
			{
				password: '987654',
				role: 'Cliente',
				failedLoginCounter: 0,
				isLocked: false
			}
		]

		let articleData=
		[
			{
				id: 1,
				price:875.25,
				stock:3000,
			},
			{
				id: 4,
				price:1102.45,
				stock:2010,
			},
			{
				id: 22,
				price:650.22,
				stock:407,
			}
		]

		this._authData.set('scorpion', userData[0] );
		this._authData.set('subzero', userData[1] );
		this._authData.set('liukang', userData[2] );
		this._authData.set('raiden', userData[3] );
		
		this._authArticle.set('Lavandina x 1L',articleData[0]);
		this._authArticle.set('Detergente x500mL',articleData[1]);
		this._authArticle.set('Jabon en polvo x250g',articleData[2]);
	}

	get rolePermissions(){
		return{
			'Administrador': ['listArticle','newArticle', 'editArticle', 'deleteArticle'],
			'Vendedor': ['listArticle','buyArticle'],
			'Cliente': ['listArticle','buyArticle'],
			'Trabajador de deposito': ['listArticle','editArticle'],
		};
	}

	hasPermission(username, actionName)
	{
		const user = this._authData.get(username);

		if(!user) return false;

		const role = user.role;
		return this.rolePermissions[role]?.includes(actionName);
	}
		
		
	isValidUserGetData( username )
	{
		return this._authData.get(username);
	}

	authenticateUser( username, password, role )
	{
		let api_return = 
		{
			status: false,
			result: null
		};

		if((username != undefined && username != null && username != '') &&
			(password != undefined && password != null && password != '') &&
			['Administrador','Vendedor', 'Cliente', 'Trabajador de deposito'].includes(role)
		)
		{
			let userdata = this.isValidUserGetData(username);

			if (userdata && userdata.isLocked == false)
			{
				if(userdata.password === password)
				{
					if(userdata.role !== role)
					{
						api_return.status = false;
						api_return.result = 'ROLE_MISMATCH';
						return api_return;
					}
					api_return.status = true;
					api_return.role = role;
				}
				else
				{
					api_return.status = false;
					api_return.result = 'USER_PASSWORD_FAILED';

					userdata.failedLoginCounter++;
					
					if (userdata.failedLoginCounter == this._maxLoginFailedAttempts)
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

	changePassword(userdata, newPassword) 
	{
			if(this.validUserPassword(newPassword))//back
			{
				userdata.password = newPassword;// back
				return{status: true};
			}
			return{status: false, result:'INVALID_PASSWORD'}
	}

	validUserPassword(password) //mover?
	{
		const characters = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=(?:.*[^a-zA-Z0-9]){2,})(?!.*\s).{8,16}$/;
		return characters.test(password);
	}

	addUser(username, password, role)
	{
		if(this._authData.has(username))
		{
			return {status: false, result: 'USER_EXISTS'};
		}

		if(!['Administrador','Vendedor','Trabajador de deposito', 'Cliente'].includes(role))
		{
			return{status: false, result:'INVALID_ROLE'};
		}

		if(!this.validUserPassword(password)){
			return { status: false, result: 'INVALID_PASSWORD'};
		}

		this._authData.set(username,{
			role: role,
			password: password,
			failedLoginCounter:0,
			isLocked: false
		});

		return{status: true};
	}

	listArticle(username)
	{
		
		if(this._authArticle.size === 0){
			return {status: false, result: 'NO_ARTICLES'};
		}
		const articles = [];

		for(let [name,article] of  this._authArticle.entries()){
			articles.push({
				name,
				id: article.id,
				price: article.price,
				stock: article.stock
			});
		}
		return{status: true, result: articles};
	}

	newArticle(username, name, id, price, stock)
	{
		if(!this.hasPermission(username,'newArticle')){
			return{status: false, result: 'NO_PERMISSION'};
		}

		if(this._authArticle.has(name)){
			return{status: false, result: 'NAME_EXISTS'};
		}

		for(let [_, value] of this._authArticle){
			if(value.id === id){
				return{status: false, result: 'ID_EXISTS'};
			}
		}

		if(name && !isNaN(id) && !isNaN(price) && !isNaN(stock)){
			return {status: false, result: 'INVALID_DATA'};
		}
		this._authArticle.set(name, {
			id:id,
			price: price,
			stock: stock
		});
		return { status: true};
	}

	editArticle(username) /* pasar a la vista*/ 
	{
		if(!this.hasPermission(username,'editArticle')){
			alert("No tenes permisos para agregar articulos");
			return;
		}

		let idToEdit = Number(window.prompt("Ingrese el ID del articulo a editar:"));
		let foundKey = null;

		for(let [name, article] of this._authArticle){
			if(article.id === idToEdit){
				foundKey = name;
				break;
			}
		}

		if(foundKey){
			let newPrice = parseFloat(window.prompt("Ingrese nuevo precio: "));
			let newStock = parseInt(window.prompt("Ingrese nuevo stock:"));

			if(!isNaN(newPrice)) this._authArticle.get(foundKey).price = newPrice; 
			if(!isNaN(newStock)) this._authArticle.get(foundKey).stock = newStock; 

			alert("Articulo actualizado correctamente.");
		}else{
			alert("No se encontro un articulo con ese ID.");
		}
	}

	deleteArticle(username) /* pasar a la vista*/ 
	{
		if(!this.hasPermission(username,'deleteArticle')){
			alert("No tenes permisos para agregar articulos");
			return;
		}
		let idToDelete = Number(window.prompt("Ingrese el ID del articulo a eliminar:"));
		let foundKey = null;

		for(let [name, article] of this._authArticle){
			if(article.id === idToDelete){
				foundKey = name;
				break;
			}
		}

		if(foundKey){
			this._authArticle.delete(foundKey);
			alert("Articulo eliminado correctamente.");
		}else{
			alert("No se encontro un articulo con ese ID.");
		}
	}

	buyArticle(username) /* pasar a la vista*/ 
	{
		if(!this.hasPermission(username,'buyArticle')){
			alert("No tenes permisos para agregar articulos");
			return;
		}
		let idToBuy = Number(window.prompt("Ingrese el ID del articulo a comprar:"));
		let foundKey = null;
		let foundArticle = null;

		for(let [name, article] of this._authArticle){
			if(article.id === idToBuy){
				foundKey = name;
				foundArticle = article;
				break;
			}
		}

		if(!foundArticle){
			alert("No se encontro un articulo con ese ID.");
			return;
		}

		if(foundArticle.stock <= 0)
		{
			alert("El articulo no tiene stock disponible");
			return;
		}

		let quantity = Number(window.prompt("Ingrese la cantidad que desea comprar: "));

		if(quantity > foundArticle.stock){
			alert(`Stock insuficiente. Solo hay ${foundArticle.stock} unidades disponibles`);
			return;
		}

		let confirmPurchase = window.confirm(
			`Desea comprar ${quantity} unidades de "${foundKey}" por un total de $${(foundArticle.price * quantity).toFixed(2)}?`
		);

		if(confirmPurchase){
			foundArticle.stock -= quantity;
			alert(`Compra realizada con exito. Nuevo stock: ${foundArticle.stock}`);
		}else{
			alert("Compra cancelada.");
		}
	}
}


export { APIModelAccess };