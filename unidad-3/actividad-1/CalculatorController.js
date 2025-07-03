class CalculatorController{
    constructor(ui){
        this.ui = ui;
		this.display = ui.display;
		ui.btn0.onclick = this.onButton0Click.bind(this);
		ui.btn1.onclick = this.onButton1Click.bind(this);
		ui.btn2.onclick = this.onButton2Click.bind(this);
		ui.btn3.onclick = this.onButton3Click.bind(this);
		ui.btn4.onclick = this.onButton4Click.bind(this);
		ui.btn5.onclick = this.onButton5Click.bind(this);
		ui.btn6.onclick = this.onButton6Click.bind(this);
		ui.btn7.onclick = this.onButton7Click.bind(this);
		ui.btn8.onclick = this.onButton8Click.bind(this);
		ui.btn9.onclick = this.onButton9Click.bind(this);
		ui.btnDot.onclick = this.onButtonDotClick.bind(this);
		ui.btnSub.onclick = this.onButtonSubClick.bind(this);
		ui.btnPlus.onclick = this.onButtonPlusClick.bind(this);
		ui.btnMultiply.onclick = this.onButtonMultiplyClick.bind(this);
		ui.btnDivide.onclick = this.onButtonDivideClick.bind(this);
		ui.btnCalculate.onclick = this.onButtonCalculateClick.bind(this);
		ui.btnDelete.onclick = this.onButtonDeleteClick.bind(this);
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