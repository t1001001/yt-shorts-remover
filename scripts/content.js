// this function removes the shorts from the sidebar
function removeFromSidebar() {
    // all sidebar elements
    const all_elements = document.querySelectorAll('a#endpoint.yt-simple-endpoint.style-scope.ytd-mini-guide-entry-renderer, a#endpoint.yt-simple-endpoint.style-scope.ytd-guide-entry-renderer');

    // filter for shorts
    const shorts_elements = [...all_elements].filter(el => {
        return el.innerText.trim() === 'Shorts' || el.href.includes('/shorts');
    });

    // remove shorts element from the sidebar
    shorts_elements.forEach(el => {
        // remove the parent entry element
        el.closest('ytd-mini-guide-entry-renderer')?.remove();
    });
}

// this function removes shorts from search results
function removeFromResults() {
    // get all search results
    const videos = document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer, ytd-reel-shelf-renderer');

    // go through all videos and removes every of them which is a short
    videos.forEach(item => {
        const link = item.querySelector('a#thumbnail');
        if (link && link.href.includes('/shorts/')) {
            item.remove();
        }
    });
}

// this function removes shorts from the homepage
function removeFromHomepage() {
    // get all shorts from the homepage
    const homepageShorts = document.querySelectorAll('ytd-rich-section-renderer')

    // remove shorts from the homepage
    homepageShorts.forEach(section => section.remove());
}

// this function runs the shorts the shorts remover
function runShortsRemover() {
    removeFromSidebar();
    removeFromResults();
    removeFromHomepage();

    // watch for dynamic site changes
    const observer = new MutationObserver(() => {
        // re-run when DOM changes
        removeFromSidebar();
        removeFromResults();
        removeFromHomepage();
    });

    // start observing the entire document for changes to child elements
    observer.observe(document.body, { childList: true, subtree: true });
}

// run the extension
runShortsRemover();