import{
	getAllUsers,
	addOrUpdateUser,
	getAllArticles,
	addOrUpdateArticle,
	getUser,
	getArticleById,
	getArticleByName,
	deleteUser,
	deleteArticle,
	clearUsersStore,
	clearArticlesStore,
	openDatabase	
}from './IndexedDB.js';
class APIModelAccess
{
	constructor(onReadyCallback)
	{
		//Conservar una referencia a this para usar adentro de los callbacks
		let self = this;

		self._authData = new Map();
		self._authArticle = new Map();
		self._maxLoginFailedAttempts = 3;
		self._dbInitialized = false; // flag para saber si IndexedDb esta abierto

		openDatabase(
			function(dbInstance){
				self._dbInitialized = true;
				console.log("APIModelAcces: IndexedDB listo");
				self.loadFromStorage(function(){
					if(typeof onReadyCallback === "function")onReadyCallback();
				});
			},
			function(error){
				console.error("APIModelAccess: Error al inicializar IndexedDB:", error);
				alert("No se pudo inicializar la base de datos local.");
			}
		);
	}

	loadFromStorage(callback){
		let self = this;
		console.log("APIModelAccess: Cargando datos desde IndexedDB...");

		getAllUsers(
			function(usersArray){
				self._authData.clear();
				if(usersArray){
					for(let i = 0; i < usersArray.length; i++){
						let user = usersArray[i];
						self._authData.set(user.username, user);
					}
				}
				console.log("Usuarios cargados desde IndexedDB. Tamaño de _authData:", self._authData.size);

				getAllArticles(
					function(articlesArray){
						self._authArticle.clear();
						if(articlesArray){
							for(let j = 0; j < articlesArray.length; j++){
								let article = articlesArray[j];
								self._authArticle.set(article.name, article);
							}
						}
						console.log("Articulos cargados desde IndexedDB. Tamaño de _authArticle:", self._authArticle.size);

						if(self._authData.size === 0 && self._authArticle.size === 0){
							console.log("No se encontraron datos en IndexedDB. Inicializando datos por defecto.");
							self.initializeDefaultData(function(){
								self.saveToStorage(function(){
									console.log("Datos por defecto guardados exitosamente en IndexedDB.");
									self.loadFromStorage(callback);
								});
							});
						}else{
							console.log("Datos cargados desde IndexedDB");
							if(typeof callback === "function")callback();
						}
					},
					function(err){
						console.error("Error al cargar articulos desde IndexedDB:", err);
						if(typeof callback === "function")callback();
					}
				);
			},
			function(err){
				console.error("Error al cargar usuarios desde IndexedDB", err);
			}
		);
	}

	saveToStorage(callback){
		let self = this;
		console.log("APIModelAccess: Guardando datos en IndexedDB.");
		
		let totalItemsToSave = 0;
		let itemsSavedCount = 0;

		function checkCompletion(){
			if(itemsSavedCount === totalItemsToSave && typeof callback === 'function'){
				console.log("Todos los datos guardados en IndexedDb.");
				callback();
			}
		}

		clearUsersStore(
			function(){
				let usersToSave = Array.from(self._authData.values());
				totalItemsToSave += usersToSave.length;

				if(usersToSave.length === 0){
					console.log("No hay usuarios para guardar.");
					saveArticlesProcess();
					return;
				}

				usersToSave.forEach(function(user){
					addOrUpdateUser(user,
						function(){
							itemsSavedCount++;
							checkCompletion();
						},
						function(err){
							console.error("Error al guardar un usuario:", err);
							itemsSavedCount++;
							checkCompletion();
						}
					);
				});
			},
			function(err){
				console.error("Error al limpiar usuarios para guardar:", err);
				if(typeof callback === 'function'){
					callback();
				}
			}
		);

		function saveArticlesProcess(){
			clearArticlesStore(
				function(){
					let articlesToSave = Array.from(self._authArticle.values());
					totalItemsToSave += articlesToSave.length;

					if(articlesToSave.length === 0){
						console.log("No hay articulos para guardar.");
						checkCompletion();
						return;
					}

					articlesToSave.forEach(function(article){
						addOrUpdateArticle(article,
							function(){
								itemsSavedCount++;
								checkCompletion();
							},
							function(err){
								console.error("Error al guardar un articulo:", err);
								itemsSavedCount++;
								checkCompletion();
							}
						);
					});
				},
				function(err){
					console.error("Error al limpiar articulos para guardar:", err);
					if(typeof callback === 'function'){
						callback();
					}
				}
			);
		}
	}

	initializeDefaultData(callback){
		let self = this;
		
		let userData= [
			{ username: 'scorpion', password: '987654', role: 'Administrador', failedLoginCounter: 0, isLocked: false},
			{ username: 'subzero', password: '987654', role: 'Vendedor', failedLoginCounter: 0, isLocked: false},
			{ username: 'liukang', password: '987654', role: 'Trabajador de deposito', failedLoginCounter: 0, isLocked: false},
			{ username: 'raiden', password: '987654', role: 'Cliente', failedLoginCounter: 0, isLocked: false},
		];

		const articleData=[
			{id: 1, name: 'Lavandina x 1L', price:875.25, stock:3000 },
			{id: 4, name: 'Detergente x500mL', price:1102.45, stock:2010},
			{id: 22, name: 'Jabon en polvo x250g', price:650.22, stock:407},
		]

		self._authData.clear();
		self._authArticle.clear();

		userData.forEach(function(user){
			self._authData.set(user.username, user);
		});
		articleData.forEach(function(article){
			self._authArticle.set(article.name, article);
		});

		console.log("Datos por defecto inicilizados.");
		if(typeof callback === 'function'){
			callback();
		}
	}

	get rolePermissions(){
		return{
			'Administrador': ['listArticle','newArticle', 'editArticle', 'deleteArticle'],
			'Vendedor': ['listArticle','buyArticle'],
			'Cliente': ['listArticle','buyArticle'],
			'Trabajador de deposito': ['listArticle','editArticle'],
		};
	}

	hasPermission(username, actionName, callback)
	{
		let self = this;
		self.isValidUserGetData(username, function(user){
			if(!user){
				callback(false);
				return;
			}
			let role = user.role;
			let hasPerm = self.rolePermissions[role] && self.rolePermissions[role].includes(actionName);
			callback(hasPerm);
		}, function(err){
			console.error("Error en hasPermission al obtener usuario:", err);
			callback(false);
		});
	}
		
	isValidUserGetData( username, successCallback, errorCallback )
	{
		getUser(username, successCallback, errorCallback);
	}

	authenticateUser( username, password, callback)
	{
		let self = this;

		let api_return = { status: false, result: null, role: null };

		if((username != undefined && username != null && username != '') &&
			(password != undefined && password != null && password != '')
		)
		{
			self.isValidUserGetData(username,
				function(userdata){
					if (userdata && userdata.isLocked == false){
						if(userdata.password === password){
							api_return.status = true;
							api_return.role = userdata.role;
							callback(api_return);
						}else{
							api_return.status = false;
							api_return.result = 'USER_PASSWORD_FAILED';

							userdata.failedLoginCounter++;
					
							if (userdata.failedLoginCounter == this._maxLoginFailedAttempts){
								userdata.isLocked = true;
								api_return.status = false;
								api_return.result = 'BLOCKED_USER';
							}
							self._authData.set(username, userdata);

							addOrUpdateUser(userdata,
								function(){
									console.log("Usuario actualizado despues de intento de login.");
									callback(api_return);
								},
								function(err){
									console.error("Error al actualizar usuario en authenticateUser:", err);
									callback(api_return);
								}
							);
						}
					}else{
						api_return.status = false;
						api_return.result = 'BLOCKED_USER';
					}
				},
				function(err){
					console.error("Error al obtener usuario en authenticateUser:", err);
					api_return.status = false;
					api_return.result = 'DB_ERROR';
					callback(api_return);
				}
			);
		} else{
			api_return.status = false;
			api_return.result = 'INVALID_INPUT';
			callback(api_return);
		}
	}

	getMaxLoginAttempts()
	{
		return this._maxLoginFailedAttempts;
	}

	changePassword(username, newPassword, callback) 
	{
		let self = this;
		self.isValidUserGetData(username, function(userdata){
			if(!userdata){
				callback({status: false, result: 'USER_NOT_FOUND'});
				return;
			}

			if(self.validUserPassword(newPassword)){
				userdata.password = newPassword;
				self._authData.set(username, userdata);
				addOrUpdateUser(userdata, function(){
					console.log("Contraseña cambiada y guardado para:", username);
					callback({status: true});
				}, function(){
					console.error("Error al guardar el cambio de contraseña en IndexedDB:", err);
					callback({status: false, result: 'DB_SAVE_ERROR' });
				});
			}else{
				callback({status: false, result: 'INVALID_PASSWORD' });
			}
		}, function(err){
			console.error("Erro al obtener usuario para cambiar contraseña:", err);
			callback({status: false, result: 'DB_ERROR'});
		});
	}

	validUserPassword(password) 
	{
		const characters = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=(?:.*[^a-zA-Z0-9]){2,})(?!.*\s).{8,16}$/;
		return characters.test(password);
	}

	addUser(username, password, role, callback)
	{
		let self = this;

		getUser(username, function(existingUser){
			if(existingUser){
				callback({status: false, result: 'USER_EXISTS'});
				return;
			}

			if(!['Administrador','Vendedor','Trabajador de deposito', 'Cliente'].includes(role)){
				callback({status: false, result:'INVALID_ROLE'});
				return;
			}

			if(!self.validUserPassword(password)){
				callback({ status: false, result: 'INVALID_PASSWORD'});
				return;
			}

			let newUser={
				username: username,
				role: role,
				password: password,
				failedLoginCounter:0,
				isLocked: false
			};

			self._authData.set(username, newUser);

			addOrUpdateUser(newUser, function(){
				console.log("Nuevo usuario agregado y guardado:", username);
				callback({status: true});
			},function(err){
				console.error("Erro al agregar usuario a IndexedDB:", err);
				callback({ status: false, result: 'DB_SAVE_ERROR'});
			});
		}, function(err){
			console.error("Error al verificar usuario existente en addUser:", err);
			callback({ status: false, result: 'DB_ERROR'});
		});
	}

	listArticle(username, callback)
	{
		let self = this;
		self.hasPermission(username, 'listArticle', function(hasPerm){
			if(!hasPerm){
				callback({status: false, result: 'NO_PERMISSION'});
				return;
			}

			getAllArticles(
				function(articlesArray){
					if(!articlesArray || articlesArray.length === 0){
						callback({status: false, result: 'NO_ARTICLES'});
						return;
					}
					let articles = [];
					articlesArray.forEach(function(article){
						articles.push({
							name: article.name,
							id: article.id,
							price: article.price,
							stock: article.stock
						});
					});
					callback({status: true, result: articles});
				},
				function(err){
					console.error("Error al listar articulos desde IndexedDB:", err);
					callback({status: false, result: 'DB_ERROR'});
				}
			);
		});
	}

	newArticle(username, name, id, price, stock, callback){
		let self = this;

		self.hasPermission(username, 'newArticle', function(hasPerm){
			if(!hasPerm){
				callback({status: false, result: 'NO_PERMISSION'});
				return;
			}

			getArticleByName(name, function(existingArticleByName){
				if(existingArticleByName){
					callback({status: false, result: 'NAME_EXISTS'});
					return;
				}

				getArticleById(id, function(existingArticleById){
					if(existingArticleById){
						callback({status: false, result: 'ID_EXISTS'});
						return;
					}
					if(!name || isNaN(id) || isNaN(price) || isNaN(stock)){
						callback({status: false, result: 'INVALID_DATA'});
						return;
					}

					let newArticleData = {
						id: id,
						name: name,
						price: price,
						stock: stock
					};

					self._authArticle.set(name, newArticleData);

					addOrUpdateArticle(newArticleData, function(){
						console.log("Nuevo articulo agregado y guardado:", name);
						callback({status: true});
					}, function(err) {
						console.error("Error al agregar articulo a IndexedDB:", err);
						callback({status: false, result: 'DB_SAVE_ERROR'});
					});
				}, function(err){
					console.error("Error al verificar ID de articulo existente:", err);
					callback({status: false, result: 'DB_ERROR'});
				});
			}, function(err){
				console.error("Error al verificar nombre de articulo existente", err);
				callback({status: false, result: 'DB_ERROR'});
			});
		});
	}

	editArticle(username, idToEdit, newPrice, newStock, callback) {
		let self = this;

		self.hasPermission(username, 'editArticle', function(hasPerm){
			if(!hasPerm){
				callback({ status: false, result: 'NO_PERMISSION'});
				return;
			}

			getArticleById(idToEdit, function(foundArticle){
				if(!foundArticle){
					callback({ status: false, result: 'NOT_FOUND'});
					return;
				}

				if(!isNaN(newPrice)){
					foundArticle.price = newPrice;
				} 

				if(!isNaN(newStock)){
					foundArticle.stock = newStock;
				} 

				self._authArticle.set(foundArticle.name, foundArticle);

				addOrUpdateArticle(foundArticle, function(){
					console.log("Articulo editado y guardado:", foundArticle.name);
					callback({status: true});
				},function(err){
					console.error("Error al guardar articulo editado en IndexedDB:", err);
					callback({ status: false, result: 'DB_SAVE_ERROR'});
				});
			}, function(err){
				console.error("Error al obtener articulo para editar:", err);
				callback({ status: false, result: 'DB_ERROR'});
			});
		});
	}

	deleteArticle(username, idToDelete, callback) {
		let self = this;
		self.hasPermission(username,'deleteArticle', function(hasPerm){
			if(!hasPerm){
				callback({status: false, result: 'NO_PERMISSION'})
			}
			getArticleById(idToDelete, function(foundArticle){
				if(!foundArticle){
					callback({status: false, result: 'NOT_FOUND'});
					return;
				}

				self._authArticle.delete(foundArticle.name);

				deleteArticle(idToDelete, function(){
					console.log("Articulo eliminado:", idToDelete);
					callback({status: true});
				}, function(err){
					console.error("Error al eliminar articulo de IdexedDB:", err);
					callback({ status: false, result:'DB_DELETE_ERROR'});
				});
			}, function(err){
				console.error("Error al obtener articulo para eliminar:", err);
				callback({status: false, result: 'DB_ERROR'});
			});
		});
	}

	buyArticle(username, idToBuy, quantity, callback) {
		let self = this;
		self.hasPermission(username,'buyArticle', function(hasPerm){
			if(!hasPerm){
				callback({status: false, result: 'NO_PERMISSION'});
				return;
			}
			getArticleById(idToBuy, function(foundArticle){
				if(!foundArticle){
					callback({status: false, result: 'NOT_FOUND'});
					return;
				}

				if(foundArticle.stock <= 0)
				{
					callback({status: false, result: 'NO_STOCK'});
					return;
				}

				if(quantity > foundArticle.stock){
					callback({status: false, result: 'INSUFFICIENT_STOCK', available: foundArticle.stock});
					return;
				}

				foundArticle.stock -= quantity;

				self._authArticle.set(foundArticle.name, foundArticle);

				addOrUpdateArticle(foundArticle, function(){
					console.log("Articulo comprado y stock actualizado:", foundArticle.name);
					callback({
						status: true,
						result: {
							name: foundArticle.name,
							price: foundArticle.price,
							quantity: quantity,
							remaining: foundArticle.stock
						}
					});
				}, function(err){
					console.error("Error al guardar articulo despues de la compra:", err);
					callback({status: false, result: 'DB_SAVE_ERROR'});
				});
			}, function(err){
				console.error("Error al obtener articulo para la compra:", err);
				callback({status: false, result: 'DB_ERROR'});
			});
		});
	}
}


export { APIModelAccess };