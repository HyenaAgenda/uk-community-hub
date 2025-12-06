// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-menu');
            navLinks.classList.toggle('active');
            
            // Toggle burger animation
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = spans[0].style.transform === 'rotate(-45deg) translate(-8px, 6px)' 
                ? 'none' 
                : 'rotate(-45deg) translate(-8px, 6px)';
            spans[1].style.opacity = spans[1].style.opacity === '0' ? '1' : '0';
            spans[2].style.transform = spans[2].style.transform === 'rotate(45deg) translate(-8px, -6px)' 
                ? 'none' 
                : 'rotate(45deg) translate(-8px, -6px)';
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinksInMenu = document.querySelectorAll('.nav-links a, .nav-link');
    navLinksInMenu.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navLinks.classList.remove('mobile-menu');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Initialize community list
    initializeRegionList();
    
    // Set up search listener
    const searchInput = document.getElementById('region-search');
    if (searchInput) {
        searchInput.addEventListener('input', searchRegions);
    }
});

// Initialize the region list
function initializeRegionList() {
    const regionList = document.getElementById('region-list');
    if (!regionList) return;
    
    const allCommunities = getAllCommunities();
    
    // Group by city
    const citiesByName = {};
    allCommunities.forEach(group => {
        if (!citiesByName[group.city]) {
            citiesByName[group.city] = [];
        }
        citiesByName[group.city].push(group);
    });
    
    // Sort cities alphabetically
    const sortedCities = Object.keys(citiesByName).sort();
    
    let html = '';
    sortedCities.forEach(cityName => {
        const groups = citiesByName[cityName];
        html += `
            <div style="margin-bottom: 0.75rem;">
                <strong style="color: #a855f7; display: block; margin-bottom: 0.5rem;">${cityName}</strong>
        `;
        
        groups.forEach(group => {
            html += `
                <a href="/group?id=${group.id}" class="community-card" style="margin-bottom: 0.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <h4 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: #1f2937;">${group.name}</h4>
                            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #6b7280;">Community size: ${group.communitySize}</p>
                        </div>
                        <i class="fas fa-chevron-right" style="color: #a855f7;"></i>
                    </div>
                </a>
            `;
        });
        
        html += '</div>';
    });
    
    regionList.innerHTML = html;
}

// Search regions
function searchRegions() {
    const searchTerm = document.getElementById('region-search').value.toLowerCase();
    const regionList = document.getElementById('region-list');
    
    if (!searchTerm) {
        initializeRegionList();
        return;
    }
    
    const allCommunities = getAllCommunities();
    const filtered = allCommunities.filter(community =>
        community.name.toLowerCase().includes(searchTerm) ||
        community.city.toLowerCase().includes(searchTerm) ||
        community.county.toLowerCase().includes(searchTerm)
    );
    
    if (filtered.length === 0) {
        regionList.innerHTML = '<div style="text-align: center; padding: 2rem; color: #6b7280;">No communities found</div>';
        return;
    }
    
    let html = '';
    filtered.forEach(group => {
        html += `
            <a href="/group?id=${group.id}" class="community-card" style="margin-bottom: 0.75rem; display: block;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h4 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: #1f2937;">${group.name}</h4>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #6b7280;">${group.city}, ${group.county}</p>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem; color: #9ca3af;">Community size: ${group.communitySize}</p>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #a855f7;"></i>
                </div>
            </a>
        `;
    });
    
    regionList.innerHTML = html;
}

// Utility function to get URL parameters
function getUrlParameter(name) {
    const url = window.location.href;
    const regex = new RegExp('[?&]' + name + '=([^&#]*)');
    const result = regex.exec(url);
    return result === null ? '' : decodeURIComponent(result[1].replace(/\+/g, ' '));
}

// Function to find a group by ID
function findGroupById(groupId) {
    const allCommunities = getAllCommunities();
    return allCommunities.find(group => group.id === groupId);
}


