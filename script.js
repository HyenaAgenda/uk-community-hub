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
    
    const allGroups = (typeof getAllCommunities === 'function') ? getAllCommunities() : [];
    const allEvents = (typeof getAllEvents === 'function') ? getAllEvents() : [];
    const allItems = [
        ...allGroups.map(g => ({ kind: 'group', ...g })),
        ...allEvents.map(e => ({ kind: 'event', ...e }))
    ];
    
    // Group by city
    const citiesByName = {};
    allItems.forEach(item => {
        if (!citiesByName[item.city]) {
            citiesByName[item.city] = [];
        }
        citiesByName[item.city].push(item);
    });
    
    // Sort cities alphabetically
    const sortedCities = Object.keys(citiesByName).sort();
    
    let html = '';
    sortedCities.forEach(cityName => {
        const items = citiesByName[cityName];
        const groups = items.filter(i => i.kind === 'group').sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        const events = items.filter(i => i.kind === 'event').sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        html += `
            <div style="margin-bottom: 0.75rem;">
                <strong style="color: #a855f7; display: block; margin-bottom: 0.5rem;">${cityName}</strong>
        `;
        
        groups.forEach(group => {
            html += `
                <a href="#" class="community-card" style="margin-bottom: 0.5rem;" onclick="focusItemOnMap('group', '${group.id}'); return false;">
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

        events.forEach(evt => {
            const sizeText = evt.EventSize ? `Event size: ${evt.EventSize}` : 'Event size: Unknown';
            const typeText = evt.type ? ` (${evt.type})` : '';
            html += `
                <a href="#" class="community-card" style="margin-bottom: 0.5rem;" onclick="focusItemOnMap('event', '${evt.id}'); return false;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <h4 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: #1f2937;">${evt.name}${typeText}</h4>
                            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #6b7280;">${sizeText}</p>
                        </div>
                        <i class="fas fa-chevron-right" style="color: #0ea5e9;"></i>
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
    
    const allGroups = (typeof getAllCommunities === 'function') ? getAllCommunities() : [];
    const allEvents = (typeof getAllEvents === 'function') ? getAllEvents() : [];
    const allItems = [
        ...allGroups.map(g => ({ kind: 'group', ...g })),
        ...allEvents.map(e => ({ kind: 'event', ...e }))
    ];

    const filtered = allItems.filter(item => {
        const name = (item.name || '').toLowerCase();
        const city = (item.city || '').toLowerCase();
        const county = (item.county || '').toLowerCase();
        const region = (item.region || '').toLowerCase();
        return (
            name.includes(searchTerm) ||
            city.includes(searchTerm) ||
            county.includes(searchTerm) ||
            region.includes(searchTerm)
        );
    });
    
    if (filtered.length === 0) {
        regionList.innerHTML = '<div style="text-align: center; padding: 2rem; color: #6b7280;">No communities found</div>';
        return;
    }
    
    let html = '';
    filtered.forEach(item => {
        if (item.kind === 'group') {
            html += `
                <a href="#" class="community-card" style="margin-bottom: 0.75rem; display: block;" onclick="focusItemOnMap('group', '${item.id}'); return false;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <h4 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: #1f2937;">${item.name}</h4>
                            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #6b7280;">${item.city}, ${item.county}</p>
                            <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem; color: #9ca3af;">Community size: ${item.communitySize}</p>
                        </div>
                        <i class="fas fa-chevron-right" style="color: #a855f7;"></i>
                    </div>
                </a>
            `;
        } else {
            const sizeText = item.EventSize ? `Event size: ${item.EventSize}` : 'Event size: Unknown';
            const typeText = item.type ? ` (${item.type})` : '';
            html += `
                <a href="#" class="community-card" style="margin-bottom: 0.75rem; display: block;" onclick="focusItemOnMap('event', '${item.id}'); return false;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <h4 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: #1f2937;">${item.name}${typeText}</h4>
                            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #6b7280;">${item.city}, ${item.county}</p>
                            <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem; color: #9ca3af;">${sizeText}</p>
                        </div>
                        <i class="fas fa-chevron-right" style="color: #0ea5e9;"></i>
                    </div>
                </a>
            `;
        }
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


