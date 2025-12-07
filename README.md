# UK Fur Network - Interactive Community Hub

A modern, fully-featured website showcasing furry communities across the United Kingdom. Built with Tailwind CSS, vanilla JavaScript, and designed for GitHub Pages hosting.

##  Features
 **Interactive UK Map** - Clickable regions to browse communities by area
 **Regional Community Hubs** - Organized by counties and cities
 **Individual Group Pages** - Detailed information about each community
 **Telegram Integration** - Direct links to community Telegram groups with QR codes
 **Search Functionality** - Find communities by name, city, or county
 **Mobile Responsive** - Perfect on phones, tablets, and desktops
 **Modern Design** - Built with Tailwind CSS for a professional look
 **GitHub Pages Compatible** - Deploy directly from your repo
 **Fully Static** - No backend required, all JavaScript

##  File Structure

```
ukfurnetwork/
├── index.html           # Home page with interactive map
├── about.html          # About Us page
├── group.html          # Dynamic group detail pages
├── styles.css          # Custom CSS (supplements Tailwind)
├── script.js           # Mobile menu & shared functionality
├── js/
│   ├── data.js         # Community database
│   ├── map.js          # Interactive map logic
│   └── main.js         # Core JavaScript utilities
└── README.md           # This file
```

##  Getting Started

### 1. View Locally
Simply open `index.html` in your browser to see the website in action.

### 2. Deploy to GitHub Pages

1. Push the repository to GitHub
2. Go to Settings → Pages
3. Select `main` branch as the source
4. Save and your site will be live at `https://yourusername.github.io/ukfurnetwork`

##  Adding/Editing Communities

All community data is stored in `js/data.js`. To add or modify communities:

1. Open `js/data.js`
2. Locate the relevant region and county
3. Add/edit group objects with this structure:

```javascript
{
    id: 'unique-id',
    name: 'Community Name',
    description: 'A brief description of the community...',
    telegramLink: 'https://t.me/groupname',
    members: 100,
    active: true
}
```

**Important**: Keep the `id` field unique as it's used for linking to group pages.

##  Customization

### Colors
The website uses Tailwind CSS with a purple/indigo color scheme:
- Primary: `#a855f7` (Purple)
- Secondary: `#6366f1` (Indigo)
- Accent: `#10b981` (Green)

To change colors, edit the Tailwind classes in HTML files or customize in `styles.css`.

### Content
- **Home Page**: Edit `index.html` hero section
- **About Page**: Edit `about.html` with your mission/values
- **Communities**: Edit `js/data.js` to add/remove communities

##  Supported Regions

The website includes communities across:
- **Scotland** (Glasgow, Edinburgh, Aberdeen)
- **Wales** (Cardiff, Swansea)
- **England Midlands** (Birmingham, Wolverhampton, Coventry, Nottingham, Leicester, Stoke)
- **England North** (Manchester, Leeds, Sheffield, Liverpool, Newcastle)
- **England South** (London, Brighton, Southampton, Exeter, Bristol)
- **England East** (Norwich, Cambridge, Peterborough)

##  How It Works

1. **Interactive Map**: Users click regions on the SVG map
2. **Regional View**: Shows all cities/counties in that region
3. **City View**: Lists all community groups in a city
4. **Group Detail Page**: Full information about a specific community with:
   - Description
   - Member count
   - Telegram join link
   - QR code for easy mobile access
   - Related groups in the same area
   - Share buttons

##  Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling
- **Vanilla JavaScript** - No dependencies
- **Font Awesome 6** - Icon library
- **QR Server API** - Dynamic QR code generation

##  Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

##  Contributing

To contribute communities or improvements:

1. Add/edit communities in `js/data.js`
2. Test locally by opening `index.html`
3. Submit changes

##  License

This project is open for use by the UK furry community.

##  Features Demo

- Click the UK map to explore regions
- Search for communities by name, city, or county
- Click any community card to see full details
- Use QR code on group pages to join Telegram
- Share community pages with friends
- Mobile-friendly interface for on-the-go browsing

---

**Created with ❤️ for the UK furry community**

## Performance

The website is optimized for:
- Fast loading times
- Mobile performance
- SEO best practices
- Accessibility



