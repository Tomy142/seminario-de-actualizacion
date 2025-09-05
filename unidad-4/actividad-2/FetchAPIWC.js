class FetchAPIExample extends HTMLElement{
    constructor(){
        super();

        this.requestBtn = document.createElement('button');
        this.clearBtn = document.createElement('button');
        this.outputTextArea = document.createElement('textarea');

        this.requestBtn.innerText = 'Efectuar petición';
        this.clearBtn.innerText = 'Limpiar';

        this.appendChild(this.requestBtn);
        this.appendChild(this.clearBtn);
        this.appendChild(this.outputTextArea);
    }

    onClearButtonClick(event){
        this.outputTextArea.value = '';
    }

    async onRequestButtonClick(event){
        let response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        let response_json = await  response.json();

        this.outputTextArea.value = JSON.stringify(response_json);
    }

    connectedCallback(){
        this.requestBtn.onclick = this.onRequestButtonClick.bind(this);
        this.clearBtn.onclick = this.onClearButtonClick.bind(this);
    }

    disconnectedCallback(){
        this.requestBtn.onclick = null;
    }
}

customElements.define('x-request', FetchAPIExample);

export{FetchAPIExample}