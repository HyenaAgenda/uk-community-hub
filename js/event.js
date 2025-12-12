// Event detail page logic

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
                menu.classList.toggle('active');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            if (menu) menu.classList.remove('active');
        });
    });

    const eventId = getUrlParameter('id');
    const event = findEventById(eventId);

    if (!event) {
        const container = document.querySelector('.group-container');
        if (container) {
            container.innerHTML = '<div style="text-align: center; padding: 3rem; color: #6b7280;"><h1 style="color: #1f2937; margin-bottom: 1rem;">Event not found</h1><a href="/events.html#find-events" style="color: #a855f7;">Return to events</a></div>';
        }
        return;
    }

    document.title = event.name + ' - UK Furry Community Hub';

    const nameEl = document.getElementById('event-name');
    if (nameEl) nameEl.textContent = event.name;

    const locationEl = document.getElementById('event-location');
    if (locationEl) locationEl.textContent = (event.city || '') + (event.county ? ', ' + event.county : '');

    const descEl = document.getElementById('event-description');
    if (descEl) descEl.textContent = event.description || '';

    const sizeEl = document.getElementById('event-size');
    if (sizeEl) sizeEl.textContent = event.EventSize || 'Unknown';

    const breadcrumbCityEl = document.getElementById('breadcrumb-city');
    if (breadcrumbCityEl) breadcrumbCityEl.textContent = event.city || 'Unknown';

    const breadcrumbEventEl = document.getElementById('breadcrumb-event');
    if (breadcrumbEventEl) breadcrumbEventEl.textContent = event.name;

    const statusEl = document.getElementById('event-status');
    if (statusEl) {
        if (event.active) {
            statusEl.textContent = 'Active';
            statusEl.style.color = '#10b981';
        } else {
            statusEl.textContent = 'Inactive';
            statusEl.style.color = '#ef4444';
        }
    }

    // Expectations
    const expectContainer = document.getElementById('expectations-container');
    if (expectContainer) {
        if (!event.expectations || !event.active) {
            expectContainer.style.display = 'none';
        } else {
            const expectations = event.expectations;
            const cards = {
                panels: document.getElementById('expect-panels'),
                chats: document.getElementById('expect-chats'),
                art: document.getElementById('expect-art'),
                community: document.getElementById('expect-community')
            };

            Object.keys(cards).forEach(key => {
                const el = cards[key];
                if (el && expectations[key] === false) {
                    el.style.display = 'none';
                }
            });

            const visibleCards = Object.values(cards).some(card => card && card.style.display !== 'none');
            if (!visibleCards) {
                expectContainer.style.display = 'none';
            }
        }
    }

    // Telegram link + QR
    const joinLink = document.getElementById('join-link');
    if (joinLink) {
        if (event.telegramLink && event.telegramLink !== '#' && event.telegramLink.trim() !== '') {
            joinLink.href = event.telegramLink;
            joinLink.target = '_blank';

            const qr = document.getElementById('qr-code');
            if (qr) {
                qr.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(event.telegramLink)}" alt="Join ${escapeHtmlAttr(event.name)}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 10px;">`;
            }
        } else {
            joinLink.href = `/no-socials?id=${encodeURIComponent(event.id)}`;
            joinLink.removeAttribute('target');
            joinLink.textContent = '';
            joinLink.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Telegram Group Not Found';

            const qr = document.getElementById('qr-code');
            if (qr) {
                qr.innerHTML = '<p class="qr-text" style="text-align: center; color: #6b7280;">QR code unavailable</p>';
            }
        }
    }

    // Website link
    if (event.website && event.website.trim() !== '' && event.website !== '#') {
        const container = document.getElementById('website-button-container');
        if (container) container.style.display = 'block';

        const websiteLink = document.getElementById('website-link');
        if (websiteLink) {
            websiteLink.href = event.website;
            websiteLink.target = '_blank';
        }
    }

    // Socials section (match group page rendering)
    const socialsContainer = document.getElementById('socials-container');
    if (socialsContainer) {
        const socials = event.socials || {};
        const socialPlatforms = [
            { key: 'discord', icon: 'fab fa-discord', label: 'Discord' },
            { key: 'twitter', icon: 'fab fa-twitter', label: 'Twitter' },
            { key: 'instagram', icon: 'fab fa-instagram', label: 'Instagram' },
            { key: 'facebook', icon: 'fab fa-facebook', label: 'Facebook' },
            { key: 'reddit', icon: 'fab fa-reddit', label: 'Reddit' },
            { key: 'youtube', icon: 'fab fa-youtube', label: 'YouTube' },
            { key: 'bluesky', icon: 'fas fa-cloud', label: 'Bluesky' }
        ];

        let hasSocials = false;
        let socialsHtml = '';

        socialPlatforms.forEach(platform => {
            if (socials[platform.key]) {
                hasSocials = true;
                socialsHtml += `
                    <a href="${escapeHtmlAttr(socials[platform.key])}" target="_blank" class="share-button" title="${platform.label}">
                        <i class="${platform.icon}"></i>
                        <span>${platform.label}</span>
                    </a>`;
            }
        });

        if (!hasSocials) {
            socialsHtml = `
                <div style="text-align: center; padding: 1rem; color: #6b7280;">
                    <p style="margin-bottom: 1rem;">Social links not available yet</p>
                    <a href="/no-socials?id=${encodeURIComponent(event.id)}" class="share-button" style="display: inline-block;">
                        <i class="fas fa-info-circle"></i>
                        <span>Help Us Update</span>
                    </a>
                </div>`;
        }

        socialsContainer.innerHTML = socialsHtml;
    }
});

function escapeHtmlAttr(str) {
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

function getUrlParameter(name) {
    const url = window.location.href;
    const regex = new RegExp('[?&]' + name + '=([^&#]*)');
    const result = regex.exec(url);
    return result === null ? '' : decodeURIComponent(result[1].replace(/\+/g, ' '));
}

function findEventById(eventId) {
    if (typeof getAllEvents !== 'function') return null;
    const allEvents = getAllEvents();
    return allEvents.find(evt => evt.id === eventId);
}
