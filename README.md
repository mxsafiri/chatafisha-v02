# Chatafisha Impact Portal 🌱

A modern web platform connecting impact-makers with funders and verifiers for sustainable community projects, built with Next.js 14, TypeScript, and Tailwind CSS.

## Overview

Chatafisha Impact Portal is designed to bridge the gap between community-driven environmental initiatives and potential funders while ensuring transparency through verified impact data. The platform focuses on waste management, environmental conservation, and community engagement projects across East Africa.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: 
  - [Radix UI](https://www.radix-ui.com/)
  - [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Fonts**: 
  - Inter (Primary)
  - Urbanist (Display)

## Features Implemented

### Core Features
- 🎨 Modern, animated UI with dark/light mode support
- 📱 Fully responsive design
- 🔍 Project search and filtering
- 📊 Impact metrics visualization
- 💰 Funding progress tracking
- ✅ Project verification status

### Components
- **Layouts**
  - Site Header
  - Main Navigation
  - User Navigation
- **UI Components**
  - Button
  - Input
  - Card
  - Avatar
  - Badge
  - Progress Bar
  - Dropdown Menu
  - Toast Notifications
- **Impact Components**
  - Impact Project Cards
  - Project Search
  - Project Grid

## Project Structure

```
chatafisha-v2/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with providers
│   │   ├── page.tsx          # Landing page
│   │   └── impact-explorer/  # Impact projects exploration
│   ├── components/
│   │   ├── layouts/         # Layout components
│   │   ├── impact/          # Impact-specific components
│   │   ├── providers/       # Context providers
│   │   ├── shared/          # Shared components
│   │   └── ui/             # UI components
│   ├── lib/
│   │   ├── data/           # Mock data
│   │   └── utils.ts        # Utility functions
│   ├── styles/
│   │   └── globals.css     # Global styles
│   └── types/
│       └── index.ts        # TypeScript types
└── public/
    └── images/            # Static images
```

## Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/chatafisha-v2.git
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   cd chatafisha-v2
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open [http://localhost:3000](http://localhost:3000)**

## Roadmap

### Immediate Next Steps
- [ ] Implement individual project detail pages
- [ ] Add filtering by SDG goals and location
- [ ] Create user profile pages
- [ ] Implement authentication system
- [ ] Add project creation workflow

### Future Enhancements
- [ ] Integration with blockchain for impact verification
- [ ] Real-time notifications system
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Shadcn UI for beautiful component templates
- All contributors and supporters of the project

---

Made with ♥️ by the Chatafisha team
