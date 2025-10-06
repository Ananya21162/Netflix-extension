#Overview:#
This Chrome extension enhances the Netflix browsing experience by displaying IMDb ratings directly on movie and show thumbnails. When a user visits Netflix, the extension scans the page for visible titles, queries the OMDb API to fetch IMDb ratings, and overlays them elegantly on the corresponding posters.

#Key Features:#

🔍 Automatic Detection: Dynamically detects Netflix titles by parsing aria-label or alt attributes from Netflix thumbnails.

⭐ IMDb Integration: Fetches ratings using the OMDb API (https://www.omdbapi.com/) based on title names.

⚡ Real-Time Updates: Uses a MutationObserver to track Netflix’s infinite-scroll interface and display ratings as new titles load.

💾 Caching: Stores fetched ratings in local memory to minimize redundant API requests and stay within OMDb’s daily limit.

🎨 UI Overlay: Adds a small, non-intrusive rating badge in the corner of each thumbnail (⭐ 7.8).

🧠 Error Handling: Gracefully handles titles not found on IMDb or network/API issues.
### Adding extension to Chrome ###
1. Open Chrome and navigate to : chrome://extensions/
2. Enable "Developer mode": using the toggle in the top right corner.
3. Click "Load unpacked": and select the folder containing the extension's code.
Extension will now be available to use
