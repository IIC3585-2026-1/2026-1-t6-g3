const brightnessSlider = document.getElementById("brightness-slider");
const sessionField = document.getElementById("session-field");
const emailSwitch = document.getElementById("email-switch");
const pushSwitch = document.getElementById("push-switch");
const darkSwitch = document.getElementById("dark-switch");
const analyticsSwitch = document.getElementById("analytics-switch");
const brightnessDisplay = document.getElementById("brightness-display");
const summaryText = document.getElementById("summary-text");

function updateSummary() {
  const brightness = brightnessSlider.getAttribute("value") ?? "-";
  const session = sessionField.getAttribute("value") ?? "-";
  const email = emailSwitch.hasAttribute("checked") ? "activadas" : "desactivadas";
  const push = pushSwitch.hasAttribute("checked") ? "activadas" : "desactivadas";
  const dark = darkSwitch.hasAttribute("checked") ? "oscuro" : "claro";
  const analytics = analyticsSwitch.hasAttribute("checked") ? "permitido" : "bloqueado";

  brightnessDisplay.innerHTML = `${brightness}<span>%</span>`;

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
