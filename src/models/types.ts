
// User-related types
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
    behance?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Portfolio-related types
export interface Portfolio {
  id: string;
  userId: string;
  title: string;
  description?: string;
  themeId: string; // Corresponding to the theme selected
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
  };
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
    behance?: string;
  };
  skills?: string[]; // Array of skill names
  createdAt: string;
  updatedAt: string;
}

// Case Study-related types
export interface CaseStudy {
  id: string;
  userId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  gallery?: string[]; // Array of image URLs
  tags?: string[];
  projectOverview?: string;
  timeline?: TimelineItem[];
  tools?: string[];
  outcomes?: {
    metrics?: string[];
    testimonials?: Testimonial[];
  };
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  position?: string;
  avatar?: string;
}

// Analytics-related types
export interface PortfolioAnalytics {
  id: string;
  userId: string;
  totalVisits: number;
  uniqueVisitors: number;
  averageTimeOnSite: number;
  popularPages: PageAnalytics[];
  visitsOverTime: TimeSeriesData[];
  lastUpdated: string;
}

export interface CaseStudyAnalytics {
  id: string;
  caseStudyId: string;
  userId: string;
  views: number;
  uniqueVisitors: number;
  averageTimeOnPage: number;
  clicks: number;
  clicksOverTime: TimeSeriesData[];
  viewsOverTime: TimeSeriesData[];
  lastUpdated: string;
}

export interface PageAnalytics {
  path: string;
  title: string;
  views: number;
  uniqueVisitors: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}
