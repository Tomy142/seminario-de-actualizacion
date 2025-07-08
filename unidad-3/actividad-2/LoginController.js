class LoginController{
    constructor(ui){
        this.ui = ui;
		this.display = ui.display;
		
    }
    
    onButtonLoginClick(event)
	{
		
	}

}

customElements.define('x-controller', LoginController );

export{LoginController}