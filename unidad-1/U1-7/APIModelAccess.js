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
				failedLoginCounter: 0,
				isLocked: false
			},
			{
				password: '987654',
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
		this._authData.set('subZero', userData[1] );
		
		this._authArticle.set('Lavandina x 1L',articleData[0]);
		this._authArticle.set('Detergente x500mL',articleData[1]);
		this._authArticle.set('Jabon en polvo x250g',articleData[2]);
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

	listArticle()
	{
		if(this._authArticle.size === 0){
			alert("No hay articulos registrados.");
			return;
		}

		let list ="Listado de articulos:\n";

		for(let [name,article] of  this._authArticle.entries()){
			list +=`Nombre: ${name} | ID: ${article.id} | Precio: $${article.price} | Stock: ${article.stock}\n`;
		}
		alert(list);
	}

	newArticle()
	{
		let name = window.prompt("Ingrese el nombre del articulo: ");

		if(this._authArticle.has(name)){
			alert("Nombre ya existente");
			return;
		}

		let id = Number(window.prompt("Ingrese ID del articulo: "));

		for(let [key, value] of this._authArticle){
			if(value.id === id){
				alert("Ya existe un articulo con ese ID");
				return;
			}
		}

		let price = parseFloat(window.prompt("Ingrese el precio del articulo:"));
		let stock = parseInt(window.prompt("Ingrese stock del articulo:"));

		if(name && !isNaN(id) && !isNaN(price) && !isNaN(stock)){
			this._authArticle.set(name, {
				id:id,
				price: price,
				stock: stock
			});
			alert("Articulo agregado correctamente.");
		}else{
			alert("Datos invalidos.");
		}
	}

	editArticle()
	{
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

	deleteArticle()
	{
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

	buyArticle()
	{
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
			alert(`Stock insuficiente. Solo hay ${foundKey} unidades disponibles`);
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