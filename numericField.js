class NumericField extends HTMLElement {
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
    if (this.input) {
      this.input.value = val ?? "";
    }
  }

  connectedCallback() {
    if (this.shadowRoot) {
      return;
    }

    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");

    this.input = document.createElement("input");
    this.input.setAttribute("type", "number");
    this.input.id = this.getAttribute("id") || "";

    if (this.hasAttribute("value")) {
      this.input.value = this.getAttribute("value");
    }

    wrapper.appendChild(this.input);

    const style = document.createElement("style");
    style.textContent = `
      .wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      input {
        width: 5rem;
        padding: 0.45rem 0.65rem;
        font: inherit;
        font-variant-numeric: tabular-nums;
        color: var(--text-primary, #e8edf4);
        background: var(--bg-elevated, #243044);
        border: 1px solid var(--border, rgba(255, 255, 255, 0.08));
        border-radius: 8px;
        outline: none;
        transition: border-color 0.15s;
      }

      input:focus {
        border-color: var(--accent, #3b9eff);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    this.input.addEventListener("input", (e) => {
      this.handleInput(e);
    });
  }

  handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent("input", { bubbles: true, detail: { value: e.target.value } })
    );
  }
}

customElements.define("numeric-field", NumericField);
