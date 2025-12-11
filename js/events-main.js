// --- MAIN.JS: MOBILE MENU, SMOOTH SCROLL, LEAFLET MAPS (INDEX + EVENTS) ---

document.addEventListener('DOMContentLoaded', function() {
    // --- MOBILE MENU TOGGLE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.toggle('active');
        });
    }

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.remove('active');
        });
    });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
            }
        });
    });

    // --- INITIALIZE MAP IF PRESENT ---
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    loadLeaflet(() => {
        if (window.location.pathname.includes('events.html')) {
            initEventsMap();
        } else {
            initIndexMap();
        }
    });
});

// --- ESCAPE HTML UTILITY ---
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

// --- LOAD LEAFLET + MARKERCLUSTER ONCE ---
function loadLeaflet(callback) {
    const leafCssHref = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    const leafJsSrc = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    const mcCssHref = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css';
    const mcCss2Href = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css';
    const mcJsSrc = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster-src.js';

    function loadScript(src, onload) {
        const s = document.createElement('script');
        s.src = src;
        s.onload = onload;
        document.body.appendChild(s);
    }

    function loadCss(href) {
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = href;
        document.head.appendChild(l);
    }

    // Load Leaflet CSS + JS
    if (!window.L) {
        loadCss(leafCssHref);
        loadScript(leafJsSrc, () => {
            // Load MarkerCluster CSS + JS after Leaflet
            if (!window.L.markerClusterGroup) {
                loadCss(mcCssHref);
                loadCss(mcCss2Href);
                loadScript(mcJsSrc, callback);
            } else {
                callback();
            }
        });
    } else {
        // Leaflet exists
        if (!window.L.markerClusterGroup) {
            loadCss(mcCssHref);
            loadCss(mcCss2Href);
            loadScript(mcJsSrc, callback);
        } else {
            callback();
        }
    }
}

// --- EVENTS MAP ---
function initEventsMap() {
    if (typeof getAllEvents !== 'function') return;

    const allEvents = getAllEvents();
    const map = L.map('map').setView([54.5, -3], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    allEvents.forEach(event => {
        const marker = L.marker([event.lat, event.lon]).addTo(map);
        marker.bindPopup(`
            <div>
                <strong>${escapeHtml(event.name)}</strong><br/>
                ${escapeHtml(event.location)}, ${escapeHtml(event.country)}<br/>
                <em>${escapeHtml(event.date)}</em><br/>
                <a href="${event.website}" target="_blank">Website</a>
            </div>
        `);
    });

    const container = document.getElementById('region-list');
    if (container) {
        container.innerHTML = '';
        allEvents.forEach(event => {
            const div = document.createElement('div');
            div.classList.add('region-item');
            div.innerHTML = `
                <strong>${escapeHtml(event.name)}</strong><br/>
                ${escapeHtml(event.location)}, ${escapeHtml(event.country)}<br/>
                <span>${escapeHtml(event.date)}</span>
            `;
            div.addEventListener('click', () => map.setView([event.lat, event.lon], 12));
            container.appendChild(div);
        });
    }
}

// --- INDEX MAP (GROUPS) ---
function initIndexMap() {
    if (typeof getAllCommunities !== 'function') return;

    const regionCoords = {
        'Wales': [52.1307, -3.7837],
        'Midlands': [52.5869, -2.1280],
        'North England': [53.4808, -2.2426],
        'South England': [51.5074, -0.1278],
        'East England': [52.2053, 0.1218],
        'Scotland': [56.4907, -4.2026]
    };

    const map = L.map('map').setView(regionCoords['South England'], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    function addGroupMarkers() {
        try {
            const allGroups = getAllCommunities();
            const clusterGroup = L.markerClusterGroup ? L.markerClusterGroup() : null;
            const defaultCenter = [54.0, -2.0];
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
                    const rc = regionCoords[group.region] || defaultCenter;
                    lat = rc[0]; lon = rc[1];
                }

                const regionKey = (group.region || '').toLowerCase();
                const regionColor = regionColors[regionKey] || '#6b7280';

                const markerIcon = L.divIcon({
                    html: `<div style="background-color: ${regionColor}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                    iconSize: [24, 24],
                    className: 'custom-marker'
                });

                const marker = L.marker([lat, lon], { icon: markerIcon });
                allMarkers.push([lat, lon]);

                marker.bindPopup(`
                    <div style="min-width:150px">
                        <strong>${escapeHtml(group.name)}</strong><br/>
                        <small>${escapeHtml(group.city || '')}${group.county ? ', ' + escapeHtml(group.county) : ''}</small>
                        <div style="margin-top:8px"><a href="group.html?id=${encodeURIComponent(group.id)}">View profile</a></div>
                    </div>
                `);

                if (clusterGroup) clusterGroup.addLayer(marker);
                else marker.addTo(map);
            });

            if (clusterGroup) map.addLayer(clusterGroup);

            if (allMarkers.length > 0) {
                const group = new L.featureGroup(allMarkers.map(coords => L.marker(coords)));
                map.fitBounds(group.getBounds(), { padding: [50, 50] });
            }
        } catch (err) {
            console.error('Error adding group markers:', err);
        }
    }

    addGroupMarkers();
}

// --- UTILITY FUNCTIONS ---
function getUrlParameter(name) {
    const url = window.location.href;
    const regex = new RegExp('[?&]' + name + '=([^&#]*)');
    const result = regex.exec(url);
    return result ? decodeURIComponent(result[1].replace(/\+/g, ' ')) : '';
}

function findGroupById(groupId) {
    const allCommunities = getAllCommunities();
    return allCommunities.find(group => group.id === groupId);
}

function getGroupsByCity(regionId, cityKey) {
    const city = ukCommunities[regionId]?.counties[cityKey];
    return city ? city.groups : [];
}
