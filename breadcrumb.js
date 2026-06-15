class Breadcrumb extends HTMLElement {
  constructor() {
    super();
    this.nav = null;
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.refresh();
      return;
    }

    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      nav {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.35rem;
        font-size: 0.85rem;
      }

      a, span {
        color: var(--text-muted, #8b9cb3);
        text-decoration: none;
        transition: color 0.15s;
      }

      a:hover {
        color: var(--accent, #3b9eff);
      }

      .current {
        color: var(--accent, #3b9eff);
        font-weight: 600;
      }

      .separator {
        color: var(--text-muted, #8b9cb3);
        user-select: none;
        opacity: 0.5;
      }
    `;

    this.nav = document.createElement("nav");
    this.nav.setAttribute("aria-label", "Ruta de navegación");

    shadow.appendChild(style);
    shadow.appendChild(this.nav);

    this.refresh();
  }

  refresh() {
    if (!this.nav) {
      return;
    }

    this.nav.textContent = "";
    const items = [...this.querySelectorAll("mi-breadcrumb-item")];

    items.forEach((item, index) => {
      if (index > 0) {
        const sep = document.createElement("span");
        sep.className = "separator";
        sep.textContent = "›";
        sep.setAttribute("aria-hidden", "true");
        this.nav.appendChild(sep);
      }

      const isLast = index === items.length - 1;
      const label = item.textContent.trim();
      const room = item.dataset.room;

      if (isLast) {
        const current = document.createElement("span");
        current.className = "current";
        current.textContent = label;
        this.nav.appendChild(current);
      } else {
        const link = document.createElement("a");
        link.href = item.getAttribute("href") || "#";
        link.textContent = label;
        link.addEventListener("click", (e) => {
          if (room) {
            e.preventDefault();
            this.dispatchEvent(
              new CustomEvent("breadcrumb-navigate", {
                bubbles: true,
                detail: { room },
              })
            );
          }
        });
        this.nav.appendChild(link);
      }
    });
  }
}

class BreadcrumbItem extends HTMLElement {
  constructor() {
    super();
  }

  get href() {
    return this.getAttribute("href");
  }

  get value() {
    if (this.href) {
      return this.textContent.trim() + " >";
    }
    return this.textContent.trim();
  }
}

customElements.define("mi-breadcrumb-item", BreadcrumbItem);
customElements.define("mi-breadcrumb", Breadcrumb);
