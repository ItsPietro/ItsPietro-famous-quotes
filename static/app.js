/* ============================================================
   Famous Quotes — Vanilla JavaScript
   ============================================================ */

// ── DOM References ──────────────────────────────────────────
const quoteText       = document.getElementById("quote-text");
const quoteAuthor     = document.getElementById("quote-author");
const quoteCategory   = document.getElementById("quote-category");
const quoteCard       = document.getElementById("quote-card");
const btnRandom       = document.getElementById("btn-random");
const btnDarkMode     = document.getElementById("btn-dark-mode");
const inputAuthor     = document.getElementById("input-author");
const selectCategory  = document.getElementById("select-category");
const btnSearch       = document.getElementById("btn-search");
const btnClear        = document.getElementById("btn-clear");
const quotesGrid      = document.getElementById("quotes-grid");
const resultsCount    = document.getElementById("results-count");
const noResults       = document.getElementById("no-results");

// ── Dark mode ───────────────────────────────────────────────
function initDarkMode() {
  const saved = localStorage.getItem("darkMode");
  if (saved === "true") {
    document.body.classList.add("dark");
    btnDarkMode.textContent = "☀️";
  }
}

btnDarkMode.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  btnDarkMode.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("darkMode", isDark);
});

// ── Random Quote ─────────────────────────────────────────────
async function loadRandomQuote() {
  quoteCard.classList.add("loading");
  try {
    const res = await fetch("/api/random");
    if (!res.ok) throw new Error("Failed to fetch");
    const quote = await res.json();
    renderHeroQuote(quote);
  } catch (err) {
    quoteText.textContent = "Could not load a quote. Is the server running?";
    quoteAuthor.textContent = "";
    quoteCategory.textContent = "";
  } finally {
    quoteCard.classList.remove("loading");
  }
}

function renderHeroQuote(quote) {
  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `— ${quote.author}`;
  quoteCategory.textContent = quote.category;
  quoteCategory.className = `badge badge-${quote.category}`;
}

// ── Categories Dropdown ──────────────────────────────────────
async function loadCategories() {
  try {
    const res = await fetch("/api/categories");
    const cats = await res.json();
    cats.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      selectCategory.appendChild(opt);
    });
  } catch (err) {
    console.error("Could not load categories:", err);
  }
}

// ── Search / Filter ──────────────────────────────────────────
async function searchQuotes() {
  const author   = inputAuthor.value.trim();
  const category = selectCategory.value;

  const params = new URLSearchParams();
  if (author)   params.set("author", author);
  if (category) params.set("category", category);

  try {
    const res = await fetch(`/api/quotes?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch");
    const quotes = await res.json();
    renderResultsGrid(quotes);
  } catch (err) {
    resultsCount.textContent = "Error loading quotes.";
    quotesGrid.innerHTML = "";
    noResults.classList.add("hidden");
  }
}

function renderResultsGrid(quotes) {
  quotesGrid.innerHTML = "";

  if (quotes.length === 0) {
    resultsCount.textContent = "";
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");
  resultsCount.textContent = `${quotes.length} quote${quotes.length !== 1 ? "s" : ""} found`;

  quotes.forEach((quote, index) => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.style.animationDelay = `${index * 30}ms`;
    card.innerHTML = `
      <p class="card-text">&ldquo;${escapeHtml(quote.text)}&rdquo;</p>
      <div class="card-footer">
        <span class="card-author">— ${escapeHtml(quote.author)}</span>
        <span class="badge badge-${escapeHtml(quote.category)}">${escapeHtml(quote.category)}</span>
      </div>
    `;
    // Clicking a result card loads it as the hero quote
    card.addEventListener("click", () => renderHeroQuote(quote));
    quotesGrid.appendChild(card);
  });
}

function clearSearch() {
  inputAuthor.value = "";
  selectCategory.value = "";
  quotesGrid.innerHTML = "";
  resultsCount.textContent = "";
  noResults.classList.add("hidden");
}

// ── Utility ──────────────────────────────────────────────────
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Debounce helper for live author search
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ── Event Listeners ──────────────────────────────────────────
btnRandom.addEventListener("click", loadRandomQuote);
btnSearch.addEventListener("click", searchQuotes);
btnClear.addEventListener("click", clearSearch);

// Search on Enter key inside author input
inputAuthor.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchQuotes();
});

// Live search while typing (debounced 400ms)
inputAuthor.addEventListener("input", debounce(searchQuotes, 400));

// Immediately search when category changes
selectCategory.addEventListener("change", searchQuotes);

// ── Initialise ───────────────────────────────────────────────
initDarkMode();
loadRandomQuote();
loadCategories();
