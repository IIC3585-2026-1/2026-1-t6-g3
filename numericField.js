class NumericField extends HTMLElement {
    constructor() {
        super();
    }

    get value() {
        return this.getAttribute('value');
    }

    set value(val) {
        if(val !== null && val !== undefined && val !== "") {
            this.setAttribute('value', val);
        }
        else {
            this.removeAttribute('value');
        }
        if (this.input) {
            this.input.value = val ?? "";
        }
    }

    connectedCallback() {

        if (this.shadowRoot) {
            return;
        }

        const shadow = this.attachShadow({mode: "open"});

        const wrapper = document.createElement("span");
        wrapper.setAttribute("class", "wrapper");

        this.input = document.createElement("input");
        this.input.setAttribute("type", "number");

        if (this.hasAttribute("value")) {
            this.input.value = this.getAttribute("value");
        }

        wrapper.appendChild(this.input);
        shadow.appendChild(wrapper);      
        
        this.input.addEventListener("input", e => { this.handleInput(e); });

        const style = document.createElement("style");
        style.textContent = `
        .wrapper {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        input {
            width: 5rem;
            padding: 0.25rem 0.5rem;
            font: inherit;
            border: 1px solid #333;
            border-radius: 4px;
        }

        button {
            padding: 0.25rem 0.5rem;
            cursor: pointer;
            border: 1px solid #333;
            border-radius: 4px;
            background-color: #fff;
        }

        button:hover {
            background-color: #eee;
        }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }

    handleInput(e) {
        this.value = e.target.value;
    }

    
}

customElements.define("numeric-field", NumericField);