class MyCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot) {
            return;
        }

        const shadow = this.attachShadow({ mode: "open" });
        // The variables are defined in the styles.css file so we can use them here
        // IA help with this
        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: var(--card-width, 250px);
                    height: var(--card-height, auto);
                    box-sizing: border-box;
                    background: white;

                    overflow: hidden;
                }

                .content {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                }
            </style>

            <div class="content">
                <slot></slot>
            </div>
        `;
    }
}
customElements.define("my-card", MyCard);