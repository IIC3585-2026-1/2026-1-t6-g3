class SliderLabel extends HTMLElement {
    connectedCallback() {
        if (this.shadowRoot) {
            return;
        }

        const shadow = this.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        style.textContent = `
            :host {
                position: absolute;
                transform: translateX(-50%);
                white-space: nowrap;
                font-size: 0.75rem;
                color: var(--text-muted, #8b9cb3);
            }
        `;

        const slot = document.createElement("slot");

        shadow.appendChild(style);
        shadow.appendChild(slot);

        this.updatePosition();
    }

    static get observedAttributes() {
        return ["position"];
    }

    attributeChangedCallback() {
        this.updatePosition();
    }

    updatePosition() {
        const slider = this.closest("my-slider");
        const min = Number(slider?.getAttribute("min") ?? 0);
        const max = Number(slider?.getAttribute("max") ?? 100);
        const pos = this.hasAttribute("position")
            ? Number(this.getAttribute("position"))
            : min;
        const percent = ((pos - min) / (max - min)) * 100;

        this.style.left = percent + "%";
    }
}

class Slider extends HTMLElement {
    constructor() {
        super();
    }

    get value() {
        return this.getAttribute("value");
    }

    set value(val) {
        if (val !== null && val !== undefined && val !== "") {
            this.setAttribute("value", val);
        } else {
            this.removeAttribute("value");
        }
        if (this.rangeInput) {
            this.rangeInput.value = val ?? "";
        }
    }

    connectedCallback() {
        if (this.shadowRoot) {
            return;
        }

        const shadow = this.attachShadow({ mode: "open" });
        const template = document.getElementById("slider-template");
        shadow.appendChild(template.content.cloneNode(true));

        this.rangeInput = shadow.querySelector('input[type="range"]');

        this.rangeInput.min = this.getAttribute("min") ?? 0;
        this.rangeInput.max = this.getAttribute("max") ?? 100;
        this.rangeInput.step = this.getAttribute("step") ?? 1;
        this.rangeInput.value = this.getAttribute("value") ?? 50;

        this.rangeInput.addEventListener("input", e => { this.handleInput(e); });

        this.querySelectorAll("slider-label").forEach(label => {
            label.updatePosition();
        });
    }

    handleInput(e) {
        this.value = e.target.value;
    }
}

customElements.define("slider-label", SliderLabel);
customElements.define("my-slider", Slider);