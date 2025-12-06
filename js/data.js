// UK Fur Network Community Database
// This file contains all communities organized by region
// Data sourced from UK-FUR-NETWORK - Sheet1.csv

const ukCommunities = {
    // Wales
    'wales': {
        name: 'Wales',
        counties: {
            'cardiff': {
                name: 'Cardiff',
                county: 'Cardiff',
                groups: [
                    {
                        id: 'fur-the-moment',
                        name: 'FurTheMoment',
                        description: 'FurTheMoment is a group of like-minded individuals brought together by a shared passion for the furry fandom. Hosts events on the first Sunday of each month at a variety of venues, keeping the community connected online via Telegram and Discord.',
                        telegramLink: '#',
                        website: 'https://www.furthemoment.com/',
                        lat: 51.4816,
                        lon: -3.1791,
                        communitySize: 'Very Large',
                        active: true
                    }
                ]
            },
            'aberystwyth': {
                name: 'Aberystwyth',
                county: 'Central Wales',
                groups: [
                    {
                        id: 'aberfurs',
                        name: 'AberFurs (CYM)',
                        description: 'Aberystwyth / Ceredigion furry community (AberFurs). Local meets and social groups across mid-Wales.',
                        telegramLink: '#',
                        lat: 52.4153,
                        lon: -4.0826,
                        communitySize: 'Unknown',
                        active: true
                    }
                ]
            }
        }
    },

    // England - Midlands
    'midlands': {
        name: 'Midlands',
        counties: {
            'wolverhampton': {
                name: 'Wolverhampton',
                county: 'West Midlands',
                groups: [
                    {
                        id: 'wolverhampton-furs',
                        name: 'Wolverhampton & Black Country Furs',
                        description: 'Relativily new group in the Wolverhampton and the Black Country region with informal meets and planned meets in future',
                        telegramLink: 't.me/yamfurs',
                        website: 'https://wolverhamptonfurs.com/',
                        lat: 52.5869,
                        lon: -2.1280,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            },
            'birmingham': {
                name: 'Birmingham',
                county: 'West Midlands',
                groups: [
                    {
                        id: 'birmingham-furs',
                        name: 'Birmingham Furs',
                        description: 'Birmingham furry community. Monthly meets with pre-meet, main meet, and fursuit walk. Fursuit-friendly venue with changing/storage.',
                        telegramLink: '#',
                        website: 'https://www.birminghamfurs.uk/',
                        lat: 52.4862,
                        lon: -1.8904,
                        communitySize: 'Large',
                        active: true
                    },
                    {
                        id: 'coventry-furs',
                        name: 'Coventry Furs',
                        description: 'Coventry furry community. Regular meets and social events for the wider Midlands network.',
                        telegramLink: '#',
                        website: 'https://covfurs.co.uk/',
                        lat: 52.4068,
                        lon: -1.5197,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            }
        }
    },

    // England - North
    'north-england': {
        name: 'North England',
        counties: {
            'manchester': {
                name: 'Manchester',
                county: 'Greater Manchester',
                groups: [
                    {
                        id: 'mancfurs',
                        name: 'MancFurs',
                        description: 'Manchester\'s vibrant furry community. One of the UK\'s most active communities with regular meetups held on the second weekend of every month.',
                        telegramLink: '#',
                        website: 'https://www.mancfurs.org.uk/',
                        lat: 53.4808,
                        lon: -2.2426,
                        communitySize: 'Large',
                        active: true
                    }
                ]
            },
            'leeds': {
                name: 'Leeds',
                county: 'West Yorkshire',
                groups: [
                    {
                        id: 'leeds-furs',
                        name: 'LeedsFurs',
                        description: 'Leeds furry community organizing local meets and socials across the region. The events gather at Leeds train station from 11:30-11:45 on meet days, before walking to the meet venue at 11:45. They usually feature drinking, playing pool and socialising, with a weather-permitting fursuit walk taking place around the city centre. The venue provides for a dedicated and discrete fursuit-changing room along with a place to safely store suitcases and other luggage. Current Staff : Wolfie, Lupestripe, Tonks, Bazil Cat, Lynden, Shiro Sirius, Arcais, Azzie, Ares, Urban, Stray Jim, Ell, Fnord, Xantin, SouthPaw, Whiskian Wye, FluffyFlower, Rutan the Qilian',
                        telegramLink: '#',
                        website: 'https://leedsfurs.co.uk/',
                        lat: 53.8008,
                        lon: -1.5491,
                        communitySize: 'Large',
                        active: true
                    }
                ]
            },
            'doncaster': {
                name: 'Doncaster',
                county: 'Central East',
                groups: [
                    {
                        id: 'doncaster-furs',
                        name: 'Doncaster Furs',
                        description: 'Local Doncaster furry community for meetups and regional events. Current Staff as of August 2025, Mattmiles, Midnight, Floss, Hikari, Damien, Millie',
                        telegramLink: 'https://t.me/DoncasterFurs',
                        website: 'https://www.doncasterfurs.co.uk/',
                        lat: 53.5228,
                        lon: -1.1287,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            },
            'yorkshire': {
                name: 'Yorkshire',
                county: 'Yorkshire',
                groups: [
                    {
                        id: 'yorkfur',
                        name: 'YorkFurs',
                        description: 'YorkFurs refers to the community of furries and their meet-ups in the city of York, UK. Meets are run monthly, traditionally on the first weekend of the month. The meets have been run since at least 2006 and have taken place at various venues across the city. As of 2023, meets take place at SPARK on the first Sunday of the month. A weather-permitting fursuit walk takes place around York, with the route as of 2023 usually visiting York Castle and the Coppergate Shopping Centre. YorkFurs was one of the last meets in the UK to operate a mini/main distinction, with smaller monthly mini-meets supplementing larger twice-yearly main meets. As of 2022, this distinction is no longer made, with all meets referred to simply as "York Monthly',
                        telegramLink: 'https://t.me/yorkfurs',
                        website: 'https://yorkshirefurs.org.uk/',
                        lat: 53.9580,
                        lon: -1.0873,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            }
        }
    },

    // England - South & South-West
    'south-england': {
        name: 'South England',
        counties: {
            'london': {
                name: 'London',
                county: 'Greater London',
                groups: [
                    {
                        id: 'london-furs',
                        name: 'LondonFurs',
                        description: 'The UK\'s largest metropolitan furry community based in London. Active community with regular social events including large ticketed events (Winter Weekender, boat party).',
                        telegramLink: '#',
                        website: 'https://londonfurs.org.uk/',
                        lat: 51.5074,
                        lon: -0.1278,
                        communitySize: 'Very Large',
                        active: true
                    },
                    {
                        id: 'barkade-furs',
                        name: 'BarkadeFurs',
                        description: 'UK-wide furry-themed arcade/party events. Occasional large events with 18+ age verification requirement.',
                        telegramLink: '#',
                        website: 'https://barkadefurs.com/',
                        lat: 51.5099,
                        lon: -0.1181,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            },
            'exeter': {
                name: 'Exeter',
                county: 'Devon',
                groups: [
                    {
                        id: 'exeter-furs',
                        name: 'ExeterFurs',
                        description: 'Exeter and Devon furry community organising monthly meets and larger events/parties.',
                        telegramLink: '#',
                        website: 'https://exeterfurs.org.uk/',
                        lat: 50.7184,
                        lon: -3.5339,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            },
            'portsmouth': {
                name: 'Portsmouth',
                county: 'South Coast',
                groups: [
                    {
                        id: 'portsmouth-furs',
                        name: 'PortsmouthFurs',
                        description: 'Portsmouth and South-Coast furry community. Regular monthly meets with picnic & social events.',
                        telegramLink: '#',
                        website: 'https://portsmouthfurs.uk',
                        lat: 50.8198,
                        lon: -1.0880,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            },
            'cornwall': {
                name: 'Cornwall',
                county: 'Southwest',
                groups: [
                    {
                        id: 'cornwall-furs',
                        name: 'Cornwall Furs',
                        description: 'Cornwall regional furry community. Irregular social meets including picnics, city-walks, and local events via Telegram coordination.',
                        telegramLink: 'https://t.me/CornwallFurs',
                        lat: 50.2632,
                        lon: -5.0530,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            },
            'somerset': {
                name: 'Somerset',
                county: 'Somerset & nearby',
                groups: [
                    {
                        id: 'somerset-furs',
                        name: 'Somerset-area subgroups',
                        description: 'Somerset-area groups (Yeovil, Taunton, Bridgwater) — informal meets and local coordination via Telegram chats.',
                        telegramLink: '#',
                        lat: 51.0145,
                        lon: -3.1069,
                        communitySize: 'N/A',
                        active: true
                    }
                ]
            },
            'sussex': {
                name: 'Sussex',
                county: 'South Coast',
                groups: [
                    {
                        id: 'sussex-furs',
                        name: 'SussexFurs',
                        description: 'Sussex furry community organising occasional larger meets and events (parties, summer meet-ups) across Brighton and the South Coast. Current staff: Joy , Zeke the Folf, Bea, Hino, Artemis, Ace, Raymond',
                        telegramLink: 'https://t.me/+vQB5Me9jtHZjMTlk',
                        website: 'https://www.sussexfurs.co.uk/',
                        lat: 50.8225,
                        lon: -0.1372,
                        communitySize: 'Medium',
                        active: true
                    },
                    {
                        id: 'east-sussex-furs',
                        name: 'East Sussex Furs',
                        description: 'Brighton and East Sussex furry community.',
                        telegramLink: '#',
                        website: 'https://www.sussexfurs.co.uk/',
                        lat: 50.8659,
                        lon: -0.0833,
                        communitySize: 'Small',
                        active: true
                    }
                ]
            },
            'reading': {
                name: 'Reading',
                county: 'South Central',
                groups: [
                    {
                        id: 'berkshire-furs',
                        name: 'Berkshire Furs',
                        description: 'Berkshire Furs is a local furry group for Berkshire and surrounding areas in the United Kingdom. As of September 2025, the Telegram group has over 475 members.As of 2025, the staff of Berkshire Furs are as follows: Shadow Raccoon,Bon Pansky,Leda,Washu,Draegarth,Tungro',
                        telegramLink: 'https://t.me/JoinBerkshireFurs',
                        website: 'https://www.berkshirefurs.org.uk/',
                        lat: 51.4543,
                        lon: -0.9781,
                        communitySize: 'Large',
                        active: true
                    }
                ]
            },
            'bristol': {
                name: 'Bristol',
                county: 'South West',
                groups: [
                    {
                        id: 'bristol-furs',
                        name: 'Bristol Furs',
                        description: 'Bristol furry community. First weekend of every month (Saturday) at various venues.   ',
                        telegramLink: '#',
                        website: 'https://bristolfurs.co.uk/',
                        lat: 51.4545,
                        lon: -2.5879,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            },
            'hampshire': {
                name: 'Hampshire',
                county: 'South Central',
                groups: [
                    {
                        id: 'soton-furs',
                        name: 'Soton Furs',
                        description: 'SotonFurs is a regularly held furmeet located in Southampton, United Kingdom. As of May 2025, the Telegram channel reports over 480 members. Regular meets organized via community telegram at the Heartbreakers Bar / Venue in Southampton.',
                        telegramLink: '#',
                        lat: 50.9097,
                        lon: -1.4044,
                        communitySize: 'Large',
                        active: true
                    }
                ]
            },
            'plymouth': {
                name: 'Plymouth',
                county: 'South Central',
                groups: [
                    {
                        id: 'plymouth-furs',
                        name: 'PlymouthFurs',
                        description: 'PlymouthFurs is a regional furry group centered around the city of Plymouth in the United Kingdom. It also covers a majority of the Devon and Cornwall area. They hold monthly fur-meets on the last Saturday of every month. Current Staff: Aconight, theonecanine, Nitwolf112, TkkAttack, Kloof, Chili',
                        telegramLink: '#',
                        website: 'https://x.com/PlymouthFurs',
                        lat: 50.3755,
                        lon: -4.1427,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            }
        }
    },

    // England - East
    'east-england': {
        name: 'East England',
        counties: {
            'cambridge': {
                name: 'Cambridge',
                county: 'Cambridge area',
                groups: [
                    {
                        id: 'cambridge-furs',
                        name: 'CambridgeFurs',
                        description: 'Cambridge and East Anglia furry community. Online meets via Discord plus occasional local in-person meets.',
                        telegramLink: '#',
                        website: 'https://cambfurs.co.uk/',
                        lat: 52.2053,
                        lon: 0.1218,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            },
            'kent': {
                name: 'Kent',
                county: 'South East',
                groups: [
                    {
                        id: 'kent-furs',
                        name: 'KentFurs',
                        description: 'Kent furry community.',
                        telegramLink: '#',
                        website: 'https://x.com/KentFurs',
                        lat: 51.2746,
                        lon: 0.5235,
                        communitySize: 'Small',
                        active: true
                    }
                ]
            }
        }
    },

    // Scotland
    'scotland': {
        name: 'Scotland',
        counties: {
            'glasgow': {
                name: 'Glasgow',
                county: 'West Scotland',
                groups: [
                    {
                        id: 'glasgow-furs',
                        name: 'Glasgow Furs',
                        description: 'Glasgow and West Scotland furry community. Meet schedule and details available on their website.',
                        telegramLink: '#',
                        website: 'https://glasgowfurs.scot/',
                        lat: 55.8642,
                        lon: -4.2518,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            }
        }
    },

    // Northern Ireland
    'northern-ireland': {
        name: 'Northern Ireland',
        counties: {
            'belfast': {
                name: 'Belfast',
                county: 'Northern Ireland',
                groups: [
                    {
                        id: 'iron-furs',
                        name: 'IronFurs',
                        description: 'IronFurs — Northern Ireland furry community based around Belfast. Monthly Saturday meets including casual meets, museum/convention trips.',
                        telegramLink: '#',
                        website: 'https://www.ironfurs.co.uk/',
                        lat: 54.5973,
                        lon: -5.9301,
                        communitySize: 'Medium',
                        active: true
                    }
                ]
            }
        }
    }
};

// Flatten the data for easier searching
function getAllCommunities() {
    const allCommunities = [];
    
    Object.keys(ukCommunities).forEach(region => {
        Object.keys(ukCommunities[region].counties).forEach(cityKey => {
            const city = ukCommunities[region].counties[cityKey];
            city.groups.forEach(group => {
                allCommunities.push({
                    ...group,
                    city: city.name,
                    county: city.county,
                    region: ukCommunities[region].name
                });
            });
        });
    });
    
    return allCommunities;
}

// Get all regions for the map
function getAllRegions() {
    return Object.keys(ukCommunities).map(key => ({
        key: key,
        name: ukCommunities[key].name,
        counties: Object.keys(ukCommunities[key].counties).map(cityKey => ({
            key: cityKey,
            name: ukCommunities[key].counties[cityKey].name,
            county: ukCommunities[key].counties[cityKey].county
        }))
    }));
}
