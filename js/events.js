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
    return String(str).replace(/[&<>"]|'/g, function(s) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[s];
    });
}

let ukfEventsMap = null;
let ukfEventsClusterGroup = null;
let ukfEventsMarkerIndex = new Map();

function initEventMap() {
    if (!document.getElementById('map')) return;
    if (!window.L) return;

    const regionCoords = {
        'Wales': [52.1307, -3.7837],
        'Midlands': [52.5869, -2.1280],
        'North England': [53.4808, -2.2426],
        'South England': [51.5074, -0.1278],
        'East England': [52.2053, 0.1218],
        'Scotland': [56.4907, -4.2026]
    };

    ukfEventsMap = window.L.map('map').setView(regionCoords['South England'], 6);

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(ukfEventsMap);

    ukfEventsClusterGroup = window.L.markerClusterGroup ? window.L.markerClusterGroup() : null;
    if (ukfEventsClusterGroup) ukfEventsMap.addLayer(ukfEventsClusterGroup);

    if (typeof getAllEvents === 'function') {
        updateMapMarkers(getAllEvents());
    }
}

function updateMapMarkers(events) {
    if (!ukfEventsMap || !window.L) return;
    const L = window.L;

    const defaultCenter = [54.0, -2.0];
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

    ukfEventsMarkerIndex = new Map();

    if (ukfEventsClusterGroup) {
        ukfEventsClusterGroup.clearLayers();
    }

    const allMarkers = [];

    (events || []).forEach(evt => {
        let lat = parseFloat(evt.lat);
        let lon = parseFloat(evt.lon);
        if (isNaN(lat) || isNaN(lon)) {
            lat = defaultCenter[0];
            lon = defaultCenter[1];
        }

        const typeKey = (evt.type || '').toString().toLowerCase().trim();
        const color = eventTypeColors[typeKey] || eventTypeColors.default;

        const markerIcon = L.divIcon({
            html: `<div style="background-color: ${color}; width: 22px; height: 22px; border-radius: 6px; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [22, 22],
            className: 'custom-marker'
        });

        const marker = L.marker([lat, lon], { icon: markerIcon });
        ukfEventsMarkerIndex.set(evt.id, marker);
        allMarkers.push([lat, lon]);

        const popupHtml = `
            <div style="min-width:150px">
                <strong>${escapeHtml(evt.name)}</strong><br/>
                <small>${escapeHtml(evt.city || '')}${evt.county ? ', ' + escapeHtml(evt.county) : ''}</small>
                <div style="margin-top:8px"><a href="event.html?id=${encodeURIComponent(evt.id)}">View details</a></div>
            </div>`;
        marker.bindPopup(popupHtml);

        if (ukfEventsClusterGroup) {
            ukfEventsClusterGroup.addLayer(marker);
        } else {
            marker.addTo(ukfEventsMap);
        }
    });

    if (allMarkers.length > 0) {
        const fg = new L.featureGroup(allMarkers.map(coords => L.marker(coords)));
        ukfEventsMap.fitBounds(fg.getBounds(), { padding: [50, 50] });
    }
}

function focusEventOnEventsPage(eventId) {
    try {
        if (!ukfEventsMap) return;
        const marker = ukfEventsMarkerIndex.get(eventId);
        if (!marker) return;

        const open = () => {
            ukfEventsMap.setView(marker.getLatLng(), Math.max(ukfEventsMap.getZoom(), 10));
            marker.openPopup();
        };

        if (ukfEventsClusterGroup && typeof ukfEventsClusterGroup.zoomToShowLayer === 'function') {
            ukfEventsClusterGroup.zoomToShowLayer(marker, open);
        } else {
            open();
        }
    } catch (err) {
        console.error('Error focusing event marker:', err);
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
