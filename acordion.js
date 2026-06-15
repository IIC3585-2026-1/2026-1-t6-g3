class MiAccordion extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.shadowRoot) {
      return;
    }

    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        width: 100%;
      }

      ::slotted(mi-accordion-item) {
        margin-bottom: 0.5rem;
      }

      ::slotted(mi-accordion-item:last-child) {
        margin-bottom: 0;
      }
    `;

    const slot = document.createElement("slot");

    shadow.appendChild(style);
    shadow.appendChild(slot);

    this.addEventListener("accordion-item-toggle", (event) => {
      if (this.hasAttribute("multiple") || !event.detail.open) {
        return;
      }

      this.querySelectorAll("mi-accordion-item").forEach((item) => {
        if (item !== event.detail.item) {
          item.open = false;
        }
      });
    });
  }
}

class MiAccordionItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["open"];
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    if (value) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.updateExpandedState();
      return;
    }

    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        border: 1px solid var(--border, rgba(255, 255, 255, 0.08));
        border-radius: 8px;
        overflow: hidden;
        background-color: var(--bg-elevated, #243044);
      }

      button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        border: 0;
        border-radius: 0;
        font: inherit;
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--text-primary, #e8edf4);
        background-color: transparent;
        cursor: pointer;
        transition: background-color 0.15s;
      }

      button:hover {
        background-color: rgba(255, 255, 255, 0.04);
      }

      button::after {
        content: "›";
        font-size: 1.1rem;
        line-height: 1;
        color: var(--text-muted, #8b9cb3);
        transform: rotate(90deg);
        transition: transform 0.2s ease;
      }

      :host([open]) button::after {
        transform: rotate(-90deg);
      }

      .content {
        display: none;
        padding: 0.75rem 1rem;
        border-top: 1px solid var(--border, rgba(255, 255, 255, 0.08));
        color: var(--text-muted, #8b9cb3);
        background-color: rgba(0, 0, 0, 0.15);
        font-size: 0.85rem;
        line-height: 1.5;
      }

      :host([open]) .content {
        display: block;
      }
    `;

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-expanded", "false");

    const headingSlot = document.createElement("slot");
    headingSlot.name = "heading";
    button.appendChild(headingSlot);

    const content = document.createElement("div");
    content.className = "content";

    const contentSlot = document.createElement("slot");
    content.appendChild(contentSlot);

    button.addEventListener("click", () => {
      this.open = !this.open;

      this.dispatchEvent(
        new CustomEvent("accordion-item-toggle", {
          bubbles: true,
          detail: { item: this, open: this.open },
        })
      );
    });

    shadow.appendChild(style);
    shadow.appendChild(button);
    shadow.appendChild(content);

    this.button = button;
    this.updateExpandedState();
  }

  attributeChangedCallback() {
    this.updateExpandedState();
  }

  updateExpandedState() {
    if (this.button) {
      this.button.setAttribute("aria-expanded", String(this.open));
    }
  }
}

customElements.define("mi-accordion-item", MiAccordionItem);
customElements.define("mi-accordion", MiAccordion);
