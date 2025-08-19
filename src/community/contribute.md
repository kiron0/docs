# Contributing to NullScript Docs

> **Help improve NullScript documentation and make it better for everyone!**

Thank you for your interest in contributing to NullScript documentation! This guide covers how to contribute to the [docs repository](https://github.com/nullscript-lang/docs) specifically.

## What We're Looking For

### Documentation Improvements
- **Grammar and spelling fixes** - Typos, unclear sentences, formatting issues
- **Content clarity** - Making explanations more understandable
- **Code examples** - Better, more comprehensive examples
- **Missing information** - Filling gaps in documentation
- **Structure improvements** - Better organization and navigation

### New Content
- **Additional examples** - Real-world use cases and patterns
- **Tutorials** - Step-by-step guides for specific topics
- **Best practices** - Coding standards and recommendations
- **Troubleshooting guides** - Common problems and solutions
- **Migration guides** - Moving from JavaScript to NullScript

### Technical Improvements
- **Better navigation** - Improved sidebar and search
- **Code highlighting** - Syntax highlighting improvements
- **Interactive elements** - Better playground integration
- **Performance** - Faster loading and better UX

## Getting Started

### Prerequisites
- Basic knowledge of Markdown
- Understanding of NullScript syntax
- Git and GitHub experience (helpful but not required)

### Setup Steps

1. **Fork the repository**
   ```bash
   # Go to https://github.com/nullscript-lang/docs
   # Click "Fork" button
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/docs.git
   cd docs
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - You should see the documentation site

## Making Changes

### File Structure
```
src/
├── guide/           # Tutorials and guides
├── reference/       # API reference and syntax
├── examples/        # Code examples
├── community/       # Community resources
└── index.md         # Homepage
```

### Writing Guidelines

#### 1. **Markdown Formatting**
```markdown
# Main Heading (H1)
## Section Heading (H2)
### Subsection (H3)

> **Important Note**: Use blockquotes for important information

**Bold text** for emphasis
*Italic text* for subtle emphasis

- Bullet points for lists
- Another bullet point

1. Numbered lists
2. For step-by-step instructions
```

#### 2. **Code Examples**
```markdown
```javascript
// Use the nullscript language tag for syntax highlighting
run greet(name) {
    speak.say(`Hello, ${name}!`);
}
```

```javascript
// Use javascript for comparison examples
function greet(name) {
    console.log(`Hello, ${name}!`);
}
```
```

#### 3. **Links and Navigation**
```markdown
[Link Text](../path/to/file.md)
[External Link](https://example.com)

<!-- Internal links should be relative -->
[Getting Started](../guide/getting-started.md)
[Examples](../examples/basic.md)
```

#### 4. **Images and Assets**
```markdown
![Alt Text](../public/image.png)

<!-- Place images in public/ directory -->
<!-- Use descriptive alt text for accessibility -->
```

### Content Standards

#### **Be Clear and Concise**
- Write in simple, direct language
- Avoid jargon when possible
- Use active voice ("Click the button" not "The button should be clicked")

#### **Provide Examples**
- Every concept should have at least one example
- Include both simple and complex examples
- Show real-world use cases

#### **Keep It Updated**
- Ensure examples work with current NullScript version
- Update when language features change
- Test code examples regularly

#### **Be Inclusive**
- Use inclusive language
- Provide examples that appeal to diverse audiences
- Consider different skill levels

## Development Workflow

### 1. **Create a Feature Branch**
```bash
git checkout -b docs/your-feature-name
```

### 2. **Make Your Changes**
- Edit files in your preferred editor
- Test locally with `npm run dev`
- Ensure proper formatting and links

### 3. **Test Your Changes**
```bash
# Build the site to check for errors
npm run build

# Check for broken links
npm run check-links

# Validate markdown
npm run lint
```

### 4. **Commit Your Changes**
```bash
git add .
git commit -m "docs: improve async patterns guide

- Add more real-world examples
- Fix typos and improve clarity
- Add troubleshooting section"
```

### 5. **Push and Create PR**
```bash
git push origin docs/your-feature-name
# Go to GitHub and create Pull Request
```

## Pull Request Guidelines

### PR Title Format
```
docs: brief description of changes
```

Examples:
- `docs: add advanced class patterns guide`
- `docs: fix typos in getting started guide`
- `docs: improve module system examples`

### PR Description Template
```markdown
## What does this PR do?
Brief description of changes

## Changes Made
- [ ] Added new guide for X
- [ ] Fixed typos in Y
- [ ] Improved examples in Z

## Testing
- [ ] Built site locally
- [ ] Checked all links work
- [ ] Verified examples are correct

## Screenshots (if applicable)
Add screenshots for visual changes

## Related Issues
Closes #123
```

### Review Process
1. **Automated Checks** - CI will run tests
2. **Code Review** - Maintainers will review your changes
3. **Feedback** - Address any requested changes
4. **Merge** - Once approved, your changes will be merged!

## Style Guide

### Writing Style
- **Tone**: Friendly, encouraging, but professional
- **Audience**: Developers of all skill levels
- **Language**: Clear, concise, and inclusive

### Code Style
- **Examples**: Should be copy-paste ready
- **Comments**: Explain complex logic
- **Naming**: Use descriptive variable names
- **Formatting**: Follow consistent indentation

### Documentation Structure
- **Start Simple**: Begin with basic concepts
- **Build Complexity**: Gradually introduce advanced topics
- **Cross-Reference**: Link related concepts
- **Examples First**: Show before telling

## Common Issues and Solutions

### Broken Links
```bash
# Check for broken links
npm run check-links

# Fix internal links
# Use relative paths: ../guide/getting-started.md
# Not absolute: /guide/getting-started.md
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules
npm install
npm run build
```

### Markdown Linting
```bash
# Fix markdown issues
npm run lint:fix

# Check specific file
npm run lint src/guide/example.md
```

### VitePress Issues
```bash
# Check VitePress configuration
npm run dev

# Look for errors in terminal output
# Common issues: invalid frontmatter, broken imports
```

## Testing Your Changes

### Local Testing Checklist
- [ ] Site builds without errors
- [ ] All links work correctly
- [ ] Code examples are syntactically correct
- [ ] Images display properly
- [ ] Navigation works as expected
- [ ] Search functionality works
- [ ] Mobile responsiveness is good

### Content Review Checklist
- [ ] Grammar and spelling are correct
- [ ] Examples are clear and helpful
- [ ] Information is accurate and up-to-date
- [ ] Tone is appropriate and consistent
- [ ] Links are relevant and working

## Recognition

### Contributors Hall of Fame
- **Documentation Champions** - Top contributors to docs
- **Example Masters** - Best code examples
- **Grammar Guardians** - Spelling and clarity improvements
- **Structure Sages** - Organization and navigation improvements

### How to Get Recognized
- **Consistent contributions** - Regular, quality improvements
- **Helpful feedback** - Constructive comments on PRs
- **Community support** - Help other contributors
- **Innovation** - Suggest and implement new ideas

## Learning Resources

### Markdown Resources
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Markdown](https://docs.github.com/en/github/writing-on-github)
- [VitePress Markdown](https://vitepress.dev/guide/markdown)

### NullScript Resources
- [Language Reference](../reference/syntax.md)
- [Examples](../examples/basic.md)
- [Playground](../playground.md)
- [Advanced Async Patterns](../guide/async-patterns.md)
- [Module System](../guide/modules.md)
- [Class System](../guide/classes.md)
- [FAQ](../community/faq.md)

### Documentation Best Practices
- [Write the Docs](https://www.writethedocs.org/)
- [Google Developer Documentation Style Guide](https://developers.google.com/style)
- [Microsoft Writing Style Guide](https://docs.microsoft.com/style-guide/)

## Community Guidelines

### Be Respectful
- Treat all contributors with respect
- Provide constructive feedback
- Assume good intentions

### Be Helpful
- Answer questions when you can
- Share knowledge and resources
- Mentor new contributors

### Be Patient
- Learning takes time
- Everyone makes mistakes
- Improvement is a journey

## Getting Help

### When You're Stuck
1. **Check existing issues** - Your question might already be answered
2. **Search documentation** - Look for similar examples
3. **Ask in discussions** - Use GitHub Discussions
4. **Join Discord** - Real-time help from community

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Discord**: Real-time chat and support
- **Email**: For sensitive or private matters

## Contribution Ideas

### Beginner-Friendly
- Fix typos and grammar
- Improve existing examples
- Add missing alt text to images
- Update outdated information

### Intermediate
- Write new guides
- Create comprehensive examples
- Improve navigation structure
- Add cross-references

### Advanced
- Design new documentation features
- Implement automation tools
- Create interactive tutorials
- Optimize build performance

## Next Steps

1. **Choose an issue** from the [GitHub Issues](https://github.com/nullscript-lang/docs/issues)
2. **Fork and clone** the repository
3. **Make your changes** following this guide
4. **Test thoroughly** before submitting
5. **Create a PR** with clear description
6. **Respond to feedback** and iterate

---

**Ready to contribute?** Start with a small change and work your way up! Every contribution, no matter how small, makes NullScript documentation better for everyone.

**Questions?** Open a [GitHub Discussion](https://github.com/nullscript-lang/docs/discussions) or join our [Discord community](https://discord.gg/nullscript)!
