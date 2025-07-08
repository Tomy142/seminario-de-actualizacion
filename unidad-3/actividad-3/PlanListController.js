class PlanListController{
    constructor(ui){
        this.ui = ui;
		this.display = ui.display;
		
    }
    
    onButtonPlanListClick(event)
	{
		
	}

}

customElements.define('x-controller', PlanListController );

export{PlanListController}