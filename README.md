# NullScript Documentation

This directory contains the documentation for the NullScript programming language, built with VitePress.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

#### Manual Deployment
```bash
# Build and deploy to GitHub Pages
npm run deploy
```

#### Automatic Deployment
The documentation is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

## 📁 Project Structure

```
docs/
├── .vitepress/
│   ├── config.ts          # VitePress configuration
│   └── dist/              # Built files (generated)
├── guide/                 # Getting started guides
├── examples/              # Code examples
├── reference/             # Language reference
├── cli/                   # CLI documentation
├── playground.md          # Interactive playground
├── index.md               # Home page
└── public/                # Static assets
    └── logo.png           # NullScript logo
```

## 🌐 Deployment Configuration

- **Base URL**: `/nullscript/`
- **GitHub Pages URL**: https://nullscript-lang.github.io/nullscript/
- **Build Output**: `.vitepress/dist/`

## 🔧 Configuration

### VitePress Config
- Logo and favicon configuration
- Navigation and sidebar setup
- Social links
- Base URL for GitHub Pages

### Package.json Scripts
- `dev`: Start development server
- `build`: Build for production
- `preview`: Preview production build
- `deploy`: Build and deploy to GitHub Pages

## 📝 Content Guidelines

### Markdown Files
- Use proper heading hierarchy
- Include code examples with syntax highlighting
- Add descriptive alt text for images
- Use VitePress components and features

### Code Examples
- Always show both NullScript and JavaScript versions
- Use proper syntax highlighting
- Include comments for clarity
- Test examples before publishing

## 🚀 Deployment Process

1. **Local Development**
   - Make changes to markdown files
   - Test locally with `npm run dev`
   - Build with `npm run build`

2. **GitHub Actions**
   - Push changes to `main` branch
   - GitHub Actions automatically builds and deploys
   - Site is available at https://nullscript-lang.github.io/nullscript/

3. **Manual Deployment** (if needed)
   - Run `npm run deploy`
   - This builds and pushes to `gh-pages` branch

## 🔍 Troubleshooting

### Build Issues
- Check for syntax errors in markdown files
- Ensure all links are valid
- Verify VitePress configuration

### Deployment Issues
- Check GitHub Actions logs
- Verify repository permissions
- Ensure `gh-pages` branch exists

### Local Development Issues
- Clear cache: `npm run clean`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## 📚 Resources

- [VitePress Documentation](https://vitepress.dev/)
- [GitHub Pages](https://pages.github.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
