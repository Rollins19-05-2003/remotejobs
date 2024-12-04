# RemoteJobs - Next Generation Job Listing Platform

A modern, responsive job listing platform built with Next.js that transforms legacy HTML job data into an intuitive search experience.

## 🚀 Features

### Core Functionality

#### 1. HTML Parsing & Data Extraction
- Implemented `cheerio` for robust HTML parsing
- Custom data extraction logic to handle various HTML structures
- Error boundary implementation for graceful handling of malformed data
- Structured data extraction for:
  - Job titles
  - Company details
  - Salary ranges
  - Locations
  - Tags/Skills

#### 2. User Interface
- Pixel-perfect implementation matching Figma designs
- Responsive layout using Tailwind CSS
- Mobile-first approach with breakpoint optimization
- Advanced filtering system with:
  - Keyword search
  - Location filter
  - Salary range filter
  - Tag-based filtering

#### 3. State Management & Data Fetching
- Implemented React Query for:
  - Efficient data fetching
  - Automatic background refreshes
  - Optimistic updates
  - Cache management
  - Infinite scroll pagination
  - Loading states handling

#### 4. Search & Filtering
- Keyword-based matching across:
  - Job titles
  - Company names
  - Descriptions
  - Tags
- Location-based filtering with geocoding support
- Salary range filtering with normalized data

#### 5. Infinite Scroll
- Implemented using `react-infinite-scroll-component`
- Seamless pagination with React Query
- Maintains filter state during scrolling
- Optimized performance with windowing

### Extended Features

1. **User Feedback**
   - Toast notifications using `react-hot-toast`
   - Loading states

2. **Location Detection**
   - IP-based location detection
   - Geolocation API integration
   - Priority sorting for local jobs

3. **Job Bookmarking**
   - LocalStorage implementation
   - Persistent bookmarks
   - Quick access to saved jobs

## 🛠 Technical Stack

### Core Technologies
- **Next.js**: React framework for production
- **TypeScript**: Static typing and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework

### UI Components
- **Shadcn/ui**: Accessible component system

### State Management & Data Fetching
- **React Query**: Server state management
- **Axios**: HTTP client

### Utilities
- **Cheerio**: HTML parsing
- **date-fns**: Date manipulation
- **lodash**: Utility functions

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Installation
```bash
# Clone repository
git clone https://github.com/Rollins19-05-2003/remotejobs.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Deployment

The application is deployed on Vercel with the following configuration:

1. Connect your GitHub repository to Vercel
2. Deploy with automatic CI/CD

Live Demo: [https://debjoblisting.vercel.app/](https://debjoblisting.vercel.app/)

## 🏗 Frontend Architecture

### Directory Structure
```
src/
├── app/
│    ├── api/
│       ├── location/
│       └── jobs/
├── components/
│    ├── ui/
├── hooks/
├── lib/
├── public/
├── types/
└── utils/
```

### Data Flow
1. API requests handled by axios
2. HTML parsing through Cheerio
3. State management with React Query
4. Component rendering with proper memoization

## 🔮 Future Improvements
1. **Performance Optimization**
   - Optimize bundle size

2. **Feature Enhancements**
   - Advanced search filters
   - User accounts
   - Job application tracking
   - Email notifications

3. **Technical Improvements**
   - E2E testing

4. **UI/UX Enhancements**
   - Custom theme support
   - More interactive elements
   - Enhanced mobile experience