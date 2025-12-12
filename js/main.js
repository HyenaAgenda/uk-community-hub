// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn && !mobileMenuBtn.dataset.mobileMenuBound) {
        mobileMenuBtn.dataset.mobileMenuBound = '1';
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

            window.ukfMap = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Function to add per-group + per-event markers using MarkerCluster
            function addMarkers() {
                try {
                    const markerIndex = new Map();
                    window.ukfMarkerIndex = markerIndex;

                    // create cluster group
                    const clusterGroup = L.markerClusterGroup ? L.markerClusterGroup() : null;
                    window.ukfClusterGroup = clusterGroup;

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

                    function addMarkerToLayer(marker) {
                        if (clusterGroup) {
                            clusterGroup.addLayer(marker);
                        } else {
                            marker.addTo(map);
                        }
                    }

                    // Groups
                    if (typeof getAllCommunities === 'function') {
                        const allGroups = getAllCommunities();

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
                            markerIndex.set(`group:${group.id}`,
                                marker
                            );

                            const popupHtml = `
                                <div style="min-width:150px">
                                    <strong>${escapeHtml(group.name)}</strong><br/>
                                    <small>${escapeHtml(group.city || '')}${group.county ? ', ' + escapeHtml(group.county) : ''}</small>
                                    <div style="margin-top:8px"><a href="group.html?id=${encodeURIComponent(group.id)}">View profile</a></div>
                                </div>`;

                            marker.bindPopup(popupHtml);

                            addMarkerToLayer(marker);
                        });
                    }

                    // Events
                    if (typeof getAllEvents === 'function') {
                        const allEvents = getAllEvents();

                        const eventTypeColors = {
                            convention: '#0ea5e9',
                            meetup: '#22c55e',
                            conference: '#f97316',
                            event: '#a855f7',
                            party: '#a855f7',
                            rave: '#a855f7',
                            nightclub: '#ec4899',
                            default: '#64748b'
                        };

                        allEvents.forEach(evt => {
                            let lat = parseFloat(evt.lat);
                            let lon = parseFloat(evt.lon);

                            if (isNaN(lat) || isNaN(lon)) {
                                const rc = regionCoords[evt.region] || defaultCenter;
                                lat = rc[0];
                                lon = rc[1];
                            }

                            const typeKey = (evt.type || '').toString().toLowerCase().trim();
                            const color = eventTypeColors[typeKey] || eventTypeColors.default;

                            const markerIcon = L.divIcon({
                                html: `<div style="background-color: ${color}; width: 22px; height: 22px; border-radius: 6px; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                                iconSize: [22, 22],
                                className: 'custom-marker'
                            });

                            const marker = L.marker([lat, lon], { icon: markerIcon });
                            allMarkers.push([lat, lon]);
                            markerIndex.set(`event:${evt.id}`, marker);

                            const popupHtml = `
                                <div style="min-width:150px">
                                    <strong>${escapeHtml(evt.name)}</strong><br/>
                                    <small>${escapeHtml(evt.city || '')}${evt.county ? ', ' + escapeHtml(evt.county) : ''}</small>
                                    <div style="margin-top:8px"><a href="event.html?id=${encodeURIComponent(evt.id)}">View details</a></div>
                                </div>`;
                            marker.bindPopup(popupHtml);

                            addMarkerToLayer(marker);
                        });
                    }

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
                addMarkers();
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
                    setTimeout(addMarkers, 50);
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

// Focus a marker on the home page map and open its popup.
// kind: 'group' | 'event'
function focusItemOnMap(kind, id) {
    try {
        const map = window.ukfMap;
        const markerIndex = window.ukfMarkerIndex;
        if (!map || !markerIndex) return;

        const marker = markerIndex.get(`${kind}:${id}`);
        if (!marker) return;

        const clusterGroup = window.ukfClusterGroup;
        const open = () => {
            map.setView(marker.getLatLng(), Math.max(map.getZoom(), 10));
            marker.openPopup();
        };

        if (clusterGroup && typeof clusterGroup.zoomToShowLayer === 'function') {
            clusterGroup.zoomToShowLayer(marker, open);
        } else {
            open();
        }
    } catch (err) {
        console.error('Error focusing marker:', err);
    }
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

// Function to get all groups in a city
function getGroupsByCity(regionId, cityKey) {
    const city = ukCommunities[regionId]?.counties[cityKey];
    if (!city) return [];
    return city.groups;
}
