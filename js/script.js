document.addEventListener('DOMContentLoaded', function() {

    // Modal Logic
    const modal = document.getElementById('video-modal');
    const openBtn = document.getElementById('open-video-btn');
    const closeBtn = document.querySelector('.close-btn');
    const iframe = document.getElementById('youtube-iframe');

    // Use a placeholder video (Rick Roll is classic, but let's use something generic like a nature documentary or generic corporate promo)
    // Using a generic landscape video ID from YouTube.
    const videoId = 'dQw4w9WgXcQ'; // Replace with actual company video later. (Yes, it's Never Gonna Give You Up - standard placeholder :D)
    // Actually, let's use a safer generic corporate background video if possible, but for "placeholder" Rick Roll is a known variable.
    // Let's swap to a generic "Nature" one to be safer for "Institutional".
    // ID: lx7G7r08xV0 (Nature video)
    const videoUrl = 'https://www.youtube.com/embed/lx7G7r08xV0?autoplay=1';

    openBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        iframe.src = videoUrl; // Start video
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

    // Parallax smoothness fallback (optional, CSS usually handles it well)
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
