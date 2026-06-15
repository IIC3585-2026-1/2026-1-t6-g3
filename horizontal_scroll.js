class MyHorizontalScroll extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) return;
  
      const shadow = this.attachShadow({ mode: "open" });
  
      const template = document.getElementById("horizontal-scroll-template");
      shadow.appendChild(template.content.cloneNode(true));
  
      const scrollContainer = shadow.querySelector(".scroll-container");
  
      const leftSlot = shadow.querySelector('slot[name="left-button"]');
      const rightSlot = shadow.querySelector('slot[name="right-button"]');
  
      const getButton = (slot) => {
        const assigned = slot.assignedElements();
        return assigned[0] ?? slot.querySelector("button");
      };
  
      getButton(leftSlot).addEventListener("click", () => {
        scrollContainer.scrollBy({
          left: -250,
          behavior: "smooth"
        });
      });
  
      getButton(rightSlot).addEventListener("click", () => {
        scrollContainer.scrollBy({
          left: 250,
          behavior: "smooth"
        });
      });
    }
  }
  
  customElements.define("my-horizontal-scroll", MyHorizontalScroll);