const slider = document.querySelector("my-slider");
const lightsSwitch = document.querySelector("my-switch");
const timerField = document.querySelector("numeric-field");
const statusText = document.getElementById("status-text");

function updateStatus() {
  const temp = slider?.getAttribute("value") ?? "-";
  const lights = lightsSwitch?.hasAttribute("checked") ? "encendidas" : "apagadas";
  const timer = timerField?.getAttribute("value") ?? "-";

  statusText.textContent =
    `Temperatura: ${temp}\u00b0C \u00b7 Luces: ${lights} \u00b7 Apagado en: ${timer} min`;
}

slider?.addEventListener("input", updateStatus);
lightsSwitch?.addEventListener("change", updateStatus);
timerField?.addEventListener("input", updateStatus);

updateStatus();
