// Theme toggle functionality with localStorage persistence
        document.addEventListener('DOMContentLoaded', () => {
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.body;
            
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                body.classList.add('dark');
                themeToggle.checked = true;
            }
            
            // Theme toggle event listener
            themeToggle.addEventListener('change', () => {
                if (themeToggle.checked) {
                    body.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    body.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                }
            });
            
            // Sidebar active link functionality
            const sidebarLinks = document.querySelectorAll('.sidebar a');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', () => {
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                });
            });
            
            // Quick action cards functionality
            const actionCards = document.querySelectorAll('.action-card');
            actionCards.forEach(card => {
                card.addEventListener('click', () => {
                    const action = card.querySelector('h3').textContent;
                    // In a real app, this would navigate to the appropriate page
                    alert(`Navigating to ${action} section`);
                });
            });
            
            // View all transactions functionality
            const viewAllLink = document.querySelector('.view-all');
            viewAllLink.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Navigating to full transaction history page');
            });
        });