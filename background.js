const API_KEY = "https://www.omdbapi.com/?i=tt3896198&apikey=b99605ff";  // 👉 Get one free from http://www.omdbapi.com/apikey.aspx

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_RATING") {
    const query = encodeURIComponent(message.title);

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${query}`)
      .then(res => res.json())
      .then(data => {
        if (data.Response === "True") {
          sendResponse({ rating: data.imdbRating });
        } else {
          sendResponse({ rating: "N/A" });
        }
      })
      .catch(() => sendResponse({ rating: "Error" }));

    return true; // Required to keep the message channel open
  }
});

