// Esta página reutiliza my-slider, my-switch y mi-accordion
// con datos de panel de preferencias.

const brightnessSlider = document.getElementById("brightness-slider");
const sessionField = document.getElementById("session-field");
const emailSwitch = document.getElementById("email-switch");
const pushSwitch = document.getElementById("push-switch");
const darkSwitch = document.getElementById("dark-switch");
const analyticsSwitch = document.getElementById("analytics-switch");
const brightnessDisplay = document.getElementById("brightness-display");
const summaryText = document.getElementById("summary-text");
const previewCard = document.getElementById("preview-card");
const previewScreen = document.getElementById("preview-screen");
const previewTitle = document.getElementById("preview-title");
const previewCopy = document.getElementById("preview-copy");
const previewEmail = document.getElementById("preview-email");
const previewPush = document.getElementById("preview-push");
const previewAnalytics = document.getElementById("preview-analytics");

function setChipState(element, active) {
  element.classList.toggle("is-active", active);
}

function updateSummary() {
  const brightness = brightnessSlider.getAttribute("value") ?? "-";
  const session = sessionField.getAttribute("value") ?? "-";
  const emailActive = emailSwitch.hasAttribute("checked");
  const pushActive = pushSwitch.hasAttribute("checked");
  const darkActive = darkSwitch.hasAttribute("checked");
  const analyticsActive = analyticsSwitch.hasAttribute("checked");
  const email = emailActive ? "activadas" : "desactivadas";
  const push = pushActive ? "activadas" : "desactivadas";
  const dark = darkActive ? "oscuro" : "claro";
  const analytics = analyticsActive ? "permitido" : "bloqueado";

  brightnessDisplay.innerHTML = `${brightness}<span>%</span>`;
  document.body.classList.toggle("settings-light-mode", !darkActive);
  previewCard.toggleAttribute("active", darkActive);
  previewScreen.style.filter = `brightness(${Number(brightness) / 70})`;
  previewTitle.textContent = darkActive ? "Modo oscuro activo" : "Modo claro activo";
  previewCopy.textContent =
    `Email ${email}, push ${push}, sesion de ${session} minutos y analiticas ${analytics}.`;
  setChipState(previewEmail, emailActive);
  setChipState(previewPush, pushActive);
  setChipState(previewAnalytics, analyticsActive);

  summaryText.innerHTML = `
    Brillo: <strong>${brightness}%</strong><br>
    Tema: <strong>${dark}</strong><br>
    Sesión automática: <strong>${session} min</strong><br>
    Email: <strong>${email}</strong><br>
    Push: <strong>${push}</strong><br>
    Analíticas: <strong>${analytics}</strong>
  `;
}

brightnessSlider.addEventListener("input", updateSummary);
sessionField.addEventListener("input", updateSummary);
emailSwitch.addEventListener("change", updateSummary);
pushSwitch.addEventListener("change", updateSummary);
darkSwitch.addEventListener("change", updateSummary);
analyticsSwitch.addEventListener("change", updateSummary);

updateSummary();
