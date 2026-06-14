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

        this.btnUp = document.createElement("button");
        this.btnUp.setAttribute("type", "button");
        this.btnUp.setAttribute("data-action", "up");
        this.btnUp.textContent = "+";

        this.btnDown = document.createElement("button");
        this.btnDown.setAttribute("type", "button");
        this.btnDown.setAttribute("data-action", "down");
        this.btnDown.textContent = "-";

        if (this.hasAttribute("value")) {
            this.input.value = this.getAttribute("value");
        }

        wrapper.appendChild(this.input);
        wrapper.appendChild(this.btnUp);
        wrapper.appendChild(this.btnDown);
        shadow.appendChild(wrapper);      
        
        this.btnUp.addEventListener("click", e => { this.handleClick(e); });
        this.btnDown.addEventListener("click", e => { this.handleClick(e); });
        this.input.addEventListener("input", e => { this.handleInput(e); });
    }

    handleClick(e) {
        const action = e.target.dataset.action;
        let current = Number(this.input.value) || 0;

        if (action === "up") {
            current += 1;
        } else if (action === "down") {
            current -= 1;
        }

        this.value = current;
    }

    handleInput(e) {
        this.value = e.target.value;
    }
}

customElements.define("numeric-field", NumericField);