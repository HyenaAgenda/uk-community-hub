// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            // styles.css uses .mobile-menu.active to show the menu
            menu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Small utility to escape HTML used in popups
function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str).replace(/[&<>"']/g, function(s) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[s];
    });
}

// Leaflet map initialization for index page
document.addEventListener('DOMContentLoaded', function() {
    // only run if map container exists
    if (!document.getElementById('map')) return;

    // Minimal coords for region centers (approximate)
    const regionCoords = {
        'Wales': [52.1307, -3.7837],
        'Midlands': [52.5869, -2.1280], // near Wolverhampton
        'North England': [53.4808, -2.2426], // Manchester
        'South England': [51.5074, -0.1278], // London
        'East England': [52.2053, 0.1218], // Cambridge
        'Scotland': [56.4907, -4.2026]
    };

    // dynamically load Leaflet if not present
    function initLeaflet() {
        try {
            const L = window.L;
            const map = L.map('map').setView(regionCoords['South England'], 6);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Function to add per-group markers using MarkerCluster
            function addGroupMarkers() {
                try {
                    // Ensure getAllCommunities exists
                    if (typeof getAllCommunities !== 'function') return;

                    const allGroups = getAllCommunities();

                    // create cluster group
                    const clusterGroup = L.markerClusterGroup ? L.markerClusterGroup() : null;

                    // fallback coords if group missing lat/lon
                    const defaultCenter = [54.0, -2.0];

                    // Color mapping for regions (keys are normalized to lowercase)
                    const regionColors = {
                        'wales': '#7c3aed',
                        'midlands': '#a855f7',
                        'west midlands': '#a855f7',
                        'east midlands': '#8b5cf6',
                        'north england': '#10b981',
                        'south england': '#ef4444',
                        'east england': '#2563eb',
                        'scotland': '#f59e0b'
                    };

                    const allMarkers = [];

                    allGroups.forEach(group => {
                        let lat = parseFloat(group.lat);
                        let lon = parseFloat(group.lon);

                        if (isNaN(lat) || isNaN(lon)) {
                            // try to use region center
                            const rc = regionCoords[group.region] || defaultCenter;
                            lat = rc[0];
                            lon = rc[1];
                        }

                        // Create a colored marker icon based on region (normalize region names)
                        const regionKey = (group.region || '').toString().toLowerCase();
                        const regionColor = regionColors[regionKey] || regionColors[group.region] || '#6b7280';
                        const markerIcon = L.divIcon({
                            html: `<div style="background-color: ${regionColor}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                            iconSize: [24, 24],
                            className: 'custom-marker'
                        });

                        const marker = L.marker([lat, lon], { icon: markerIcon });
                        allMarkers.push([lat, lon]);

                        const popupHtml = `
                            <div style="min-width:150px">
                                <strong>${escapeHtml(group.name)}</strong><br/>
                                <small>${escapeHtml(group.city || '')}${group.county ? ', ' + escapeHtml(group.county) : ''}</small>
                                <div style="margin-top:8px"><a href="group.html?id=${encodeURIComponent(group.id)}">View profile</a></div>
                            </div>`;

                        marker.bindPopup(popupHtml);

                        if (clusterGroup) {
                            clusterGroup.addLayer(marker);
                        } else {
                            marker.addTo(map);
                        }
                    });

                    if (clusterGroup) map.addLayer(clusterGroup);

                    // Auto-fit map to show all markers
                    if (allMarkers.length > 0) {
                        const group = new L.featureGroup(allMarkers.map(coords => L.marker(coords)));
                        map.fitBounds(group.getBounds(), { padding: [50, 50] });
                    }
                } catch (err) {
                    console.error('Error adding group markers:', err);
                }
            }

            // Load markercluster if necessary, then add markers
            if (window.L && window.L.markerClusterGroup) {
                addGroupMarkers();
            } else {
                // dynamically load markercluster CSS and JS
                const mcCss = document.createElement('link');
                mcCss.rel = 'stylesheet';
                mcCss.href = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css';
                document.head.appendChild(mcCss);

                const mcCss2 = document.createElement('link');
                mcCss2.rel = 'stylesheet';
                mcCss2.href = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css';
                document.head.appendChild(mcCss2);

                const mcScript = document.createElement('script');
                mcScript.src = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster-src.js';
                mcScript.onload = function() {
                    // small delay to ensure plugin attaches
                    setTimeout(addGroupMarkers, 50);
                };
                document.body.appendChild(mcScript);
            }
        } catch (err) {
            console.error('Leaflet init failed:', err);
        }
    }

    // If Leaflet not loaded, add CDN scripts then init
    if (!window.L) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = initLeaflet;
        document.body.appendChild(script);
    } else {
        initLeaflet();
    }
});

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

// Function to get all groups in a city
function getGroupsByCity(regionId, cityKey) {
    const city = ukCommunities[regionId]?.counties[cityKey];
    if (!city) return [];
    return city.groups;
}
