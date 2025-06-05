class ApplicationView {
    constructor(apiInstanceObject) {
        this._api = apiInstanceObject;
    }

    initializeView(){
        while(true)
		{
			this._api_return = this.welcomeMenu();

			if ( this._api_return.result == 'USER_PASSWORD_FAILED' )
			{
				this._attempts++;
			}

			if(this._api_return.status){
				let keeprunning = true;
				while(keeprunning){
					keeprunning = this.userOptions(this._api_return.username, this._api_return.role);
				}
			}
		}
    }
    welcomeMenu() {
        const menuOpt = new Map();
        menuOpt.set(1, () => this.showLogin());
        
        let option = Number(window.prompt("1. Iniciar Sesion"));
        if (menuOpt.has(option)) {
            return menuOpt.get(option)();
        } else {
            alert("Opcion invalida");
            return { status: false, result: 'INVALID_OPTION' };
        }
    }

    showLogin() {
        let username = window.prompt("Ingrese su nombre de usuario:");
        let password = window.prompt("Ingrese contraseña:");
        let role = window.prompt("Ingrese su rol exactamente como: Administrador, Vendedor, Cliente, Trabajador de deposito");
        
        let api_return = this._api.authenticateUser(username, password, role);
        
        // Asignar el username y role al api_return
        api_return.username = username || '';
        api_return.role = role || '';
        
        if (api_return.status) {
            alert('Usuario autenticado exitosamente');
        } else {
            switch (api_return.result) {
                case 'BLOCKED_USER':
                    alert('Usuario bloqueado. Contacte al administrador');
                    break;
                case 'USER_PASSWORD_FAILED':
                    alert('Usuario y/o contraseña incorrecta');
                    break;
                case 'ROLE_MISMATCH':
                    alert('El rol no coincide con el usuario. Debe ser exactamente: Administrador, Vendedor, Cliente, o Trabajador de deposito');
                    break;
                default:
                    alert('Error desconocido');
                    break;
            }
        }

        return api_return;	
    }

    userOptions(username, role) {
        const optMap = new Map();
        let optNumber = 1;
        let optionText = "";
        const normalizedRole = (role || '').trim();

        // Opción 1: Cambiar contraseña (disponible para todos los roles)
        optMap.set(optNumber, () => { this.passwordChanger(username); }); //tiene que redirigir a un change password UI
        optionText += `${optNumber}. Cambiar contraseña || `;
        optNumber++;

        // Opción 2: Gestor de Artículos (disponible para todos los roles)
        optMap.set(optNumber, () => { this.articleHandlerMenu(username, normalizedRole); });
        optionText += `${optNumber}. Gestor de Articulos || `;
        optNumber++;

        // Opción 3: Crear usuario (solo para Administrador)
        if (normalizedRole === "Administrador") {
            optMap.set(optNumber, () => { this.createUser(username); });
            optionText += `${optNumber}. Crear usuario || `;
            optNumber++;
        }
        
        // Opción X: Salir
        optMap.set("x", () => { return 'EXIT_TO_MAIN' });
        optMap.set("X", () => { return 'EXIT_TO_MAIN' });
        optionText += "X. Salir";

        let option = window.prompt(optionText);
        let parsedOpt = isNaN(option) ? option : Number(option);
        
        if (optMap.has(parsedOpt)) {
            let result = optMap.get(parsedOpt)();
            if (result === 'EXIT_TO_MAIN') return false;
        } else {
            alert("Opcion invalida");
        }
        return true;
    }

    exitToMain() {
        alert("Saliendo...");
        let exit = this.showLogin();
        if (exit.status) {
            this.userOptions(exit.username, exit.role);
        }
    }

    passwordChanger(username)
    {
        let userdata = this._api.isValidUserGetData(username);

        if(userdata)
        {
            let newPassword = window.prompt("Ingrese una nueva contraseña para "+username+": ");

            let result = this._api.changePassword(userdata, newPassword);
            if(result.status === true)
            {
                alert("Contraseña cambiada exitosamente");
            }
            
        }else{
			alert("Operacion Cancelada...");
        }
    }

    createUser() {
        let user = window.prompt("Ingrese el nombre del nuevo usuario: ");
        let pass = window.prompt("Ingrese la contraseña: ");
        let role = window.prompt("Ingrese el rol del usuario: Administrador, Cliente, Vendedor, Trabajador de deposito");

        if(!user || user.trim()=== ""){
            alert("El nombre de usuario no puede estar vacio.");
            return;
        }

        if (!['Administrador', 'Cliente', 'Vendedor', 'Trabajador de deposito'].includes(role)) {
            alert("Rol invalido");
            return;
        }

        const result = this._api.addUser(user, pass, role);

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
        return { status: false, result: 'CREATED_OR_FAILED' };
    }

    articleHandlerMenu(username, role) {
        let userdata = this._api.isValidUserGetData(username);
        if (userdata) {
            let ArticleOptMap = new Map();
            let keepRunning = true;
            const normalizedRole = (role || '').trim();

            while (keepRunning) {
                let articleText = "";
                let optionNumber = 1;
                ArticleOptMap.clear();

                // Listar artículos (disponible para todos los roles)
                articleText += `${optionNumber}. Listar articulos || `;
                ArticleOptMap.set(optionNumber, () => { this.listOfArticles(username); });
                optionNumber++;

                // Opciones específicas según el rol
                switch (normalizedRole) {
                    case "Administrador":
                        articleText += `${optionNumber}. Nuevo articulo || `;
                        ArticleOptMap.set(optionNumber, () => { this.addArticle(username); });
                        optionNumber++;
                        articleText += `${optionNumber}. Editar articulo || `;
                        ArticleOptMap.set(optionNumber, () => { this.modifyArticle(username); });
                        optionNumber++;
                        articleText += `${optionNumber}. Eliminar articulo || `;
                        ArticleOptMap.set(optionNumber, () => { this.eliminateArticle(username); });
                        optionNumber++;
                        break;
                    
                    case "Vendedor":
                    case "Cliente":
                        articleText += `${optionNumber}. Comprar articulo || `;
                        ArticleOptMap.set(optionNumber, () => { this.affordArticle(username); });
                        optionNumber++;
                        break;
                    
                    case "Trabajador de deposito":
                        articleText += `${optionNumber}. Editar articulo || `;
                        ArticleOptMap.set(optionNumber, () => { this.modifyArticle(username); });
                        optionNumber++;
                        break;
                }

                articleText += `${optionNumber}. Salir`;
                ArticleOptMap.set(optionNumber, () => { keepRunning = false; });

                let articleOpt = Number(window.prompt(articleText));
                if (ArticleOptMap.has(Number(articleOpt))) {
                    ArticleOptMap.get(Number(articleOpt))();
                } else {
                    alert("Opcion invalida");
                }
            }
        }
    }

    listOfArticles(username){
        const result = this._api.listArticle(username);

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
            result.result.forEach(article => {
                list +=`Nombre: ${article.name} | ID: ${article.id} | Precio: $${article.price} | Stock: ${article.stock}\n`;
            });
            alert(list);
        }
    }

    addArticle(username){

        const name = window.prompt("Ingrese el nombre del articulo: ");

        if(!name){
            alert("Nombre invalido.");
            return;
        }

        const id = Number(window.prompt("Ingrese ID del articulo: "));
        const price = parseFloat(window.prompt("Ingrese el precio del articulo:"));
		const stock = parseInt(window.prompt("Ingrese stock del articulo:"));

        const result = this._api.newArticle(username, name, id, price, stock);

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
    }

    modifyArticle(username){
        const idToEdit = Number(window.prompt("Ingrese el ID del articulo a editar:"));

        if(isNaN(idToEdit)){
            alert("ID invalido.");
            return;
        }

        const newPrice = parseFloat(window.prompt("Ingrese nuevo precio: "));
        const newStock = parseInt(window.prompt("Ingrese nuevo stock:"));

        const result = this._api.editArticle(username, idToEdit, newPrice, newStock);
        
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
    }

    eliminateArticle(username){
        const idToDelete = Number(window.prompt("Ingrese el ID del articulo a eliminar:"));

        if(isNaN(idToDelete)){
            alert("ID invalido.");
            return;
        }

        const result = this._api.deleteArticle(username, idToDelete);

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
    }

    affordArticle(username){
        
        const idToBuy = Number(window.prompt("Ingrese el ID del articulo a comprar:"));
        
        if(isNaN(idToBuy)){
            alert("ID invalido.");
            return;
        }

        const quantity = Number(window.prompt("Ingrese la cantidad que desea comprar: "));

        if(isNaN(quantity) || quantity <= 0){
            alert("Cantidad invalida.");
            return;
        }

        const result = this._api.buyArticle(username, idToBuy, quantity);

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
                    alert(`Stock insuficiente. Solo hay ${result.available} unidades disponibles`);
                    break;
                default:
                    alert("Error desconocido.");
            }
        }else{
            const data = result.result;
            const confirmPurchase = window.confirm(
			`Desea comprar ${data.quantity} unidades de "${data.name}" por un total de $${(data.price * data.quantity).toFixed(2)}?`
		    );
            if(confirmPurchase){
                alert(`Compra realizada con exito. Nuevo stock: ${data.remaining}`);
            }else{
                alert("Compra cancelada.");
            }
        }
        
        
        
        
        
		
    }
}

export { ApplicationView };