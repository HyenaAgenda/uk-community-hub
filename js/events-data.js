// UK Fur Network Events Database

 const ukEvents = {
    // West Midlands
    'west midlands': {
        name: 'West Midlands',
        counties: {
            'birmingham': {
                name: 'Birmingham',
                county: 'West Midlands',
                events: [
                    {
                        id: 'confuzzled',
                        name: 'Confuzzled',
                        description: 'Based at the Birmingham NEC Hilton Hotel, Confuzzled is one of the largest furry conventions in the UK, attracting thousands of attendees each year for a weekend of fun, panels, and socializing.',
                        telegramLink: 'https://t.me/ConFuzzledNews',
                        website: 'https://confuzzled.org.uk/',
                        socials: {
                            youtube: "https://www.youtube.com/user/confuzzledcon",
                            bluesky: "https://bsky.app/profile/confuzzled.org.uk"
                        },
                        lat: 52.4534,
                        lon: -1.7183,
                        type: 'convention',
                        EventSize: '3000+',
                        ageLimit: 18,
                        active: true,
                        expectations: {
                            panels: true,
                            chats: true,
                            art: true,
                            community: true
                        }
                    }
                ]
            }
        }
    },
    'south england': {
        name: 'South England',
        counties: {
            'london': {
                name: 'London',
                county: 'London',
                events: [
                    {
                        id: 'london-furs-summer-party',
                        name: 'London Furs Summer Party',
                        description: 'The LondonFurs Summer Weekender (comprising the LondonFurs Summer Boat Party with music and dancing on Friday night, and the LondonFurs Summer Party the day after).',
                        telegramLink: 'https://telegram.me/joinlondonfurs',
                        website: 'https://londonfurs.org.uk/',
                        socials: {
                            discord: "https://discord.com/invite/GdBSDGNcJe",
                            youtube: "https://www.youtube.com/channel/UCNwbLAhalwmxsoHB-uJI69g",
                            instagram: "https://www.instagram.com/londonfurs/",
                            bluesky: "https://bsky.app/profile/londonfurs.bsky.social"
                            
                        },
                        lat: 51.5074,
                        lon: -0.1278,
                        type: 'event',
                        EventSize: '1000',
                        ageLimit: 18,
                        active: true,
                        expectations: {
                            panels: false,
                            chats: true,
                            art: false,
                            community: true
                        }
                    },
                    {
                        id: 'london-furs-winter-party',
                        name: 'London Furs Winter Party',
                        description: 'The LondonFurs Winter Party (held at a large bar with restaurant and music facilities from noon to 11PM).',
                        telegramLink: 'https://telegram.me/joinlondonfurs',
                        website: 'https://londonfurs.org.uk/',
                        socials: {
                            discord: "https://discord.com/invite/GdBSDGNcJe",
                            youtube: "https://www.youtube.com/channel/UCNwbLAhalwmxsoHB-uJI69g",
                            instagram: "https://www.instagram.com/londonfurs/",
                            bluesky: "https://bsky.app/profile/londonfurs.bsky.social"
                        },
                        lat: 51.5074,
                        lon: -0.1278,
                        type: 'event',
                        EventSize: '1000',
                        ageLimit: 18,
                        active: true,
                        expectations: {
                            panels: false,
                            chats: true,
                            art: false,
                            community: true
                        }
                    }
                ]
            },
            'weston-super-mare': {
                name: 'Weston-super-Mare',
                county: 'Somerset',
                events: [
                    {
                        id: 'furcation',
                        name: 'Furcation',
                        description: 'Furcation is currently not running any conventions after Furc24.',
                        telegramLink: 'https://t.me/furcationlive',
                        website: 'https://furcation.org.uk/',
                        socials: {
                            twitter: 'https://twitter.com/furcationevent',
                            discord: 'https://discord.furcation.org.uk/'
                        },
                        lat: 51.3460,
                        lon: -2.9775,
                        type: 'convention',
                        EventSize: '0',
                        ageLimit: 18,
                        active: false,
                        expectations: {
                            panels: true,
                            chats: true,
                            art: true,
                            community: true
                        }
                    }
                ]
            },
            'gloucestershire': {
                name: 'Gloucestershire',
                county: 'Gloucestershire',
                events: [
                    {
                        id: 'pawsome',
                        name: 'Pawsome',
                        description: 'A very friendly and relaxed con with limited space in a lovely hotel.',
                        telegramLink: '#',
                        website: 'https://www.pawsome.org.uk/en',
                        socials: {
                            youtube: "https://www.youtube.com/channel/UCpF0G6N6HDz5uIQAMjDY0-g",
                            twitter: "https://x.com/pawsome_uk",
                            bluesky: "https://bsky.app/profile/pawsome.bsky.social"
                        },
                        lat: 51.8657,
                        lon: -2.2431,
                        type: 'convention',
                        EventSize: '600',
                        ageLimit: 18,
                        active: true,
                        expectations: {
                            panels: true,
                            chats: true,
                            art: true,
                            community: true
                        }
                    }
                ]
            }
        }
    },
    'north england': {
        name: 'North England',
        counties: {
            'manchester': {
                name: 'Manchester',
                county: 'Greater Manchester',
                events: [
                    {
                        id: 'animalz',
                        name: 'Animalz',
                        description: 'A furry night/event in Manchester Gay Village. It is a sec club which requires you to purchase a ticket and be 18+. It has a sfw upstairs and NSFW downstairs area. This is a 18+ ticketed event.',
                        telegramLink: 'https://t.me/TheHelpingPawBot',
                        website: 'https://www.clubanimalz.com/',
                        socials: {
                            bluesky: "https://bsky.app/profile/animalz.bsky.social"
                        },
                        lat: 53.4786,
                        lon: -2.2353,
                        type: 'nightclub',
                        EventSize: '500+',
                        active: true,
                        expectations: {
                            panels: false,
                            chats: true,
                            art: false,
                            community: true
                        }
                    },
                    {
                        id: 'club-alert',
                        name: 'Club Alert',
                        description: 'This is primarily a normal gay nightclub\sexclub with kink however they often do furry nights with Club Animalz. This is 18+ and a ticketd event with a option for membership',
                        telegramLink: '#',
                        website: 'https://www.club-alert.com/',
                        lat: 53.4786,
                        lon: -2.2353,
                        type: 'nightclub',
                        EventSize: '200+',
                        active: true,
                        expectations: {
                            panels: false,
                            chats: true,
                            art: false,
                            community: true
                        }
                    }
                ]
            },
            'county-durham': {
                name: 'County Durham',
                county: 'County Durham',
                events: [
                    {
                        id: 'wild-north',
                        name: 'Wild North',
                        description: 'Wild North is a furry convention with a fuzzy twist. The convention takes place in a 14th century castle in the scenic and historic north of England. They offer a relaxed atmosphere, great companionship, and a whole host of fun',
                        telegramLink: 'https://www.t.me/wildnorthud',
                        website: 'https://www.wildnorth.uk/',
                        socials: {
                            bluesky :"https://bsky.app/profile/wildnorth.bsky.social",
                            discord : "https://discord.com/invite/TDE399rjB6",
                            twitter: "https://x.com/WildNorthEvent",
                            facebook: "https://www.facebook.com/groups/wildnorthuk"
                        },
                        lat: 54.8670,
                        lon: -1.5540,
                        type: 'convention',
                        EventSize: 'Unknown',
                        ageLimit: 18,
                        active: true,
                        expectations: {
                            panels: true,
                            chats: true,
                            art: true,
                            community: true
                        }
                    }
                ]
            }
        }
    },
    'scotland': {
        name: 'Scotland',
        counties: {
            'glasgow': {
                name: 'Glasgow',
                county: 'Glasgow',
                events: [
                    {
                        id: 'scotiacon',
                        name: 'ScotiaCon',
                        description: 'Scotiacon is Scotland’s first (and currently only!) furry convention. Their first event was in 2011. Bringing together furries from all around the globe to celebrate our community and shared interests. Their theme for 2026 is Howl at High Noon which is a western theme. ScotiaCon as a convention has great reviews by the community and overall has a great experience for anyone who attends',
                        telegramLink: 'https://t.me/Scotiaconlive',
                        website: 'https://www.scotiacon.org.uk/',
                        socials: {
                            bluesky: "https://bsky.app/profile/scotiacon.bsky.social",
                            youtube: "https://www.youtube.com/scotiaconTV"
                        },
                        lat: 55.8642,
                        lon: -4.2518,
                        type: 'convention',
                        EventSize: '1000+',
                        ageLimit: 18,
                        active: true,
                        expectations: {
                            panels: true,
                            chats: true,
                            art: true,
                            community: true
                        }
                    },
                    {
                        id: 'furtherecord',
                        name: 'FurTheRecord',
                        description: 'We are the Furry underground rave Network: a collective of DJs and enthusiasts based in and around Glasgow who like to throw parties, and decided it was time to throw a bigger one.',
                        telegramLink: 'https://t.me/+xw3dJ7z5OzJmZWVk',
                        website: 'https://furnevents.org/',
                        socials: {
                            blueksy: "https://bsky.app/profile/furtherecord.bsky.social"
                        },
                        lat: 55.8643,
                        lon: -4.2576,
                        type: 'event',
                        EventSize: 'Unknown',
                        ageLimit: 18,
                        active: true,
                        expectations: {
                            panels: false,
                            chats: true,
                            art: false,
                            community: true
                        }
                    }
                ]
            }
        }
    }
};
        

// Flatten the data for easier searching
function getAllEvents() {
    const allEvents = [];
    
    Object.keys(ukEvents).forEach(region => {
        Object.keys(ukEvents[region].counties).forEach(cityKey => {
            const city = ukEvents[region].counties[cityKey];
            city.events.forEach(event => {
                allEvents.push({
                    ...event,
                    city: city.name,
                    county: city.county,
                    region: ukEvents[region].name
                });
            });
        });
    });
    
    return allEvents;
}

// Get all regions for the map
function getAllEventRegions() {
    return Object.keys(ukEvents).map(key => ({
        key: key,
        name: ukEvents[key].name,
        counties: Object.keys(ukEvents[key].counties).map(cityKey => ({
            key: cityKey,
            name: ukEvents[key].counties[cityKey].name,
            county: ukEvents[key].counties[cityKey].county
        }))
    }));
}
