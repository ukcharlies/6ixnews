# 6ixNews - Modern News/Blog Platform

## Overview

6ixNews is a modern, TypeScript-based news platform built with Next.js 13+ and React 18+. It offers category-based content organization, story management, and a responsive design optimized for all devices.

## Features 🚀

### Content Management

- Category-based story organization
- Dynamic content filtering
- Featured stories section
- Editor's picks showcase
- Bookmarking functionality
- Story pagination

### User Experience

- Responsive design for all devices
- Image optimization
- Reading time estimates
- Smart content truncation
- Date formatting
- Mobile-friendly category navigation

## Technical Architecture 🏗️

### Core Technologies

- Next.js 13+ - Frontend framework
- React 18+ - UI library
- TypeScript - Programming language
- Tailwind CSS - Styling
- Redux Toolkit - State management

### API Endpoints

| Endpoint               | Description                   |
| ---------------------- | ----------------------------- |
| GET /api/stories       | Retrieve all stories          |
| GET /api/categories    | Fetch available categories    |
| GET /api/stories/{id}  | Get specific story details    |
| GET /api/category/{id} | Get category-specific stories |

### Key Components

1. **CategoryNav**

   - Category selection handling
   - Navigation menu display
   - Active state management

2. **StoryContent**

   - Story rendering
   - Date formatting
   - Interaction management (bookmarks/sharing)

3. **EditorsPicksSection**
   - Curated content display
   - Pagination implementation
   - Loading state management

## Getting Started 🚦

1. **Clone Repository**

# News/Blog Web Application

```bash
git clone https://github.com/yourusername/6ixnews.git
cd 6ixnews
```

2. **Install Dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure Environment**

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. **Run Development Server**

```bash
npm run dev
# or
yarn dev
```

## Project Structure 📁

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── CategoryNav/
│       └── StoryContent/
├── lib/
│   └── store/
├── pages/
└── types/
```

## Component Usage 💻

### CategoryNav

```typescript
<CategoryNav
  categories={categories}
  onSelect={(id) => handleCategorySelect(id)}
  activeCategory={currentCategory}
/>
```

### StoryContent

```typescript
<StoryContent story={storyData} showImage={true} truncateLength={200} />
```

## State Management 🔄

```typescript
// Example Redux slice
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.list = action.payload;
    },
  },
});
```

```typescript
interface Story {
  id: number;
  title: string;
  content: string;
  image_url: string;
  category: Category;
  created_at: string;
}

interface Category {
  id: number;
  name: string;
  category_name: string;
}
```

## Contributing 🤝

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## License 📝

MIT License - See LICENSE file

A modern news/blog platform built with Next.js, React, and TypeScript, featuring category-based content organization, story management, and a responsive user interface.

## Project Overview

This application serves as a content management and delivery platform that allows users to browse stories across different categories, bookmark articles, and enjoy a seamless reading experience.

## Tech Stack

- **Frontend Framework**: Next.js 13+
- **UI Library**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux (with Redux Toolkit)

## Project Structure

```plaintext
src/
├── components/
│   ├── layout/          # Core layout components
│   │   ├── Header.tsx   # Main navigation header
│   │   └── Footer.tsx   # Site footer
│   └── sections/        # Feature-specific components
│       ├── CategoryNav.tsx     # Category navigation
│       └── StoryContent.tsx    # Story display component
├── lib/
│   └── store/          # Redux store configuration
│       ├── bookmarkSlice.ts    # Bookmark functionality
│       └── categorySlice.ts    # Category management
├── pages/             # Next.js pages
└── types/            # TypeScript type definitions
```
