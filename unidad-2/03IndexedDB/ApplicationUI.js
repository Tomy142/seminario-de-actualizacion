class ApplicationView {
    constructor(apiInstanceObject) {
        this._api = apiInstanceObject;
        this._attempts = 0;
        this._currentUser = null;
        this._currentRole = null;
    }

    initializeView(){

        this.welcomeMenu(function(loginResult){
            if ( loginResult.result === 'USER_PASSWORD_FAILED' ){
                this._attempts++;
                if(this._attempts >= this._api.getMaxLoginFailedAttempts()){
                    alert('Demasiados intentos fallidos. Saliendo...');
                    return;
                }
                this.initializeView();
                return;
            }
            if(loginResult.status){
                this.handlerUserSession(loginResult.username, loginResult.role);
            }else{
                this.initializeView();
            }
        }.bind(this));
    }

    handlerUserSession(username, role){
        let self = this;
        this.userOptions(username, role, function(shouldContinueRunning){
            if(!shouldContinueRunning){
                self._currentUser = null;
                self._currentRole = null;
                alert("Sesion cerrada. Volviendo al menu principal.");
                self._attempts = 0; //cierra sesion y resetea intentos
                self.initializeView();
            }
        });
    }

    welcomeMenu(callback) {
        const menuOpt = new Map();
        menuOpt.set(1, function(cb) {this.showLogin(cb);}.bind(this));
        
        let option = Number(window.prompt("1. Iniciar Sesion"));
        if (menuOpt.has(option)) {
            menuOpt.get(option)(callback);
        } else {
            alert("Opcion invalida");
            callback({ status: false, result: 'INVALID_OPTION' });
        }
    }

    showLogin(callback) {
        let username = window.prompt("Ingrese su nombre de usuario:");
        let password = window.prompt("Ingrese contraseña:");
        
        let self = this;
        self._api.authenticateUser(username, password, function(api_return){
            api_return.username = username || '';
        
            if (api_return.status) {
                self._currentUser = username;
                self._currentRole = api_return.role;
                alert("Usuario autenticado exitosamente. Rol: " + api_return.role);
            } else {
                switch (api_return.result) {
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
            callback(api_return);	
        });
    }

    userOptions(username, role, callback) {

        const optMap = new Map();
        let optNumber = 1;
        let optionText = "";
        const self = this;

        // Opción 1: Cambiar contraseña (disponible para todos los roles)
        optMap.set(optNumber, function(cb) { self.passwordChanger(cb); }); //tiene que redirigir a un change password UI
        optionText += `${optNumber}. Cambiar contraseña || `;
        optNumber++;

        // Opción 2: Gestor de Artículos (disponible para todos los roles)
        optMap.set(optNumber, function(cb) { self.articleHandlerMenu(cb);});
        optionText += `${optNumber}. Gestor de Articulos || `;
        optNumber++;

        // Opción 3: Crear usuario (solo para Administrador)
        if (role === "Administrador") {
            optMap.set(optNumber, function(cb) { self.createUser(cb); });
            optionText += `${optNumber}. Crear usuario || `;
            optNumber++;
        }
        
        // Opción X: Salir
        optMap.set("x", function(cb) { if(typeof callback === "function") callback(false); });
        optMap.set("X", function(cb) { if(typeof callback === "function") callback(false); });
        optionText += "X. Salir";

        let option = window.prompt(optionText);
        let parsedOpt = isNaN(option) ? option : Number(option);
        
        if (optMap.has(parsedOpt)) {
            optMap.get(parsedOpt)(function(shouldContinue){
                if (shouldContinue === false){
                    if(typeof callback === "function") callback(false);
                    return;
                }
                self.userOptions(username, role, callback);
            });
        } else {
            alert("Opcion invalida");
            self.userOptions(username, role, callback);
        }
    }

    exitToMain() {
        alert("Saliendo...");
        this._currentUser = null;
        this._currentRole = null;
        let exit = this.showLogin(function(){});
        if (exit.status) {
            this.userOptions();
        }
    }

    passwordChanger(callback)
    {
        let self = this;
        let username = self._currentUser;
        this._api.isValidUserGetData(username,function(userdata){
            if(userdata){
                let newPassword = window.prompt("Ingrese una nueva contraseña para "+username+": ");
                self._api.changePassword(userdata, newPassword, function(result){
                    if(result.status === true){
                        alert("Contraseña cambiada exitosamente");
                    }else{
                        alert("No se pudo cambiar la contraseña");
                    }
                    if(typeof callback === "function")callback(true);
                });
            }else{
                alert("Operacion Cancelada...");
                if(typeof callback === "function")callback(true);
            }
        });
    }

    createUser(callback) {
        let self = this;
        let user = window.prompt("Ingrese el nombre del nuevo usuario: ");
        let pass = window.prompt("Ingrese la contraseña: ");
        let role = window.prompt("Ingrese el rol del usuario: Administrador, Cliente, Vendedor, Trabajador de deposito");

        if(!user || user.trim()=== ""){
            alert("El nombre de usuario no puede estar vacio.");
            if(typeof callback === "function")callback(true);
            return;
        }

        if (!['Administrador', 'Cliente', 'Vendedor', 'Trabajador de deposito'].includes(role)) {
            alert("Rol invalido");
            if(typeof callback === "function")callback(true);
            return;
        }

        this._api.addUser(user, pass, role, function(result){
            if (result.status) {
                alert("Usuario creado correctamente.");
            } else {
                switch (result.result) {
                    case 'USER_EXISTS':
                        alert("Ese usuario ya existe.");
                        break;
                    case 'INVALID_PASSWORD':
                        alert("Contraseña invalida. Debe tener entre 8 y 16 caracteres alfanumericos, al menos una mayuscula y al menos dos simbolos especiales");
                        break;
                    case 'INVALID_ROLE':
                        alert("Rol invalido. Solo se permiten: Administrador, Vendedor, Trabajador de deposito, Cliente");
                        break;
                    case 'INVALID_USERNAME':
                        alert("Nombre de usuario invalido.");
                        break;
                    default:
                        alert("Error desconocido.");
                }
            }
            if(typeof callback === "function")callback(true);
        });
    }

    articleHandlerMenu(callback) {
        let self = this;
        let username = self._currentUser;
        let role = self._currentRole;

        self._api.isValidUserGetData(username, function(userdata){
            if (!userdata){
                alert("Usuario invalido o sesion expirada.");
                if(typeof callback === "function")callback(false);
                return;
            }

            let ArticleOptMap = new Map();
            const normalizedRole = (role || '').trim();
            let articleText = "";
            let optionNumber = 1;
            ArticleOptMap.clear();

            // Listar artículos (disponible para todos los roles)
            articleText += `${optionNumber}. Listar articulos || `;
            ArticleOptMap.set(optionNumber, function(cb) { self.listOfArticles(cb); });
            optionNumber++;

            // Opciones específicas según el rol
            switch (normalizedRole) {
                case "Administrador":
                    articleText += `${optionNumber}. Nuevo articulo || `;
                    ArticleOptMap.set(optionNumber, function(cb) { self.addArticle(cb); });
                    optionNumber++;
                    articleText += `${optionNumber}. Editar articulo || `;
                    ArticleOptMap.set(optionNumber, function(cb) { self.modifyArticle(cb); });
                    optionNumber++;
                    articleText += `${optionNumber}. Eliminar articulo || `;
                    ArticleOptMap.set(optionNumber, function(cb) { self.eliminateArticle(cb); });
                    optionNumber++;
                    break;
                
                case "Vendedor":
                case "Cliente":
                    articleText += `${optionNumber}. Comprar articulo || `;
                    ArticleOptMap.set(optionNumber, function(cb) { self.affordArticle(cb); });
                    optionNumber++;
                    break;
                
                case "Trabajador de deposito":
                    articleText += `${optionNumber}. Editar articulo || `;
                    ArticleOptMap.set(optionNumber, function(cb) { self.modifyArticle(cb); });
                    optionNumber++;
                    break;
            }

            articleText += `${optionNumber}. Salir`;
            ArticleOptMap.set(optionNumber, function(cb) {if(typeof callback === "function")callback(false); });

            let articleOpt = Number(window.prompt(articleText));
            if (ArticleOptMap.has(Number(articleOpt))) {
                ArticleOptMap.get(Number(articleOpt))(function(shouldContinue){
                    if(shouldContinue === false){
                        if(typeof callback === "function")callback(false);
                        return;
                    }
                    self.articleHandlerMenu(callback);
                });
            } else {
                alert("Opcion invalida");
                self.articleHandlerMenu(callback);
            }
        });
    }

    listOfArticles(callback){
        let self = this;
        let username = self._currentUser;
        self._api.listArticle(username, function(result){
            if(!result.status){
                switch(result.result){
                    case 'NO_ARTICLES':
                        alert("No hay articulos registrados. ");
                        break;
                    default:
                        alert("Error desconocido.");
                }
            }else{
                let list ="Listado de articulos:\n";
                for(let i = 0; i < result.result.length; i++){
                    let article = result.result[i];
                    list +="Nombre: " + article.name + " | ID: " + article.id + "| Precio: $" +article.price + " | Stock:" + article.stock;
                }
                alert(list);
            }
            if(typeof callback === "function")callback(true);
        });
    }

    addArticle(callback){
        let self = this;
        let username = self._currentUser;

        const name = window.prompt("Ingrese el nombre del articulo: ");

        if(!name){
            alert("Nombre invalido.");
            if(typeof callback === "function")callback(true);
            return;
        }

        const id = Number(window.prompt("Ingrese ID del articulo: "));
        const price = parseFloat(window.prompt("Ingrese el precio del articulo:"));
		const stock = parseInt(window.prompt("Ingrese stock del articulo:"));

        self._api.newArticle(username, name, id, price, stock, function(result){
            if(!result.status){
                switch(result.result){
                    case 'NO_PERMISSION':
                        alert("No tenes permisos para agregar articulos");
                        break;
                    case 'NAME_EXISTS':
                        alert("Nombre ya existente.");
                        break;
                    case 'ID_EXISTS':
                        alert("Ya existe un articulo con ese ID.");
                        break;
                    case 'INVALID_DATA':
                        alert("Datos invalidos.");
                        break;
                    default:
                        alert("Error desconocido.");
                }
            }else {
                alert("Articulo agregado correctamente.");
            }
            if(typeof callback === "function")callback(true);
        });
    }

    modifyArticle(callback){

        let self = this;
        const username = self._currentUser;
        const idToEdit = Number(window.prompt("Ingrese el ID del articulo a editar:"));

        if(isNaN(idToEdit)){
            alert("ID invalido.");
            if(typeof callback === "function")callback(true);
            return;
        }

        const newPrice = parseFloat(window.prompt("Ingrese nuevo precio: "));
        const newStock = parseInt(window.prompt("Ingrese nuevo stock:"));

        self._api.editArticle(username, idToEdit, newPrice, newStock, function(result){
            if(!result.status){
                switch(result.result){
                    case 'NO_PERMISSION':
                        alert("No tenes permisos para editar articulos.");
                        break;
                    case 'NOT_FOUND':
                        alert("No se encontro un articulo con ese ID.");
                        break;
                    default:
                        alert("Error desconocido.");
                }
            }else{
                alert("Articulo actualizado correctamente.");
            }
            if(typeof callback === "function")callback(true);
        });
    }

    eliminateArticle(callback){
        let self = this;
        const username = self._currentUser;
        const idToDelete = Number(window.prompt("Ingrese el ID del articulo a eliminar:"));

        if(isNaN(idToDelete)){
            alert("ID invalido.");
            if(typeof callback === "function")callback(true);
            return;
        }

        self._api.deleteArticle(username, idToDelete, function(result){
            if(!result.status){
                switch(result.result){
                    case 'NO_PERMISSION':
                        alert("No tenes permiso para eliminar articulos.");
                        break;
                    case 'NOT_FOUND':
                        alert("No se encontro un articulo con ese ID.");
                        break;
                    default:
                        alert("Error desconocido.");
                }
            }else{
                alert("Articulo eliminado correctamente.");
            }
            if(typeof callback === "function")callback(true);
        });
    }

    affordArticle(callback){
        let self = this;
        const username = self._currentUser;
        const idToBuy = Number(window.prompt("Ingrese el ID del articulo a comprar:"));
        
        if(isNaN(idToBuy)){
            alert("ID invalido.");
            if(typeof callback === "function")callback(true);
            return;
        }

        const quantity = Number(window.prompt("Ingrese la cantidad que desea comprar: "));

        if(isNaN(quantity) || quantity <= 0){
            alert("Cantidad invalida.");
            if(typeof callback === "function")callback(true);
            return;
        }

        self._api.buyArticle(username, idToBuy, quantity, function(result){
            if(!result.status){
                switch(result.result){
                    case 'NO_PERMISSION':
                        alert("No tenes permisos para comprar articulos");
                        break;
                    case 'NOT_FOUND':
                        alert("No se encontro un articulo con ese ID.");
                        break;
                    case 'NO_STOCK':
                        alert("El articulo no tiene stock disponible");
                        break;
                    case 'INSUFFICIENT_STOCK':
                        alert("Stock insuficiente. Solo hay" + result.available + "unidades disponibles");
                        break;
                    default:
                        alert("Error desconocido.");
                }
            }else{
                const data = result.result;
                const confirmPurchase = window.confirm(
                "Desea comprar" + data.quantity + "unidades de " + data.name +" por un total de $"+ (data.price * data.quantity).toFixed(2)+ "?"
                );
                if(confirmPurchase){
                    alert("Compra realizada con exito. Nuevo stock:" + data.remaining);
                }else{
                    alert("Compra cancelada.");
                }
            }
            if(typeof callback === "function")callback(true);
        });
    }
}

export { ApplicationView };