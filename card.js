class MyCard extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
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
          width: var(--card-width, 250px);
          height: var(--card-height, auto);
          box-sizing: border-box;
          background: var(--card-bg, var(--surface, #1a2332));
          color: var(--card-color, var(--text-main, #e8edf4));
          border: var(--card-border, 1px solid rgba(255, 255, 255, 0.08));
          border-radius: var(--card-radius, 12px);
          box-shadow: var(--card-shadow, none);
          padding: var(--card-padding, 0);
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        :host([active]) {
          border-color: var(--accent, #3b9eff);
          box-shadow: 0 0 0 1px var(--accent, #3b9eff);
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
