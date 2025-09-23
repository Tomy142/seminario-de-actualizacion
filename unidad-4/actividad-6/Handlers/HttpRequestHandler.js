class HttpRequestHandler{
    constructor(){
        this.baseURL = 'http://jsonplaceholder.typicode.com';
    }

    makeRequest(url, method = 'GET', data = null){
        return new Promise(function(resolve, reject){
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function(){
                if(xhr.readyState == 4){
                    if(xhr.status >= 200 && xhr.status < 300){
                        try{
                            const responseData = JSON.parse(xhr.responseText);
                            resolve(responseData);
                        }catch(error){
                            reject(new Error('Error parsing JSON: ' + error.message));
                        }
                    }else{
                        reject(new Error('HTTP Error: '+ xhr.status + '-' + xhr.statusText));
                    }
                }
            };

            xhr.onerror = function(){
                reject(new Error('Network error: ' + xhr.statusText));
            };

            if(data){
                xhr.setRequestHeader('Content-Type', 'application/json');
            }else{
                xhr.send();
            }
        });
    }

    getUser(){
        return this.makeRequest(this.baseURL + '/users/');
    }

    getUserById(userId){
        return this.makeRequest(this.baseURL +'/users/'+ userId);
    }
}

export{HttpRequestHandler}