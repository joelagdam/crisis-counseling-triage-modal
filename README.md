# Interactive Triage Modal for Crisis-Informed Counseling

A standalone, accessible modal component that enables users to find relevant crisis support contacts in under 3 clicks without page reloads. Designed with calming aesthetics and full WCAG 2.1 AA compliance for high-stress situations.

## 🚀 **Live Demo

**View the live demo**: [https://joelagdam.github.io/crisis-counseling-triage-modal/](https://joelagdam.github.io/crisis-counseling-triage-modal/)

## ⚡ Quick Start

### Option 1: Clone and Run Locally

```bash
# Clone the repository
git clone https://github.com/joelagdam/crisis-counseling-triage-modal.git

# Navigate to the project directory
cd crisis-counseling-triage-modal

# Start a local server
python -m http.server 8000
# OR use Node.js
npx serve .

# Open in browser
# Visit http://localhost:8000
```

### Option 2: Direct Download

1. [Download ZIP](https://github.com/joelagdam/crisis-counseling-triage-modal/archive/refs/heads/main.zip)
2. Extract the files
3. Open `index.html` in your web browser

## 📁 Project Structure

```
crisis-counseling-triage-modal/
├── index.html              # Main page with trigger button
├── css/
│   ├── main.css           # Global styles and design system
│   └── modal.css          # Modal-specific styles
├── js/
│   ├── modal-core.js      # Modal open/close/focus management
│   └── triage-flow.js     # State management and flow logic
├── .gitignore             # Git ignore file
├── LICENSE                # MIT License
└── README.md              # This file
```

## Triage Flow

The modal guides users through a simple 3-step process:

1. **Resource Type**: Choose between national hotlines or local resources
2. **Concern Type**: Select from crisis, burnout, or general support
3. **Contact Method**: Prefer phone call or text message

Users can navigate back at any time and see relevant resources based on their selections.

## Accessibility Features

- **Keyboard Navigation**: Tab, Shift+Tab, Enter, Space, and Escape keys
- **Screen Reader Support**: ARIA labels, live regions, and announcements
- **Focus Management**: Focus trapped within modal, returns to trigger on close
- **High Contrast**: Supports high contrast mode preferences
- **Reduced Motion**: Respects user's motion preferences

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari/Chrome

## Performance

- Modal opens in < 300ms
- Step transitions in < 200ms
- Total bundle size < 50KB
- No memory leaks with proper event listener cleanup

## Customization

### Colors

Edit the CSS custom properties in `css/main.css`:

```css
:root {
    --primary: #2D5D7C;          /* Main buttons, accents */
    --secondary: #4A786E;        /* Hover states */
    --background: #F5F9FC;       /* Modal background */
    --surface: #FFFFFF;          /* Card backgrounds */
    --text-primary: #1A3B5D;     /* Headings */
    --text-secondary: #5A7289;   /* Body text */
    --focus: #E76F51;            /* Focus rings */
}
```

### Resources

Update the resource data in `js/triage-flow.js`:

```javascript
this.resources = {
    national: {
        phone: {
            number: "988",
            label: "Suicide & Crisis Lifeline",
            hours: "24/7"
        }
        // ... more resources
    }
    // ... more resource categories
};
```

### Questions

Modify the triage questions in `js/triage-flow.js`:

```javascript
this.questions = {
    1: {
        text: "What type of support are you looking for?",
        options: [
            {
                value: 'national',
                icon: '🇺🇸',
                title: 'National Hotline',
                description: '24/7 crisis support'
            }
            // ... more options
        ]
    }
    // ... more questions
};
```

## Integration

To embed this modal in an existing website:

1. Copy the CSS files to your project
2. Copy the JavaScript files to your project
3. Add the modal HTML to your page
4. Include the CSS and JavaScript files:

```html
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/modal.css">
<script src="js/modal-core.js"></script>
<script src="js/triage-flow.js"></script>
```

## Deployment

### Netlify

1. Push to GitHub repository
2. Connect to Netlify
3. Deploy automatically

### Vercel

1. Push to GitHub repository
2. Import to Vercel
3. Deploy automatically

### GitHub Pages

1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select main branch as source

## Testing

### Manual Testing Checklist

- [ ] Modal opens/closes correctly
- [ ] All 7 triage paths work
- [ ] Back navigation functions properly
- [ ] Copy to clipboard works
- [ ] Escape key closes modal
- [ ] Click outside closes modal
- [ ] Keyboard navigation complete
- [ ] Screen reader announcements work
- [ ] Mobile responsive design
- [ ] Reduced motion respected

### Automated Testing

Run Lighthouse audit for performance and accessibility:

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:8000 --output html --output-path ./lighthouse-report.html
```

## Security Considerations

- No user data is stored or transmitted
- No external API calls
- No authentication required
- All resources are static
- Safe for CSP (Content Security Policy)

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support regarding this implementation:

- Create an issue in the repository
- Contact The Pivot Point Counseling Collective
- Review the documentation above

## Emergency

If you are in immediate crisis, please call 911 or contact your local emergency services.

---

**Note**: This tool is designed to help users find appropriate resources but is not a substitute for professional medical advice or emergency services.
