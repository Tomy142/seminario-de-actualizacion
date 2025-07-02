class Table extends HTMLElement
{
    constructor()
    {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.textContent = `
            table{
                background-color: rgb(31, 31, 31);
                margin-top:10%;
                width: 400px;
                height:400px;
                padding: 10px 10px 10px 10px;
                border-radius: 5%;
            }
        `
    }
}