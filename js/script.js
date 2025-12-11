document.addEventListener('DOMContentLoaded', function() {

    // Modal Logic
    const modal = document.getElementById('video-modal');
    const openBtn = document.getElementById('open-video-btn');
    const closeBtn = document.querySelector('.close-btn');
    // In the new HTML, the iframe does not have an ID 'youtube-iframe', so we select it by tag within the container
    const iframe = document.querySelector('.video-container iframe');

    // The video URL is now hardcoded in the HTML as:
    // src="https://www.youtube.com/embed/ux0_AzgfBXs?si=oH_5QVh9emByLT3i"

    // When the modal is closed, we want to stop the video.
    // The standard way is to clear the src.
    // When opened, we restore the src.

    // We capture the initial src from the HTML so we know what to restore it to.
    const originalSrc = iframe.getAttribute('src');

    // If the original src doesn't have autoplay, we might want to add it so it plays when the modal opens.
    // However, the user provided a specific URL with 'si' params. Let's just append autoplay=1 if it's not there.
    let playSrc = originalSrc;
    if (playSrc.indexOf('?') === -1) {
        playSrc += '?autoplay=1';
    } else {
        playSrc += '&autoplay=1';
    }

    // Initially clear the src so it doesn't play in the background on load (if autoplay was set)
    // or just to be safe. But the user put it in the HTML, so it loads on page load.
    // To prevent it from playing (if it had autoplay) or consuming resources, we can clear it on load and set it only on click.
    iframe.src = "";

    openBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        iframe.src = playSrc; // Start video with autoplay
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        iframe.src = ''; // Stop video
    });

    // Close on click outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            iframe.src = ''; // Stop video
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});
