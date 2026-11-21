/* ==========================================================================
   Apex University CMS - Landing Page (index.html) Interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
  console.log("Apex University Landing Page script loaded.");

  // Add a subtle fade-in animation effect on load
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = 0;
    heroContent.style.transition = 'opacity 0.8s ease-in-out';
    
    setTimeout(() => {
      heroContent.style.opacity = 1;
    }, 100);
  }

  // Track CTA button clicks for analytics simulation
  const ctaButtons = document.querySelectorAll('.hero-actions .btn');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      console.log(`User clicked CTA: ${this.textContent.trim()}`);
    });
  });
});