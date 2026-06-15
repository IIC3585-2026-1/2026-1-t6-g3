
class MyHorizontalScroll extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot) {
            return;
        }

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                .scroll-container {
                    display: flex;
                    gap: 1rem;
                    overflow-x: auto;
                    padding: 1rem;
                    scroll-snap-type: x mandatory;
                }

                ::slotted(*) {
                    flex: 0 0 auto;
                    scroll-snap-align: start;
                }
            </style>

            <div class="scroll-container">
                <slot></slot>
            </div>
        `;

    }
}

customElements.define("my-horizontal-scroll", MyHorizontalScroll);
