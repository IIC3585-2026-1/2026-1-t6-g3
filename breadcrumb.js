class Breadcrumb extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot) {
            return;
        }

        const shadow = this.attachShadow({ mode: "open" });
        const paragraph = document.createElement("p");

        const breadcrumbItems = this.querySelectorAll("mi-breadcrumb-item");

        let paragraphContent = "";

        breadcrumbItems.forEach((item) => {
            paragraphContent += item.value + " ";
        });

        paragraph.textContent = paragraphContent.trim();
        shadow.appendChild(paragraph);

        const style = document.createElement("style");
        style.textContent = `
        p {
            font-size: 1rem;
            font-weight: bold;
            color: #333;
            text-align: center;
        }
        `;

        shadow.appendChild(style);
    }
}

class BreadcrumbItem extends HTMLElement {
    constructor() {
        super();
    }

    get href() {
        return this.getAttribute('href');
    }

    get value() {
        if (this.href) {
            return this.textContent.trim() + " >";
        } else {
            return this.textContent.trim();
        }
    }
}

customElements.define("mi-breadcrumb-item", BreadcrumbItem);
customElements.define("mi-breadcrumb", Breadcrumb);
