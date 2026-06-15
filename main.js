// Esta página no crea componentes nuevos: reutiliza my-card, my-slider,
// my-switch, my-horizontal-scroll y mi-accordion con datos de hogar inteligente.

const ROOMS = {
  sala: {
    name: "Sala",
    icon: "🛋️",
    summary: "2 dispositivos activos",
    temp: 22,
    lights: false,
    timer: 30,
  },
  cocina: {
    name: "Cocina",
    icon: "🍳",
    summary: "2 dispositivos",
    temp: 20,
    lights: true,
    timer: 15,
  },
  dormitorio: {
    name: "Dormitorio",
    icon: "🛏️",
    summary: "Luces apagadas",
    temp: 18,
    lights: false,
    timer: 60,
  },
  bano: {
    name: "Baño",
    icon: "🚿",
    summary: "Sin alertas",
    temp: 24,
    lights: true,
    timer: 10,
  },
  garaje: {
    name: "Garaje",
    icon: "🚗",
    summary: "Puerta cerrada",
    temp: 16,
    lights: false,
    timer: 5,
  },
  jardin: {
    name: "Jardín",
    icon: "🌿",
    summary: "Riego programado",
    temp: 26,
    lights: true,
    timer: 45,
  },
};

let currentRoom = "sala";
const roomState = structuredClone(ROOMS);

const slider = document.getElementById("thermostat");
const lightsSwitch = document.getElementById("lights-switch");
const timerField = document.getElementById("timer-field");
const statusText = document.getElementById("status-text");
const tempDisplay = document.getElementById("temp-display");
const pageTitle = document.getElementById("page-title");
const breadcrumb = document.getElementById("breadcrumb");
const breadcrumbRoom = document.getElementById("breadcrumb-room");
const roomNav = document.getElementById("room-nav");
const roomScroll = document.getElementById("room-scroll");

function saveCurrentRoom() {
  roomState[currentRoom] = {
    ...roomState[currentRoom],
    temp: Number(slider.getAttribute("value")),
    lights: lightsSwitch.hasAttribute("checked"),
    timer: Number(timerField.getAttribute("value")),
  };
}

function syncCurrentRoomState() {
  saveCurrentRoom();
}

function loadRoom(roomId) {
  const room = roomState[roomId];
  slider.value = room.temp;
  timerField.value = room.timer;

  if (room.lights) {
    lightsSwitch.setAttribute("checked", "");
  } else {
    lightsSwitch.removeAttribute("checked");
  }
}

function getDeviceStateClass(state) {
  if (state.temp >= 28 || state.temp <= 15) {
    return "is-alert";
  }
  return state.lights ? "is-on" : "is-off";
}

function applyDeviceState(card, state) {
  card.classList.remove("is-on", "is-off", "is-alert");
  card.classList.add(getDeviceStateClass(state));
}

function setActiveRoom(roomId) {
  document.querySelectorAll(".nav-card, .scroll-card, .device-card").forEach((el) => {
    if (el.dataset.room === roomId) {
      el.setAttribute("active", "");
    } else {
      el.removeAttribute("active");
    }
  });
}

function navigateToRoom(roomId) {
  if (!ROOMS[roomId] || roomId === currentRoom) {
    return;
  }

  saveCurrentRoom();
  currentRoom = roomId;
  loadRoom(roomId);

  const room = ROOMS[roomId];
  pageTitle.textContent = `Panel de control — ${room.name}`;
  breadcrumbRoom.textContent = room.name;

  setActiveRoom(roomId);
  updateStatus();
  breadcrumb.refresh();
}

function createNavCard(roomId, room) {
  const card = document.createElement("my-card");
  card.className = "nav-card";
  card.dataset.room = roomId;
  if (roomId === currentRoom) {
    card.setAttribute("active", "");
  }

  card.innerHTML = `
    <div class="nav-card-inner">
      <span class="nav-icon">${room.icon}</span>
      <span class="nav-label">${room.name}</span>
    </div>
  `;

  card.addEventListener("click", () => navigateToRoom(roomId));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateToRoom(roomId);
    }
  });
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");

  return card;
}

function createScrollCard(roomId, room) {
  const card = document.createElement("my-card");
  card.className = "device-card scroll-card";
  card.dataset.room = roomId;
  if (roomId === currentRoom) {
    card.setAttribute("active", "");
  }

  const state = roomState[roomId];
  applyDeviceState(card, state);
  const lightsLabel = state.lights ? "Luces encendidas" : "Luces apagadas";

  card.innerHTML = `
    <div class="device-card-inner room-card-inner">
      <span class="device-card-icon room-card-icon">${room.icon}</span>
      <span class="device-card-name room-card-name">${room.name}</span>
      <span class="device-card-status room-card-status">${state.temp}°C · ${lightsLabel}</span>
    </div>
  `;

  card.addEventListener("click", () => navigateToRoom(roomId));
  return card;
}

function buildNavigation() {
  Object.entries(ROOMS).forEach(([id, room]) => {
    roomNav.appendChild(createNavCard(id, room));
    roomScroll.appendChild(createScrollCard(id, room));
  });
}

function refreshScrollCards() {
  roomScroll.querySelectorAll(".scroll-card, .device-card").forEach((card) => {
    const roomId = card.dataset.room;
    const room = ROOMS[roomId];
    const state = roomState[roomId];
    const lightsLabel = state.lights ? "Luces encendidas" : "Luces apagadas";

    applyDeviceState(card, state);
    card.querySelector(".room-card-status, .device-card-status").textContent =
      `${state.temp}°C · ${lightsLabel}`;
  });
}

function updateStatus() {
  syncCurrentRoomState();
  const temp = slider.getAttribute("value") ?? "-";
  const lights = lightsSwitch.hasAttribute("checked") ? "encendidas" : "apagadas";
  const timer = timerField.getAttribute("value") ?? "-";
  const room = ROOMS[currentRoom];

  tempDisplay.innerHTML = `${temp}<span>°C</span>`;

  statusText.innerHTML = `
    <span class="status-chip">${room.icon} ${room.name}</span>
    <span class="status-chip">${temp}°C</span>
    <span class="status-chip">Luces: ${lights}</span>
    <span class="status-chip">Auto-off: ${timer} min</span>
  `;

  refreshScrollCards();
}

slider.addEventListener("input", updateStatus);
lightsSwitch.addEventListener("change", updateStatus);
timerField.addEventListener("input", updateStatus);

breadcrumb.addEventListener("breadcrumb-navigate", (e) => {
  if (e.detail.room) {
    navigateToRoom(e.detail.room);
  }
});

buildNavigation();
loadRoom(currentRoom);
updateStatus();
