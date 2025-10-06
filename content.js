// Replace with your OMDb API key
const OMDB_API_KEY = "3f8092b3";

/**
 * Fetch IMDb rating from OMDb API
 * @param {string} title - Movie or series title
 * @returns {string} IMDb rating or "Not available"
 */
async function fetchRating(title) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`
    );
    const data = await res.json();

    console.log("OMDb response for", title, ":", data);

    return data && data.imdbRating && data.imdbRating !== "N/A"
      ? data.imdbRating
      : "Not available";
  } catch (e) {
    console.error("Error fetching IMDb rating for", title, e);
    return "Not available";
  }
}

/**
 * Inject IMDb ratings into Netflix cards
 */
async function injectRatings() {
  const cards = document.querySelectorAll('a[aria-label]');

  cards.forEach(async (card) => {
    // Skip if rating already injected
    if (card.querySelector(".imdb-rating")) return;

    const title = card.getAttribute("aria-label")?.trim();
    if (!title) return;

    const rating = await fetchRating(title);
	// Create badge
		const span = document.createElement("span");
span.className = "imdb-rating";
span.textContent = rating !== "Not available" ? `★ ${rating}` : "★ N/A";

span.style.cssText = `
  position: absolute;
  top: 4px;
  right: 4px;
  color: #ffcc00;       /* IMDb yellow star */
  font-size: 12px;
  font-weight: bold;
  text-shadow: 0 0 2px #000; /* small shadow for readability */
  pointer-events: none;
  background: transparent; /* no rectangle */
`;

// Find the thumbnail container
const imgContainer = card.querySelector('img')?.parentElement || card;
imgContainer.style.position = 'relative';
imgContainer.appendChild(span);


  });
}

// Observe Netflix page for dynamic content
const observer = new MutationObserver(() => {
  injectRatings(); // inject whenever new cards appear
});

observer.observe(document.body, { childList: true, subtree: true });

// Initial injection in case some cards are already loaded
injectRatings();

