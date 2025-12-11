// UK Fur Network – Convention & Events Database
// Works exactly like data.js but for conventions & events

const ukEvents = {
    'major-cons': {
        name: 'Major Conventions',
        locations: {
            'scotiacon': {
                name: 'ScotiaCon',
                country: 'Scotland',
                events: [
                    {
                        id: 'scotiacon',
                        name: 'ScotiaCon',
                        description: 'Scotland’s main furry convention. Annual weekend-long con featuring dealers den, panels, parties, games and fursuit events.',
                        website: 'https://www.scotiacon.org/',
                        socials: {
                            twitter: "https://x.com/scotiacon",
                        },
                        lat: 55.9533,
                        lon: -3.1883,
                        size: 'Medium',
                        active: true,
                        date: '2025-02-14',
                        durationDays: 3,
                        tickets: true
                    }
                ]
            },
            'confuzzled': {
                name: 'Confuzzled',
                country: 'England',
                events: [
                    {
                        id: 'confuzzled',
                        name: 'Confuzzled',
                        description: 'The UK’s largest furry convention held annually in Birmingham. Huge selection of events including dances, dealers den, panels and main stage shows.',
                        website: 'https://www.confuzzled.org.uk/',
                        socials: {
                            twitter: "https://x.com/Confuzzled",
                        },
                        lat: 52.4751,
                        lon: -1.8293,
                        size: 'Very Large',
                        active: true,
                        date: '2025-05-23',
                        durationDays: 4,
                        tickets: true
                    }
                ]
            }
        }
    },

    'regional-events': {
        name: 'Regional Events',
        locations: {
            'barkade': {
                name: 'Barkade',
                country: 'England',
                events: [
                    {
                        id: 'barkade',
                        name: 'BarkadeFurs Event',
                        description: 'A UK-wide furry club/arcade event that travels to different cities several times a year. 18+.',
                        website: 'https://barkadefurs.com/',
                        lat: 51.5099,
                        lon: -0.1181,
                        size: 'Medium',
                        active: true,
                        date: '2025-09-12',
                        durationDays: 1,
                        tickets: true
                    }
                ]
            },

            'yiffclub': {
                name: 'YiffClub',
                country: 'England',
                events: [
                    {
                        id: 'yiffclub',
                        name: 'YiffClub: Furry Rave',
                        description: 'A recurring furry nightclub/rave event hosted in different UK locations throughout the year.',
                        website: '#',
                        lat: 53.4808,
                        lon: -2.2426,
                        size: 'Medium',
                        active: true,
                        date: '2025-04-05',
                        durationDays: 1,
                        tickets: true
                    }
                ]
            }
        }
    }
};


// Flatten the data (mirrors getAllCommunities)
function getAllEvents() {
    const all = [];

    Object.keys(ukEvents).forEach(category => {
        Object.keys(ukEvents[category].locations).forEach(locKey => {
            const loc = ukEvents[category].locations[locKey];
            loc.events.forEach(event => {
                all.push({
                    ...event,
                    location: loc.name,
                    country: loc.country,
                    category: ukEvents[category].name
                });
            });
        });
    });

    return all;
}

// Get all categories and locations (mirrors getAllRegions)
function getAllEventCategories() {
    return Object.keys(ukEvents).map(key => ({
        key: key,
        name: ukEvents[key].name,
        locations: Object.keys(ukEvents[key].locations).map(locKey => ({
            key: locKey,
            name: ukEvents[key].locations[locKey].name,
            country: ukEvents[key].locations[locKey].country
        }))
    }));
}
