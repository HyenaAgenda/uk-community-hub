// UK Map Rendering and Interaction

const mapRegions = [
    // Scotland
    { id: 'scotland', name: 'Scotland', path: 'M100,50 L200,60 L180,150 L100,140 Z', color: '#a78bfa' },
    
    // Wales
    { id: 'wales', name: 'Wales', path: 'M80,200 L120,190 L130,280 L90,290 Z', color: '#c084fc' },
    
    // North West England
    { id: 'northwest', name: 'North West', path: 'M130,190 L180,185 L190,250 L150,260 Z', color: '#b794f6' },
    
    // North East England
    { id: 'northeast', name: 'North East', path: 'M180,100 L220,110 L230,200 L200,190 Z', color: '#d8b4fe' },
    
    // Midlands
    { id: 'midlands', name: 'Midlands', path: 'M140,260 L200,250 L210,320 L160,330 Z', color: '#e9d5ff' },
    
    // East England
    { id: 'east', name: 'East England', path: 'M200,200 L250,190 L260,300 L210,310 Z', color: '#f3e8ff' },
    
    // South East England
    { id: 'southeast', name: 'South East', path: 'M160,330 L250,310 L260,380 L170,390 Z', color: '#d8b4fe' },
    
    // South West England
    { id: 'southwest', name: 'South West', path: 'M100,300 L160,330 L170,420 L110,430 Z', color: '#c084fc' }
];

function renderUKMap() {
    const svgElement = document.getElementById('uk-map');
    
    // Clear existing content
    svgElement.innerHTML = '';
    
    // Add regions
    mapRegions.forEach(region => {
        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', region.path);
        pathElement.setAttribute('fill', region.color);
        pathElement.setAttribute('stroke', '#6366f1');
        pathElement.setAttribute('stroke-width', '2');
        pathElement.setAttribute('class', 'uk-region cursor-pointer hover:opacity-80 transition');
        pathElement.setAttribute('data-region', region.id);
        
        pathElement.addEventListener('click', () => handleRegionClick(region.id));
        pathElement.addEventListener('mouseenter', (e) => {
            e.target.setAttribute('opacity', '0.8');
        });
        pathElement.addEventListener('mouseleave', (e) => {
            e.target.setAttribute('opacity', '1');
        });
        
        svgElement.appendChild(pathElement);
    });
    
    // Add labels
    const labels = [
        { x: 140, y: 80, text: 'Scotland' },
        { x: 100, y: 240, text: 'Wales' },
        { x: 150, y: 220, text: 'NW' },
        { x: 200, y: 140, text: 'NE' },
        { x: 170, y: 290, text: 'Midlands' },
        { x: 220, y: 240, text: 'East' },
        { x: 190, y: 360, text: 'SE' },
        { x: 120, y: 380, text: 'SW' }
    ];
    
    labels.forEach(label => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', label.x);
        text.setAttribute('y', label.y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#1f2937');
        text.setAttribute('font-weight', '600');
        text.setAttribute('font-size', '14');
        text.setAttribute('pointer-events', 'none');
        text.textContent = label.text;
        svgElement.appendChild(text);
    });
}

function handleRegionClick(regionId) {
    const regionData = ukCommunities[regionId];
    
    if (!regionData) {
        // Handle region map to data structure mapping
        const regionMapping = {
            'scotland': 'scotland',
            'wales': 'wales',
            'northwest': 'north-england',
            'northeast': 'north-england',
            'midlands': 'midlands',
            'east': 'east-england',
            'southeast': 'south-england',
            'southwest': 'south-england'
        };
        
        const dataRegionId = regionMapping[regionId];
        if (dataRegionId && ukCommunities[dataRegionId]) {
            showRegionCommunities(dataRegionId, ukCommunities[dataRegionId].name);
        }
        return;
    }
    
    showRegionCommunities(regionId, regionData.name);
}

function showRegionCommunities(regionId, regionName) {
    const regionData = ukCommunities[regionId];
    
    let html = `<div class="mb-6">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">${regionName}</h3>
        <div class="space-y-3">`;
    
    Object.keys(regionData.counties).forEach(cityKey => {
        const city = regionData.counties[cityKey];
        html += `
            <button 
                class="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg hover:from-purple-100 hover:to-indigo-100 transition border border-purple-200"
                onclick="viewCityGroups('${regionId}', '${cityKey}', '${city.name}')">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="font-bold text-gray-900">${city.name}</h4>
                        <p class="text-sm text-gray-600">${city.groups.length} communit${city.groups.length !== 1 ? 'ies' : 'y'}</p>
                    </div>
                    <i class="fas fa-chevron-right text-purple-600"></i>
                </div>
            </button>`;
    });
    
    html += `</div></div>`;
    
    const regionList = document.getElementById('region-list');
    regionList.innerHTML = html;
}

function viewCityGroups(regionId, cityKey, cityName) {
    const city = ukCommunities[regionId].counties[cityKey];
    
    let html = `
        <div class="mb-6">
            <button 
                class="mb-4 text-purple-600 hover:text-purple-800 font-medium flex items-center gap-2"
                onclick="resetRegionList()">
                <i class="fas fa-arrow-left"></i>
                Back
            </button>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">${cityName}</h3>
            <div class="space-y-3">`;
    
    city.groups.forEach(group => {
        html += `
            <a 
                href="group.html?id=${group.id}"
                class="block p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-500 hover:shadow-md transition">
                <div class="flex items-start justify-between">
                    <div>
                        <h4 class="font-bold text-gray-900">${group.name}</h4>
                        <p class="text-sm text-gray-600 mt-1">${group.description}</p>
                        <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span><i class="fas fa-users text-purple-600"></i> ${group.communitySize}</span>
                            <span class="flex items-center gap-1">
                                <i class="fas fa-check-circle text-green-600"></i>
                                Active
                            </span>
                        </div>
                    </div>
                    <i class="fas fa-chevron-right text-purple-600 mt-2"></i>
                </div>
            </a>`;
    });
    
    html += `</div></div>`;
    
    const regionList = document.getElementById('region-list');
    regionList.innerHTML = html;
    regionList.scrollTop = 0;
}

function resetRegionList() {
    const regionList = document.getElementById('region-list');
    let html = `<div class="space-y-2">`;
    
    getAllRegions().forEach(region => {
        html += `
            <button 
                class="w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-purple-100 transition font-medium text-gray-900"
                onclick="showRegionCommunities('${region.key}', '${region.name}')">
                ${region.name}
            </button>`;
    });
    
    html += `</div>`;
    regionList.innerHTML = html;
}

function searchRegions() {
    const searchTerm = document.getElementById('region-search').value.toLowerCase();
    const regionList = document.getElementById('region-list');
    
    if (!searchTerm) {
        resetRegionList();
        return;
    }
    
    const allCommunities = getAllCommunities();
    const filtered = allCommunities.filter(community =>
        community.name.toLowerCase().includes(searchTerm) ||
        community.city.toLowerCase().includes(searchTerm) ||
        community.county.toLowerCase().includes(searchTerm)
    );
    
    if (filtered.length === 0) {
        regionList.innerHTML = '<div class="text-gray-500 text-center py-4">No communities found</div>';
        return;
    }
    
    let html = `<div class="space-y-3">`;
    
    filtered.forEach(group => {
        html += `
            <a 
                href="group.html?id=${group.id}"
                class="block p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-500 transition">
                <div>
                    <h4 class="font-bold text-gray-900 text-sm">${group.name}</h4>
                    <p class="text-xs text-gray-600 mt-1">${group.city}, ${group.county}</p>
                    <p class="text-xs text-gray-500 mt-1">${group.communitySize}</p>
                </div>
            </a>`;
    });
    
    html += `</div>`;
    regionList.innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderUKMap();
    resetRegionList();
    
    // Set up search listener
    const searchInput = document.getElementById('region-search');
    if (searchInput) {
        searchInput.addEventListener('input', searchRegions);
    }
});
