const GENRES = {
  scifi: {
    name: "Ciencia ficción",
    icon: "🚀",
    shows: {
      nebula: { title: "Nébula Perdida", poster: "🌌", rating: 8.7, episodes: 10 },
      orbita: { title: "Órbita 7", poster: "🛸", rating: 8.2, episodes: 8 },
      quantum: { title: "Quantum Drift", poster: "⚛️", rating: 9.1, episodes: 12 },
    },
  },
  drama: {
    name: "Drama",
    icon: "🎭",
    shows: {
      ciudad: { title: "La Ciudad Silenciosa", poster: "🏙️", rating: 8.5, episodes: 6 },
      raices: { title: "Raíces del Sur", poster: "🌿", rating: 8.0, episodes: 9 },
      eco: { title: "Eco Familiar", poster: "👨‍👩‍👧", rating: 7.8, episodes: 7 },
    },
  },
  comedia: {
    name: "Comedia",
    icon: "😂",
    shows: {
      vecinos: { title: "Vecinos Galácticos", poster: "👽", rating: 7.5, episodes: 14 },
      cafe: { title: "Café Express", poster: "☕", rating: 7.9, episodes: 11 },
      oficina: { title: "La Oficina 3000", poster: "🏢", rating: 8.3, episodes: 10 },
    },
  },
};

let currentGenre = "scifi";
let selectedShow = "nebula";
let season = 1;
let subtitlesOn = true;

const breadcrumb = document.getElementById("breadcrumb");
const breadcrumbGenre = document.getElementById("breadcrumb-genre");
const breadcrumbShow = document.getElementById("breadcrumb-show");
const pageTitle = document.getElementById("page-title");
const mediaScroll = document.getElementById("media-scroll");
const genreNav = document.getElementById("genre-nav");
const seasonSlider = document.getElementById("season-slider");
const subtitleSwitch = document.getElementById("subtitle-switch");
const seasonDisplay = document.getElementById("season-display");
const summaryText = document.getElementById("summary-text");

function getShow(genreId, showId) {
  return GENRES[genreId]?.shows[showId];
}

function renderShows() {
  mediaScroll.querySelectorAll(".media-card").forEach((card) => card.remove());

  const genre = GENRES[currentGenre];
  Object.entries(genre.shows).forEach(([id, show]) => {
    const card = document.createElement("my-card");
    card.className = "media-card";
    card.dataset.show = id;
    if (id === selectedShow) {
      card.setAttribute("active", "");
    }

    card.innerHTML = `
      <div class="media-card-inner">
        <span class="media-card-poster">${show.poster}</span>
        <span class="media-card-title">${show.title}</span>
        <span class="media-card-genre">★ ${show.rating} · ${show.episodes} eps.</span>
      </div>
    `;

    card.addEventListener("click", () => selectShow(id));
    mediaScroll.appendChild(card);
  });
}

function selectShow(showId) {
  selectedShow = showId;
  season = 1;
  seasonSlider.value = 1;

  mediaScroll.querySelectorAll(".media-card").forEach((card) => {
    if (card.dataset.show === showId) {
      card.setAttribute("active", "");
    } else {
      card.removeAttribute("active");
    }
  });

  updateSummary();
}

function setActiveGenreButton() {
  genreNav.querySelectorAll("button").forEach((btn) => {
    if (btn.dataset.genre === currentGenre) {
      btn.setAttribute("active", "");
    } else {
      btn.removeAttribute("active");
    }
  });
}

function buildGenreNav() {
  Object.entries(GENRES).forEach(([id, genre]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.genre = id;
    button.textContent = `${genre.icon} ${genre.name}`;
    button.addEventListener("click", () => navigateGenre(id));
    genreNav.appendChild(button);
  });
  setActiveGenreButton();
}

function navigateGenre(genreId) {
  if (!GENRES[genreId]) {
    return;
  }

  currentGenre = genreId;
  const genre = GENRES[genreId];
  selectedShow = Object.keys(genre.shows)[0];
  season = 1;
  seasonSlider.value = 1;

  pageTitle.textContent = `Biblioteca — ${genre.name}`;
  breadcrumbGenre.textContent = genre.name;

  renderShows();
  updateSummary();
  breadcrumb.refresh();
  setActiveGenreButton();
}

function updateSummary() {
  const genre = GENRES[currentGenre];
  const show = getShow(currentGenre, selectedShow);
  season = Number(seasonSlider.getAttribute("value")) || 1;
  subtitlesOn = subtitleSwitch.hasAttribute("checked");

  seasonDisplay.innerHTML = `T${season}`;

  if (!show) {
    return;
  }

  breadcrumbShow.textContent = show.title;

  summaryText.innerHTML = `
    Género: <strong>${genre.icon} ${genre.name}</strong><br>
    Título: <strong>${show.poster} ${show.title}</strong><br>
    Temporada: <strong>${season}</strong> de <strong>${show.episodes}</strong> episodios<br>
    Valoración: <strong>★ ${show.rating}</strong><br>
    Subtítulos: <strong>${subtitlesOn ? "Activados" : "Desactivados"}</strong>
  `;
}

seasonSlider.addEventListener("input", updateSummary);
subtitleSwitch.addEventListener("change", updateSummary);

breadcrumb.addEventListener("breadcrumb-navigate", (e) => {
  if (e.detail.room) {
    navigateGenre(e.detail.room);
  }
});

buildGenreNav();
renderShows();
updateSummary();
