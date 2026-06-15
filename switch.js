class MiSwitch extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["checked", "disabled"];
  }

  get checked() {
    return this.hasAttribute("checked");
  }

  set checked(value) {
    if (value) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  connectedCallback() {
    if (this.shadowRoot) {
      return;
    }

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: inherit;
          color: var(--text-primary, #e8edf4);
        }

        .container {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        ::slotted(label) {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-muted, #8b9cb3);
        }

        button {
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .track {
          width: 48px;
          height: 26px;
          background: var(--switch-track-off, #243044);
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          padding: 3px;
          box-sizing: border-box;
          transition: background 0.2s;
        }

        .thumb {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: transform 0.2s;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }

        :host([checked]) .track {
          background: var(--switch-track-on, #34d399);
        }

        :host([checked]) .thumb {
          transform: translateX(22px);
        }

        .message {
          font-size: 0.85rem;
          color: var(--text-primary, #e8edf4);
        }

        .checked-message {
          display: none;
        }

        :host([checked]) .checked-message {
          display: inline;
        }

        :host([checked]) .unchecked-message {
          display: none;
        }
      </style>

      <div class="container">
        <slot></slot>

        <button type="button" role="switch" aria-checked="false">
          <span class="track">
            <span class="thumb"></span>
          </span>
        </button>

        <span class="message">
          <span class="checked-message">
            <slot name="checked-message">On</slot>
          </span>

          <span class="unchecked-message">
            <slot name="unchecked-message">Off</slot>
          </span>
        </span>
      </div>
    `;

    this.button = shadow.querySelector("button");

    this.button.addEventListener("click", () => {
      this.toggle();
    });

    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  toggle() {
    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { checked: this.checked },
        bubbles: true,
      })
    );
  }

  update() {
    if (!this.button) {
      return;
    }

    this.button.setAttribute("aria-checked", String(this.checked));
    this.button.disabled = this.disabled;
  }
}

customElements.define("my-switch", MiSwitch);
