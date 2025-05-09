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
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod)
- **Authentication**: [Thirdweb](https://thirdweb.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query/latest)
- **Charts**: [Recharts](https://recharts.org/)
- **Fonts**: Inter (Primary), Urbanist (Display)

## Features Implemented

### Pages
- ✅ **Home Page** (/) - Landing page with key features
- ✅ **About Page** (/about) - Mission and values
- ✅ **Impact Explorer** (/impact-explorer) - Projects listing with filtering
- ✅ **Project Detail** (/impact/[id]) - Individual project view
- ✅ **Submit Project** (/submit-project) - Project submission form
- ✅ **Authentication Pages**:
  - ✅ Login (/login)
  - ✅ Register (/register)
  - ✅ Reset Password (/reset-password)
- 🟨 **Profile Page** (/profile/[id]) - In progress
- 🟨 **Dashboard** (/dashboard) - In progress

### Core Features
- ✅ **Modern UI**: Dark/light mode, responsive design, animations
- ✅ **Project Filtering**: Filter by impact type, SDG goals, status
- ✅ **View Options**: Grid/List view toggle
- ✅ **Impact Metrics**: Visualization of environmental and social impact
- ✅ **Authentication**: User login, registration, and password reset
- ✅ **Form Validation**: Comprehensive form validation with Zod
- ✅ **Error Handling**: Global error page and component error boundaries
- ✅ **Loading States**: Global loading page and component loading states

### Components
- **UI Components**:
  - Complete Shadcn UI component library
  - Custom form elements
  - Skeleton loaders
  - Toast notifications
  - Modals and dialogs
  - Tabs and navigation
- **Feature Components**:
  - Filter dialog with SDG goals selection
  - Impact metrics visualization
  - Project cards with progress indicators
  - Verification status badges
  - Profile overview with metrics

### Data & Type System
- ✅ **TypeScript Types**: Comprehensive type definitions for all entities
- ✅ **Zod Schemas**: Form validation schemas
- ✅ **Mock Data**: Realistic data for development
- ✅ **Dynamic Impact Metrics**: Flexible metrics system with validation

## Project Structure

```
chatafisha-v2/
├── src/
│   ├── app/                # Next.js app router pages
│   │   ├── about/           # About page
│   │   ├── dashboard/       # Dashboard pages
│   │   ├── impact/          # Project pages
│   │   ├── impact-explorer/ # Projects listing
│   │   ├── login/           # Authentication
│   │   ├── profile/         # User profiles
│   │   ├── submit-project/  # Project submission
│   │   ├── error.tsx        # Global error page
│   │   ├── loading.tsx      # Global loading state
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/
│   │   ├── auth/            # Authentication components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── error/           # Error handling components
│   │   ├── forms/           # Form components
│   │   ├── impact/          # Impact-related components
│   │   ├── layouts/         # Layout components
│   │   ├── profile/         # Profile components
│   │   ├── project/         # Project components
│   │   ├── shared/          # Shared components
│   │   ├── ui/              # UI components (Shadcn)
│   │   └── verify/          # Verification components
│   ├── context/             # React context providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   ├── config/          # Configuration
│   │   ├── data/            # Mock data
│   │   ├── firebase/        # Firebase integration
│   │   ├── thirdweb/        # Thirdweb authentication
│   │   ├── validations/     # Zod validation schemas
│   │   └── utils.ts         # Utility functions
│   ├── middleware.ts        # Next.js middleware
│   ├── providers/           # Provider components
│   ├── styles/              # Global styles
│   └── types/               # TypeScript types
└── public/
    └── images/              # Static images
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chatafisha-v2.git
   ```

2. **Install dependencies**
   ```bash
   cd chatafisha-v2
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
   NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN=your_auth_domain
   THIRDWEB_SECRET_KEY=your_thirdweb_secret_key
   AUTH_PRIVATE_KEY=your_auth_private_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Development Strategy

The project follows a frontend-first approach:
- Building complete UI/UX without backend dependencies
- Implementing comprehensive form validation and type safety
- Using placeholder data and mock responses
- Structuring components to be backend-ready

## Current Status and Roadmap

### Completed
- ✅ UI component library and design system
- ✅ Project listing with filtering and view options
- ✅ Authentication components and forms
- ✅ Dynamic impact metrics system
- ✅ Project submission workflow
- ✅ Basic page structure and navigation

### In Progress
- 🟨 User profiles and dashboard
- 🟨 Verification system implementation
- 🟨 Complete authentication flow

### Next Priority Items
1. **Complete Core Pages**:
   - Finalize profile and dashboard implementation
   - Add 404 and error pages
   - Create verification workflow UI

2. **Authentication & User Management**:
   - Complete Thirdweb integration
   - Implement protected routes
   - Add user settings

3. **Enhanced User Experience**:
   - Add search functionality
   - Implement notifications system
   - Add loading skeletons for async operations

4. **Data Integration**:
   - Supabase integration for backend
   - Real data fetching
   - Image upload functionality

5. **Technical Improvements**:
   - Comprehensive error handling
   - Unit and E2E tests
   - Performance optimizations

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
