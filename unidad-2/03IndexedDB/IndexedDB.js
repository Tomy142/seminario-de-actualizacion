const DB_NAME = 'IndexedDB';
const DB_VERSION = 1;
const USERS_STORE_NAME = 'usuario';
const ARTICLES_STORE_NAME = 'articulo';

let db;

/**
 * @param {function(IDBDatabase)successCallback}
 * @param {function(DOMException)errorCallback}
 */

function openDatabase(successCallback,errorCallback){

    console.log("IndexedDB: Intentando abrir la base de datos");
    let request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function(event){
        db = event.target.result;
        console.log('IndexedDB: onpugraded-needed- Creando/actualizando object stores...');

        if(!db.objectStoreNames.contains(USERS_STORE_NAME)){
            let usersStore = db.createObjectStore(USERS_STORE_NAME,{keyPath: 'username'});
            usersStore.createIndex('role', 'role', {unique: false});
            console.log("Object store '" + USERS_STORE_NAME+ "'creado.");
        }

        if(!db.objectStoreNames.contains(ARTICLES_STORE_NAME)){
            let articlesStore = db.createObjectStore(ARTICLES_STORE_NAME,{keyPath: 'id'});
            articlesStore.createIndex('name', 'name', {unique: true});// para editar/borrar por nombre
            console.log("Object store '"+ ARTICLES_STORE_NAME+ "'creado.");
        }
    };

    request.onsuccess = function(event){
        db = event.target.result;
        console.log('IndexedDB: Base de datos  abierta exitosamente.');
        if(typeof successCallback === 'function'){
            successCallback(db);
        }
    };

    request.onerror = function(event){
        db = event.target.result;
        console.log('IndexedDB: Error al abrir base de datos:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };

    request.onblocked = function(){
        console.warn('IndexedDB: Operacion bloqueada. Cierra otras pestañas para continuar.');
        alert('Por favor, cierra otras pestañas o ventanas que tengan esta aplicacion abierta.');
    };
}

/**
 * @param {Object} userData
 * @param {function()} successCallback
 * @param {function(DOMException)} errorCallback 
 */

function addOrUpdateUser(userData, successCallback, errorCallback){
    if(!db){

        openDatabase(
            function(){ addOrUpdateUser(userData, successCallback, errorCallback);},
            errorCallback
        );
        return;
    }

    let transaction = db.transaction([USERS_STORE_NAME], 'readwrite');
    let store = transaction.objectStore(USERS_STORE_NAME);

    let request = store.put(userData);
    
    request.onsuccess = function(){
        console.log('Usuario agregado/actualizado exitosamente: ', userData.username);
    };

    request.onerror = function(event){
        console.error('Error al agregar/actualizar usuario:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };

    transaction.oncomplete = function(){
        if(typeof successCallback === 'function'){
            successCallback();
        }
    };

    transaction.onerror = function(event){
        console.error('Error en la transaccion de usuario', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };
}

/**
 * 
 * @param {Object} articleData
 * @param {function()} successCallback
 * @param {function(DOMException)} errorCallback
 */

function addOrUpdateArticle(articleData, successCallback, errorCallback){
    if(!db){
        openDatabase(
            function() { addOrUpdateArticle(articleData, successCallback, errorCallback);},
            errorCallback
        );
        return;
    }

    let transaction = db.transaction([ARTICLES_STORE_NAME], 'readwrite');
    let store = transaction.objectStore(ARTICLES_STORE_NAME);

    let request = store.put(articleData);

    request.onsuccess = function(){
        console.log('Articulo agregdo/actualizado exitosamente', articleData.name);
    };

    request.onerror = function(event){
        console.error('Error al agregar/actualizar articulo:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };

    transaction.oncomplete = function(){
        if(typeof successCallback === 'function'){
            successCallback();
        }
    };

    transaction.onerror = function(event){
        console.error('Error en la transaccion de articulo:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };
}

/**
 * @param {string} username
 * @param {function(Object|undefined)} successCallback
 * @param {function(DOMException)} errorCallback
 */

function getUser(username, successCallback, errorCallback){
    if(!db){
        openDatabase(
            function() {getUser(username, successCallback, errorCallback);},
            errorCallback
        );
        return;
    }

    let transaction = db.transaction([USERS_STORE_NAME], 'readonly');
    let store = transaction.objectStore(USERS_STORE_NAME);
    let request = store.get(username);

    request.onsuccess = function(event){
        if(typeof  successCallback === 'function'){
            successCallback(event.target.result);
        }
    };

    request.onerror = function(event){
        console.error('Error al obtener usuario:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };
}

/**
 * @param {number} id
 * @param {function(Object|undefined)} successCallback
 * @param {function(DOMException)} errorCallback
 */

function getArticleById(id, successCallback, errorCallback){
    if(!db){
        openDatabase(
            function(){ getArticleById(id, successCallback, errorCallback); },
            errorCallback
        );
        return;
    }

    let transaction = db.transaction([ARTICLES_STORE_NAME], 'readonly');
    let store = transaction.objectStore(ARTICLES_STORE_NAME);

    let request = store.get(id);

    request.onsuccess = function(event){
        if(typeof successCallback === 'function'){
            successCallback(event.target.result);
        }
    };

    request.onerror = function(event){
        console.log('Error al obtener articulo por ID:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };
}

/**
 * @param {string} name
 * @param {function(Object|undefined)} successCallback
 * @param {function(DOMException)} errorCallback
 */

function getArticleByName(name, successCallback, errorCallback){
    if(!db){
        openDatabase(
            function(){getArticleByName(name, successCallback, errorCallback); },
            errorCallback
        );
        return;
    }

    let transaction = db.transaction([ARTICLES_STORE_NAME], 'readonly');
    let store = transaction.objectStore(ARTICLES_STORE_NAME);
    let index = store.index('name');

    let request = index.get(name);

    request.onsuccess = function(event){
        if(typeof successCallback === 'function'){
            successCallback(event.target.result);
        }
    };

    request.onerror = function(event){
        console.error('Error al obtener articulo por nombre:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };
}

/**
 * @param {string} username
 * @param {function()} successCallback
 * @param {function(DOMException)} errorCallback
 */

function deleteUser(username, successCallback, errorCallback){
    if(!db){
        openDatabase(
            function(){deleteUser(username, successCallback, errorCallback);},
            errorCallback
        );
        return;
    }

    let transaction = db.transaction([USERS_STORE_NAME], 'readwrite');
    let store = transaction.objectStore(USERS_STORE_NAME);

    let request = store["delete"](username);

    request.onsuccess = function(){
        console.log('Usuario elimnado exitosamente:', username);
    };

    request.onerror = function(event) {
        console.error('Error al eliminar usuario:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };

    transaction.oncomplete = function(){
        if(typeof successCallback === 'function'){
            successCallback();
        }
    };

    transaction.onerror = function(event){
        console.error('Error en la transaccion de eliminacion de usuario:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };
}

/**
 * @param {number} id
 * @param {function()} successCallback
 * @param {function(DOMException)} errorCallback
 */

function deleteArticle(id, successCallback, errorCallback){
    if(!db){
        openDatabase(
            function(){deleteArticle(id, successCallback, errorCallback); },
            errorCallback
        );
        return;
    }

    let transaction = db.transaction([ARTICLES_STORE_NAME], 'readwrite');
    let store = transaction.objectStore(ARTICLES_STORE_NAME);

    let request = store["delete"](id);

    request.onsuccess = function(){
        console.log('Articulo eliminado exitosamente:', id);
    };

    request.onerror = function(event){
        console.error('Error al eliminar articulo:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };

    transaction.oncomplete = function(){
        if(typeof successCallback === 'function'){
            successCallback();
        }
    };

    transaction.onerror = function(event){
        console.error('Error en la transaccion de la eliminacion de articulo:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };
}

/**
 * @param {function(Array<Object>)} successCallback
 * @param {function(DOMException)} errorCallback
 */

function getAllUsers(successCallback, errorCallback){
    if(!db){
        openDatabase(
            function(){getAllUsers(successCallback, errorCallback);},
            errorCallback
        );
        return;
    }

    let transaction = db.transaction([USERS_STORE_NAME], 'readonly');
    let store = transaction.objectStore(USERS_STORE_NAME);

    let request = store.getAll();

    request.onsuccess = function(event){
        if(typeof successCallback === 'function'){
            successCallback(event.target.result);
        }
    };

    request.onerror = function(event){
        console.error('Error al listar usuarios:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };
}

/**
 *  @param {function(Array<Object>)} successCallback
 *  @param {function(DOMException)} errorCallback
 */

function getAllArticles(successCallback, errorCallback){
    if(!db){
        openDatabase(
            function(){getAllArticles(successCallback, errorCallback); },
            errorCallback
        );
        return;
    }

    let transaction = db.transaction([ARTICLES_STORE_NAME], 'readonly');
    let store = transaction.objectStore(ARTICLES_STORE_NAME);

    let request = store.getAll();

    request.onsuccess = function(event){
        if(typeof successCallback === 'function'){
            successCallback(event.target.result);
        }
    };

    request.onerror = function(event){
        console.error('Error al listar articulos:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };
}

/**
 * @param {function()} successCallback
 * @param {function(DOMException)} errorCallback
 */

function clearUsersStore(successCallback, errorCallback){
    if(!db){
        openDatabase(
            function() { clearUsersStore(successCallback, errorCallback); },
            errorCallback
        );
        return;
    }

    let transaction = db.transaction([USERS_STORE_NAME], 'readwrite');
    let store = transaction.objectStore(USERS_STORE_NAME);

    let request = store.clear();

    request.onsuccess = function(){
        console.log('Object store de usuarios limpiado');
    };

    request.onerror = function(event){
        console.error('Error al limpiar object store de usuarios:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };

    transaction.oncomplete = function(){
        if(typeof successCallback === 'function'){
            successCallback();
        }
    };

    transaction.onerror = function(event){
        console.error('Error en la transaccion de limpieza de usuarios:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };
}

/**
 * @param {function()} successCallback
 * @param {function(DOMException)} errorCallback
 */

function clearArticlesStore(successCallback, errorCallback){
    if(!db){
        openDatabase(
            function(){clearArticlesStore(successCallback, errorCallback); },
            errorCallback
        );
        return;
    }

    let transaction = db.transaction([ARTICLES_STORE_NAME], 'readwrite')
    let store = transaction.objectStore(ARTICLES_STORE_NAME);

    let request = store.clear();

    request.onsuccess = function(){
        console.log('Object store de articulos limpiado.');
    };

    request.onerror = function(event){
        console.error('Error al limpiar object store de articulos:', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };

    transaction.oncomplete = function(){
        if(typeof successCallback === 'function'){
            successCallback();
        }
    };

    transaction.onerror = function(event){
        console.error('Error en la transaccion de limpieza de articulos', event.target.error);
        if(typeof errorCallback === 'function'){
            errorCallback(event.target.error);
        }
    };
} 

export{
    openDatabase,
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
	
}