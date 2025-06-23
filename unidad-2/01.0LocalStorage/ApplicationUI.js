class ApplicationView {
    constructor(apiInstanceObject) {
        this._api = apiInstanceObject;
        this._attempts = 0;
    }

    initializeView(){

        const loginResult = this.welcomeMenu();
        console.log("sigo vivo")
        if ( loginResult.result === 'USER_PASSWORD_FAILED' )
		{
            this._attempts++;
            if(this._attempts >= this._api.getMaxLoginFailedAttempts())
            {
                alert('Demasiados intentos fallidos. Saliendo...');
                return{status: false, result: 'MAX_ATTEMPTS_REACHED'};
            }
            
            return this.initializeView();
        }

        if(loginResult.status){
            this.handlerUserSession(loginResult.username, loginResult.role);
            console.log("estoy vivo y logeado")
            return {status: true, result: 'LOGIN_SUCCESS'};
        }

        return {status: false, result: 'NO_LOGIN'};
        /*
        let isRunnning = true;
        while(isRunnning)
		{
			const loginResult = this.welcomeMenu();
        
            this._api_return = loginResult;

			if ( loginResult.result === 'USER_PASSWORD_FAILED' )
			{
				this._attempts++;
                if(this._attempts >= this._maxLoginFailedAttempts){
                    alert('Demasiados intentos fallidos. Saliendo...');
                    isRunnning = false;
                    break;
                }
			}

			if(loginResult.status){
                this.handlerUserSession(loginResult.username, loginResult.role);
                isRunnning = false;
            }
        }*/
    }

    handlerUserSession(username, role){
        /*let sessionActive = true;
        while(sessionActive){
            sessionActive= this.userOptions(username, role);
        }*/

        const shouldContinueRunning = this.userOptions(username, role);
        if(!shouldContinueRunning){
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            alert("Sesion cerrada. Volviendo al menu principal.");
            this._attempts = 0; //cierra sesion y resetea intentos
            this.initializeView();
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
        
        let api_return = this._api.authenticateUser(username, password);
        
        api_return.username = username || '';
        
        if (api_return.status) {
            localStorage.setItem("username", username);
            localStorage.setItem("role", api_return.role);

            alert(`Usuario autenticado exitosamente. Rol: ${api_return.role}`);
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

        return api_return;	
    }

    userOptions(username, role) {

        /*const username = localStorage.getItem("username") || '';
        const role = (localStorage.getItem("role") || '').trim();*/

        const optMap = new Map();
        let optNumber = 1;
        let optionText = "";
    

        // Opción 1: Cambiar contraseña (disponible para todos los roles)
        optMap.set(optNumber, () => { this.passwordChanger(); return true; }); //tiene que redirigir a un change password UI
        optionText += `${optNumber}. Cambiar contraseña || `;
        optNumber++;

        // Opción 2: Gestor de Artículos (disponible para todos los roles)
        optMap.set(optNumber, () => { this.articleHandlerMenu(); return true;});
        optionText += `${optNumber}. Gestor de Articulos || `;
        optNumber++;

        // Opción 3: Crear usuario (solo para Administrador)
        if (role === "Administrador") {
            optMap.set(optNumber, () => { this.createUser(); return true; });
            optionText += `${optNumber}. Crear usuario || `;
            optNumber++;
        }
        
        // Opción X: Salir
        optMap.set("x", () => { return false; });
        optMap.set("X", () => { return false; });
        optionText += "X. Salir";

        let option = window.prompt(optionText);
        let parsedOpt = isNaN(option) ? option : Number(option);
        
        if (optMap.has(parsedOpt)) {
            let shouldContinue = optMap.get(parsedOpt)();
            if (shouldContinue === false){
                return false;
            } 
            return this.userOptions(username, role);
        } else {
            alert("Opcion invalida");
            return this.userOptions(username, role);
        }
    }

    exitToMain() {
        alert("Saliendo...");
        //limpiar LocalStorage
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        let exit = this.showLogin();
        if (exit.status) {
            this.userOptions();
        }
    }

    passwordChanger()
    {
        const username = localStorage.getItem("username") || '';
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

            localStorage.setItem("username", user);
            localStorage.setItem("role", role);

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
        return result;
    }

    articleHandlerMenu() {

        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");

        const userdata = this._api.isValidUserGetData(username);
        if (userdata) {
            let ArticleOptMap = new Map();
            
            const normalizedRole = (role || '').trim();

            
            let articleText = "";
            let optionNumber = 1;
            ArticleOptMap.clear();

            // Listar artículos (disponible para todos los roles)
            articleText += `${optionNumber}. Listar articulos || `;
            ArticleOptMap.set(optionNumber, () => { this.listOfArticles(); return true; });
            optionNumber++;

            // Opciones específicas según el rol
            switch (normalizedRole) {
                case "Administrador":
                    articleText += `${optionNumber}. Nuevo articulo || `;
                    ArticleOptMap.set(optionNumber, () => { this.addArticle(); return true; });
                    optionNumber++;
                    articleText += `${optionNumber}. Editar articulo || `;
                    ArticleOptMap.set(optionNumber, () => { this.modifyArticle(); return true; });
                    optionNumber++;
                    articleText += `${optionNumber}. Eliminar articulo || `;
                    ArticleOptMap.set(optionNumber, () => { this.eliminateArticle(); return true; });
                    optionNumber++;
                    break;
                
                case "Vendedor":
                case "Cliente":
                    articleText += `${optionNumber}. Comprar articulo || `;
                    ArticleOptMap.set(optionNumber, () => { this.affordArticle(); return true; });
                    optionNumber++;
                    break;
                
                case "Trabajador de deposito":
                    articleText += `${optionNumber}. Editar articulo || `;
                    ArticleOptMap.set(optionNumber, () => { this.modifyArticle(); return true; });
                    optionNumber++;
                    break;
            }

            articleText += `${optionNumber}. Salir`;
            ArticleOptMap.set(optionNumber, () => { return false; });

            let articleOpt = Number(window.prompt(articleText));
            if (ArticleOptMap.has(Number(articleOpt))) {
                let shouldContinue = ArticleOptMap.get(Number(articleOpt))();
                if(shouldContinue === false){
                    return false;
                }
                return this.articleHandlerMenu();
            } else {
                alert("Opcion invalida");
                return this.articleHandlerMenu();
            }
        }
        return false;
    }

    listOfArticles(){
        const username = localStorage.getItem("username");
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

    addArticle(){

        const username = localStorage.getItem("username");

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

    modifyArticle(){

        const username = localStorage.getItem("username");
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

    eliminateArticle(){
        const username = localStorage.getItem("username");
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

    affordArticle(){
        
        const username = localStorage.getItem("username");

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