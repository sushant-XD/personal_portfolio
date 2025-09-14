# Personal Portfolio

A modern, minimalist portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a dynamic JSON configuration system for easy content management.

## ✨ Features

- 🎨 **Minimal Design**: Clean black and white aesthetic with robotic typography
- 🌓 **Dark/Light Theme**: Toggle between themes with persistent storage
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🎯 **Interactive**: Hover effects, smooth scrolling, and project modals
- ⚙️ **Dynamic Configuration**: Edit all content through a single JSON file
- 🚀 **Performance**: Built with Next.js 15 for optimal loading speeds

## 🔧 Tech Stack

- **Framework**: Next.js 15.5.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Orbitron (robotic titles), JetBrains Mono (body text)
- **Deployment**: Vercel-ready

## 📝 Editing Your Portfolio

### Main Configuration File

All portfolio content is managed through the **`data/portfolio-config.json`** file. Simply edit this file to update your portfolio content.

### Content Sections

#### Personal Information
```json
"personal": {
  "name": "Your Name",
  "title": "Your Title",
  "location": "Your Location",
  "bio": "Brief description about yourself",
  "image": "/path/to/your/photo.jpg"
}
```

#### Education
```json
"education": [
  {
    "id": "1",
    "degree": "Your Degree",
    "school": "School Name",
    "date": "2018 - 2022",
    "description": "Description of your studies"
  }
]
```

#### Experience
```json
"experience": [
  {
    "id": "1",
    "title": "Job Title",
    "company": "Company Name",
    "date": "2022 - Present",
    "description": "Description of your role and achievements"
  }
]
```

#### Skills
```json
"skills": [
  {
    "id": "1",
    "category": "Technical Skills",
    "items": ["Skill 1", "Skill 2", "Skill 3"]
  }
]
```

#### Projects
```json
"projects": [
  {
    "id": 1,
    "title": "Project Name",
    "tech": "Technology Stack",
    "description": "Brief description",
    "fullDescription": "Detailed description for modal",
    "image": "/path/to/project/image.jpg",
    "features": ["Feature 1", "Feature 2"],
    "technologies": ["Tech 1", "Tech 2"],
    "links": [
      {"type": "GitHub", "url": "https://github.com/..."},
      {"type": "Live Demo", "url": "https://..."}
    ]
  }
]
```

#### Contact Information
```json
"contact": {
  "title": "Let's Connect",
  "description": "Your contact description",
  "email": "your@email.com",
  "phone": "+1 (555) 123-4567",
  "location": "Your City, State",
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "twitter": "https://twitter.com/yourusername"
  }
}
```

### Images

- Add your images to the `public/` directory
- Reference them in the JSON with paths like `/images/your-photo.jpg`
- Recommended image sizes:
  - Personal photo: 400x400px
  - Project images: 800x600px

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd personal_portfolio_vscode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Edit your content**
   - Update `data/portfolio-config.json` with your information
   - Add your images to the `public/` directory

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🎨 Customization

### Colors
The theme uses a minimal black and white color scheme. To customize:
- Edit colors in `app/globals.css`
- Modify Tailwind classes in components

### Typography
- **Titles**: Orbitron font for robotic aesthetic
- **Body**: JetBrains Mono for clean readability
- Change fonts in `app/layout.tsx`

### Layout
- Modify section layouts in `components/sections/`
- Adjust spacing and responsive breakpoints in component files

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Header, Footer, Theme toggle
│   ├── sections/          # Portfolio sections
│   ├── ui/                # Reusable UI components
│   └── providers/         # React context providers
├── data/
│   └── portfolio-config.json  # Main configuration file
├── lib/
│   ├── portfolio-config.ts    # Data access utilities
│   └── utils.ts              # Helper functions
├── types/
│   └── portfolio.ts          # TypeScript interfaces
└── public/                   # Static assets
```

## 🔧 Development

### Adding New Sections
1. Create interface in `types/portfolio.ts`
2. Add data to `portfolio-config.json`
3. Create utility function in `lib/portfolio-config.ts`
4. Build component in `components/sections/`

### Styling Guidelines
- Use Tailwind utility classes
- Follow the established dark/light theme pattern
- Maintain the minimal aesthetic
- Use the robotic typography for consistency

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

This portfolio is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Deploy automatically on every push

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Need help?** The JSON structure is fully typed with TypeScript, so your editor will provide autocomplete and error checking when editing the configuration file.