const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const toggleIcon = document.getElementById('toggleIcon');

// Toggle sidebar function
const toggleSidebar = () => {
    sidebar.classList.toggle('closed');
    toggleIcon.textContent = sidebar.classList.contains('closed') ? '⏵' : '⏴';
    
    // Save state to localStorage
    localStorage.setItem('sidebarState', sidebar.classList.contains('closed'));
};

// Event listeners
toggleBtn.addEventListener('click', toggleSidebar);

// Handle mobile responsiveness
const handleResize = () => {
    if (window.innerWidth <= 768) {
        sidebar.classList.add('closed');
        toggleIcon.textContent = '⏵';
    } else {
        // Restore previous state on desktop
        const savedState = localStorage.getItem('sidebarState');
        if (savedState === 'false') {
            sidebar.classList.remove('closed');
            toggleIcon.textContent = '⏴';
        }
    }
};

// Initialize
window.addEventListener('resize', handleResize);
window.addEventListener('DOMContentLoaded', () => {
    const savedState = localStorage.getItem('sidebarState');
    if (savedState === 'true') {
        sidebar.classList.add('closed');
        toggleIcon.textContent = '⏵';
    }
    handleResize();
});