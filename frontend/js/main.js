/* ==========================================================================
   Apex University CMS - Shared Main JavaScript Utility
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
  console.log("Apex University CMS initialized successfully.");

  // Highlight active navigation links based on current URL path
  const currentPath = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-links a, .sidebar-menu a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // Global delete confirmation handlers for existing table rows
  const deleteButtons = document.querySelectorAll('.btn-danger');
  deleteButtons.forEach(button => {
    // Only bind if it doesn't already have an inline onclick event
    if (!button.hasAttribute('onclick')) {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        if (row && confirm('Are you sure you want to remove this record?')) {
          row.remove();
        }
      });
    }
  });
});

/**
 * Utility function to format currency inputs
 * @param {number} amount 
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
  return '$' + parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

/**
 * Global notification toast simulator
 * @param {string} message 
 * @param {string} type - 'success', 'danger', 'warning'
 */
function showNotification(message, type = 'success') {
  alert(`[Apex CMS - ${type.toUpperCase()}] ${message}`);
}