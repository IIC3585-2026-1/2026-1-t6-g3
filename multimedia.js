// Esta página reutiliza my-card, my-slider, my-switch y my-horizontal-scroll
// con datos y estilos de plataforma de streaming.

const GENRES = {
  scifi: {
    name: "Ciencia ficción",
    icon: "🚀",
    shows: {
      nebula: {
        title: "Nébula Perdida",
        poster: "🌌",
        rating: 8.7,
        episodes: 10,
        seasons: 3,
        tagline: "Una tripulación busca un planeta habitable en el borde del mapa estelar.",
        plot: "Una tripulación explora los confines del universo en busca de un planeta habitable.",
        cast: "Elena Voss, Marco Ruiz, Aisha Chen y guest stars de cada temporada.",
        fact: "Rodada con técnicas de cámara inmersiva y banda sonora original.",
      },
      orbita: {
        title: "Órbita 7",
        poster: "🛸",
        rating: 8.2,
        episodes: 8,
        seasons: 2,
        tagline: "Una estación minera pierde contacto con la Tierra durante una tormenta solar.",
        plot: "El equipo de Órbita 7 debe negociar recursos, secretos y lealtades cuando queda aislado.",
        cast: "Nora Vidal, Iker Salas y Paula Ren.",
        fact: "Cada episodio ocurre durante una hora distinta de la misma emergencia.",
      },
      quantum: {
        title: "Quantum Drift",
        poster: "⚛️",
        rating: 9.1,
        episodes: 12,
        seasons: 3,
        tagline: "Un experimento fragmenta la ciudad en líneas temporales simultáneas.",
        plot: "Tres versiones de la misma detective intentan resolver un crimen que todavía no ocurre.",
        cast: "Lina Park, Mateo Silva y Bruno Kade.",
        fact: "La paleta de color cambia según la línea temporal activa.",
      },
    },
  },
  drama: {
    name: "Drama",
    icon: "🎭",
    shows: {
      ciudad: {
        title: "La Ciudad Silenciosa",
        poster: "🏙️",
        rating: 8.5,
        episodes: 6,
        seasons: 1,
        tagline: "Un apagón obliga a un barrio completo a escucharse por primera vez.",
        plot: "Vecinos que casi no se conocen reconstruyen una noche decisiva desde versiones contradictorias.",
        cast: "Valeria Montes, Diego Araya y Sofía Klein.",
        fact: "Los interiores fueron filmados con luz natural para sostener el tono íntimo.",
      },
      raices: {
        title: "Raíces del Sur",
        poster: "🌿",
        rating: 8.0,
        episodes: 9,
        seasons: 2,
        tagline: "Una familia vuelve al campo para decidir qué hacer con su herencia.",
        plot: "Tres hermanos enfrentan deudas, recuerdos y un territorio que cambió sin esperarlos.",
        cast: "Camila Torres, Joaquín Vera y Antonia Reyes.",
        fact: "Incluye canciones tradicionales reinterpretadas por artistas locales.",
      },
      eco: {
        title: "Eco Familiar",
        poster: "👨‍👩‍👧",
        rating: 7.8,
        episodes: 7,
        seasons: 2,
        tagline: "Una grabación antigua reabre la historia de una casa dividida.",
        plot: "Cada episodio sigue a una generación distinta y revela cómo se repiten sus decisiones.",
        cast: "Marta León, Alex Soto y Emilia Fuentes.",
        fact: "El guion usa objetos heredados como hilo conductor entre décadas.",
      },
    },
  },
  comedia: {
    name: "Comedia",
    icon: "😂",
    shows: {
      vecinos: {
        title: "Vecinos Galácticos",
        poster: "👽",
        rating: 7.5,
        episodes: 14,
        seasons: 3,
        tagline: "Una comunidad humana intenta convivir con inquilinos de otra galaxia.",
        plot: "Las reuniones de condominio se vuelven diplomacia interplanetaria de bajo presupuesto.",
        cast: "Rafa Campos, Mei Duarte y Tomás Vega.",
        fact: "Los nombres alienígenas fueron creados a partir de errores de autocorrector.",
      },
      cafe: {
        title: "Café Express",
        poster: "☕",
        rating: 7.9,
        episodes: 11,
        seasons: 2,
        tagline: "Una cafetería diminuta funciona como central de rumores de toda la ciudad.",
        plot: "Baristas, clientes fijos y repartidores convierten pedidos simples en caos elegante.",
        cast: "Lucía Mena, Pedro Lagos y Ana Beltrán.",
        fact: "Cada capítulo recibe el nombre de una bebida inventada.",
      },
      oficina: {
        title: "La Oficina 3000",
        poster: "🏢",
        rating: 8.3,
        episodes: 10,
        seasons: 2,
        tagline: "El trabajo remoto del futuro sigue teniendo reuniones innecesarias.",
        plot: "Una empresa futurista automatiza todo excepto sus problemas más humanos.",
        cast: "Renata Paz, Hugo Naranjo y Celeste Mora.",
        fact: "Los fondos de videollamada esconden chistes visuales recurrentes.",
      },
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
const heroPoster = document.getElementById("hero-poster");
const heroCopy = document.getElementById("hero-copy");
const plotPanel = document.getElementById("plot-panel");
const castPanel = document.getElementById("cast-panel");
const factsPanel = document.getElementById("facts-panel");

function syncSeasonLimit(show) {
  const max = show?.seasons ?? 3;
  seasonSlider.setAttribute("max", max);
  const input = seasonSlider.shadowRoot?.querySelector('input[type="range"]');
  if (input) {
    input.max = max;
  }
  if (season > max) {
    season = max;
    seasonSlider.value = max;
  }
}

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
        <span class="media-poster media-card-poster">${show.poster}</span>
        <span class="media-card-title">${show.title}</span>
        <span class="media-meta media-card-genre">★ ${show.rating} · ${show.episodes} eps.</span>
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
  syncSeasonLimit(getShow(currentGenre, selectedShow));

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
  syncSeasonLimit(getShow(currentGenre, selectedShow));

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

  syncSeasonLimit(show);
  breadcrumbShow.textContent = show.title;
  heroPoster.textContent = show.poster;
  heroCopy.textContent = show.tagline;
  plotPanel.textContent = show.plot;
  castPanel.textContent = show.cast;
  factsPanel.textContent = show.fact;

  summaryText.innerHTML = `
    Género: <strong>${genre.icon} ${genre.name}</strong><br>
    Título: <strong>${show.poster} ${show.title}</strong><br>
    Temporada: <strong>${season}</strong> de <strong>${show.seasons}</strong><br>
    Episodios por temporada: <strong>${show.episodes}</strong><br>
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
