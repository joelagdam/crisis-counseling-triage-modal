# crisis-counseling-triage-modal
Interactive Triage Modal for Crisis-Informed Counseling

A standalone, accessible modal component that enables users to find relevant crisis support contacts in under 3 clicks without page reloads. Designed with calming aesthetics and full WCAG 2.1 AA compliance for high-stress situations.

## 🚀 Live Demo

**View the live demo**: [https://joelagdam.github.io/crisis-counseling-triage-modal/](https://joelagdam.github.io/crisis-counseling-triage-modal/)

## ⚡ Quick Start

### Clone and Run Locally

```bash
git clone https://github.com/joelagdam/crisis-counseling-triage-modal.git
cd crisis-counseling-triage-modal
python -m http.server 8000
# Open http://localhost:8000
```

### Direct Download

[Download ZIP](https://github.com/joelagdam/crisis-counseling-triage-modal/archive/refs/heads/main.zip)

## 📁 Project Structure

```
crisis-counseling-triage-modal/
├── index.html              # Main page with trigger button
├── css/
│   ├── main.css           # Global styles
│   └── modal.css          # Modal styles
├── js/
│   ├── modal-core.js      # Modal logic
│   └── triage-flow.js     # Triage flow
└── README.md
```

## 🎯 Features

- **3-click maximum** to reach support resources
- **Fully accessible** with WCAG 2.1 AA compliance
- **Mobile responsive** with 44px touch targets
- **Copy to clipboard** for phone numbers
- **No external dependencies** - pure HTML/CSS/JavaScript
- **Calming design** with reduced motion support

## 🔄 Triage Flow

1. **Resource Type**: National hotlines or local resources
2. **Concern Type**: Crisis, burnout, or general support
3. **Contact Method**: Phone call or text message

## 🎨 Customization

### Update Resources

Edit `js/triage-flow.js`:

```javascript
this.resources = {
    national: {
        phone: {
            number: "988",
            label: "Suicide & Crisis Lifeline",
            hours: "24/7"
        }
    }
};
```

### Change Colors

Edit CSS variables in `css/main.css`:

```css
:root {
    --primary: #2D5D7C;          /* Main buttons */
    --secondary: #4A786E;        /* Hover states */
    --background: #F5F9FC;       /* Modal background */
    --text-primary: #1A3B5D;     /* Headings */
    --focus: #E76F51;            /* Focus rings */
}
```

## 🔧 Integration

Add to your website:

```html
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/modal.css">
<script src="js/modal-core.js"></script>
<script src="js/triage-flow.js"></script>
```

Copy the modal HTML from `index.html` and place the trigger button where needed.

## 📱 Browser Support

- Chrome (latest 2)
- Firefox (latest 2)
- Safari (latest 2)
- Edge (latest 2)
- Mobile browsers

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub
2. Enable Pages in repository settings
3. Select main branch source

### Netlify/Vercel

1. Connect repository
2. Deploy automatically

## 🧪 Testing Checklist

- [ ] Modal opens/closes correctly
- [ ] All triage paths work (7 combinations)
- [ ] Copy to clipboard functions
- [ ] Keyboard navigation complete
- [ ] Mobile responsive design
- [ ] Screen reader announcements work

## 📊 Performance

- **Modal opens**: < 300ms
- **Bundle size**: < 50KB
- **Lighthouse score**: ≥ 90
- **Zero console errors**

## 🔒 Security

- No user data stored/transmitted
- No external API calls
- Static files only
- CSP safe

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

## 🆘 Emergency

If in immediate crisis, call 911 or local emergency services.

---

**Note**: This tool helps users find resources but is not a substitute for professional medical advice.

## 📞 Support

Create an issue in the repository for questions or support.
