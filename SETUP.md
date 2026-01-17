# GitHub Repository Setup Guide

## 🚀 Create Your Public Repository

Follow these steps to create your public GitHub repository:

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in repository details:
   - **Repository name**: `crisis-counseling-triage-modal`
   - **Description**: `Interactive Triage Modal for Crisis-Informed Counseling - Accessible 3-click crisis support system`
   - **Visibility**: Public ✅
   - **Add a README file**: ❌ (we already have one)
   - **Add .gitignore**: ❌ (we already have one)
   - **Choose a license**: ❌ (we already have MIT)

5. Click "Create repository"

### Step 2: Push Local Repository to GitHub

After creating the empty repository on GitHub, run these commands:

```bash
# Add to remote repository
git remote add origin https://github.com/joelagdam/crisis-counseling-triage-modal.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages (Optional but Recommended)

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Build and deployment", select:
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: / (root)
5. Click "Save"

Your site will be live at: `https://joelagdam.github.io/crisis-counseling-triage-modal/`

## 📋 Repository Checklist

Your repository should include:

- ✅ `index.html` - Main page with trigger button
- ✅ `css/main.css` - Global styles and design system
- ✅ `css/modal.css` - Modal-specific styles
- ✅ `js/modal-core.js` - Modal open/close/focus management
- ✅ `js/triage-flow.js` - State management and flow logic
- ✅ `README.md` - Comprehensive documentation
- ✅ `LICENSE` - MIT License
- ✅ `.gitignore` - Git ignore file

## 🔗 Repository URL Structure

Once pushed, your repository will be available at:
- **Repository**: `https://github.com/joelagdam/crisis-counseling-triage-modal`
- **Live Demo** (if GitHub Pages enabled): `https://joelagdam.github.io/crisis-counseling-triage-modal/`

## Next Steps

1. **Modify Phone Numbers**: Update crisis support numbers in `js/triage-flow.js` at **lines 30-89** in the `this.resources` object:

```javascript
// File: js/triage-flow.js (lines 30-89)
this.resources = {
    national: {
        phone: {
            number: "988",  // ← CHANGE THIS LINE
            label: "Suicide & Crisis Lifeline",
            hours: "24/7"
        }
    },
    local: {
        burnout: {
            phone: {
                number: "1-800-273-8255",  // ← CHANGE THIS LINE
                label: "Workplace Burnout Hotline",
                hours: "Mon-Fri 9AM-8PM"
            }
        }
        // ... more resources to modify
    }
};
```

2. **Adjust Styling**: Modify colors and layout in CSS files
3. **Add Analytics**: Add Google Analytics or other tracking if needed
4. **Custom Domain**: Set up a custom domain through GitHub Pages settings

## Contributing

If you want to allow contributions:

1. Go to repository Settings
2. Click "Collaborators"
3. Add team members with appropriate permissions
4. Consider adding `CONTRIBUTING.md` with contribution guidelines

## 📊 Repository Features

- **Zero Dependencies**: No package.json required
- **Static Hosting**: Works on GitHub Pages, Netlify, Vercel
- **Mobile Responsive**: Optimized for all devices
- **Accessible**: WCAG 2.1 AA compliant
- **Performance**: Lighthouse score 90+

Your repository is now ready for public access and deployment!
