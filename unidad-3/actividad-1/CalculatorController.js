class CalculatorController{
    constructor(ui){
        this.ui = ui;
		this.display = ui.display;
		
    }
    
    onButtonCalculateClick(event)
	{
		this.display.value = eval(this.display.value);
	}

	onButton0Click(event)
	{
		this.display.value += '0';
	}

	onButton1Click(event)
	{
		this.display.value += '1';
	}

	onButton2Click(event)
	{
		this.display.value += '2';
	}

	onButton3Click(event)
	{
		this.display.value += '3';
	}

	onButton4Click(event)
	{
		this.display.value += '4';
	}

	onButton5Click(event)
	{
		this.display.value += '5';
	}

	onButton6Click(event)
	{
		this.display.value += '6';
	}

	onButton7Click(event)
	{
		this.display.value += '7';
	}

	onButton8Click(event)
	{
		this.display.value += '8';
	}

	onButton9Click(event)
	{
		this.display.value += '9';
	}

	onButtonDotClick(event)
	{
		this.display.value += '.';
	}

	onButtonSubClick(event)
	{
		this.display.value += '-';
	}

	onButtonPlusClick(event)
	{
		this.display.value += '+';
	}

	onButtonMultiplyClick(event)
	{
		this.display.value += '*';
	}

	onButtonDivideClick(event)
	{
		this.display.value += '/';
	}
	
	onButtonDeleteClick(event)
	{
		this.display.value = '';
	}
}

customElements.define('x-controller', CalculatorController );

export{CalculatorController}