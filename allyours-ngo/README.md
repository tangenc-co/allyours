# Allyours NGO - Landing Site

A modern, responsive landing page for Allyours NGO built with Next.js, TypeScript, and Tailwind CSS.

## About Allyours NGO

Allyours NGO is dedicated to [mission statement]. This landing site serves as the primary web presence for the organization, showcasing our programs, impact, and ways to get involved.

## Features

- 🎨 **Modern Design**: Clean, professional design optimized for NGOs
- 📱 **Responsive**: Fully responsive design that works on all devices
- ⚡ **Fast Performance**: Built with Next.js for optimal loading speeds
- ♿ **Accessible**: WCAG compliant design for all users
- 🔍 **SEO Optimized**: Built-in SEO features for better discoverability
- 🎯 **Conversion Focused**: Designed to encourage donations and volunteer sign-ups

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd allyours-ngo
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
allyours-ngo/
├── src/
│   ├── app/                 # App Router pages
│   ├── components/          # Reusable components
│   ├── lib/                # Utility functions
│   └── styles/             # Global styles
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
└── package.json           # Dependencies and scripts
```

## Key Pages

- **Home**: Main landing page with hero section and key information
- **About**: Organization mission, vision, and team
- **Programs**: Current initiatives and projects
- **Impact**: Success stories and metrics
- **Get Involved**: Donation and volunteer opportunities
- **Contact**: Contact information and form

## Customization

### Content Updates

- Update content in the respective page components
- Modify images in the `public/` directory
- Update contact information and social media links

### Styling

- Customize colors in `tailwind.config.js`
- Modify global styles in `src/app/globals.css`
- Update component-specific styles as needed

### Configuration

- Update `next.config.js` for additional Next.js configuration
- Modify `package.json` for dependencies and scripts

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

- **Netlify**: Use the Next.js build command
- **AWS Amplify**: Configure build settings for Next.js
- **Self-hosted**: Build with `npm run build` and serve with `npm start`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, email [contact@allyoursngo.org] or create an issue in this repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for Allyours NGO
