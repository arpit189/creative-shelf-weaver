
import { User, Portfolio, CaseStudy, PortfolioAnalytics, CaseStudyAnalytics } from "../models/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    username: "sarahdesigner",
    email: "sarah@example.com",
    name: "Sarah Johnson",
    bio: "UX/UI designer with 6+ years experience creating intuitive digital experiences",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    location: "San Francisco, CA",
    website: "https://sarahdesigns.co",
    social: {
      twitter: "sarahdesigns",
      linkedin: "sarahjohnson",
      dribbble: "sarahjdesigns"
    },
    createdAt: "2023-01-15T08:00:00Z",
    updatedAt: "2023-04-20T14:30:00Z"
  },
  {
    id: "user2",
    username: "mikecoder",
    email: "mike@example.com",
    name: "Mike Wilson",
    bio: "Frontend developer specializing in React and interactive web applications",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    location: "Austin, TX",
    website: "https://mikewilson.dev",
    social: {
      twitter: "mikedev",
      github: "mikewilson",
      linkedin: "mikewilson"
    },
    createdAt: "2023-02-10T10:15:00Z",
    updatedAt: "2023-05-05T09:45:00Z"
  }
];

// Mock Portfolios
export const mockPortfolios: Portfolio[] = [
  {
    id: "portfolio1",
    userId: "user1",
    title: "Sarah Johnson | UX/UI Designer",
    description: "Creating intuitive digital experiences through thoughtful design",
    themeId: "minimal",
    contact: {
      email: "hello@sarahdesigns.co",
      location: "San Francisco, CA"
    },
    social: {
      twitter: "sarahdesigns",
      linkedin: "sarahjohnson",
      dribbble: "sarahjdesigns"
    },
    skills: ["UX Design", "UI Design", "Wireframing", "Prototyping", "User Research", "Figma", "Adobe XD"],
    createdAt: "2023-01-20T12:00:00Z",
    updatedAt: "2023-05-15T16:20:00Z"
  },
  {
    id: "portfolio2",
    userId: "user2",
    title: "Mike Wilson | Frontend Developer",
    description: "Building performant, accessible, and beautiful web experiences",
    themeId: "bold",
    contact: {
      email: "mike@mikewilson.dev",
      location: "Austin, TX"
    },
    social: {
      twitter: "mikedev",
      github: "mikewilson",
      linkedin: "mikewilson"
    },
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS", "Node.js", "GraphQL", "CSS/SASS"],
    createdAt: "2023-02-12T14:30:00Z",
    updatedAt: "2023-04-28T11:15:00Z"
  }
];

// Mock Case Studies
export const mockCaseStudies: CaseStudy[] = [
  {
    id: "cs1",
    userId: "user1",
    title: "Redesigning the Mobile Banking Experience",
    slug: "mobile-banking-redesign",
    excerpt: "A comprehensive redesign of XYZ Bank's mobile app to improve usability and customer satisfaction",
    content: "Full case study content here...",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563986768711-250c60232091?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563986768494-4dee9219e1f7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563986768817-257bf91c5b9e?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["UX Design", "Mobile App", "Banking", "Fintech"],
    projectOverview: "XYZ Bank wanted to modernize their mobile banking application to improve user satisfaction and increase digital engagement. The existing app had poor ratings and users complained about confusing navigation and slow transaction processes.",
    timeline: [
      {
        id: "t1",
        title: "Research",
        description: "Conducted user interviews and analyzed competitor apps",
        date: "2023-01-05"
      },
      {
        id: "t2",
        title: "Wireframing",
        description: "Created low-fidelity wireframes for key user flows",
        date: "2023-01-20"
      },
      {
        id: "t3",
        title: "Visual Design",
        description: "Developed high-fidelity mockups and design system",
        date: "2023-02-10"
      },
      {
        id: "t4",
        title: "Testing & Iteration",
        description: "User testing with prototype and design refinement",
        date: "2023-02-25"
      },
      {
        id: "t5",
        title: "Handoff & Implementation",
        description: "Developer handoff and implementation support",
        date: "2023-03-15"
      }
    ],
    tools: ["Figma", "Miro", "Maze", "Principle"],
    outcomes: {
      metrics: [
        "App Store rating increased from 3.2 to 4.7",
        "User satisfaction increased by 45%",
        "Task completion rate improved by 60%",
        "Mobile transactions increased by 32%"
      ],
      testimonials: [
        {
          id: "test1",
          content: "Sarah's redesign of our mobile app transformed the user experience. Our customers love the new interface and we've seen a significant increase in mobile banking usage.",
          author: "Jane Smith",
          position: "Digital Product Manager, XYZ Bank",
          avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&q=80"
        }
      ]
    },
    featured: true,
    createdAt: "2023-04-01T08:00:00Z",
    updatedAt: "2023-04-15T16:30:00Z"
  },
  {
    id: "cs2",
    userId: "user2",
    title: "Building a High-Performance E-commerce Frontend",
    slug: "ecommerce-frontend",
    excerpt: "Redesigning and developing the frontend for a major e-commerce platform focusing on performance and conversion",
    content: "Full case study content here...",
    coverImage: "https://images.unsplash.com/photo-1556741533-974f8e62a92d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556742208-999815fca738?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0a2a25d80b1e?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["React", "Performance", "E-commerce", "Frontend Development"],
    projectOverview: "FashionNova wanted to overhaul their existing e-commerce platform to address performance issues and improve mobile conversion rates. The existing site had slow page loads and high bounce rates on mobile devices.",
    timeline: [
      {
        id: "t1",
        title: "Analysis & Planning",
        description: "Performance auditing and technical architecture planning",
        date: "2022-11-10"
      },
      {
        id: "t2",
        title: "Component Design",
        description: "Building component library and design system implementation",
        date: "2022-12-05"
      },
      {
        id: "t3",
        title: "Development",
        description: "Frontend development with React and optimized rendering",
        date: "2023-01-15"
      },
      {
        id: "t4",
        title: "Performance Optimization",
        description: "Implementing code splitting, lazy loading, and caching strategies",
        date: "2023-02-10"
      },
      {
        id: "t5",
        title: "Testing & Deployment",
        description: "QA testing and phased production deployment",
        date: "2023-03-01"
      }
    ],
    tools: ["React", "TypeScript", "Next.js", "TailwindCSS", "Lighthouse", "WebPageTest"],
    outcomes: {
      metrics: [
        "Page load time reduced by 67%",
        "Core Web Vitals scores all in the 'good' range",
        "Mobile conversion rate increased by 24%",
        "Cart abandonment decreased by 15%"
      ],
      testimonials: [
        {
          id: "test1",
          content: "Mike's expertise in frontend performance transformed our e-commerce platform. The site is lightning fast now and our conversion rates have significantly improved.",
          author: "Robert Lee",
          position: "CTO, FashionNova",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80"
        }
      ]
    },
    featured: true,
    createdAt: "2023-03-15T10:00:00Z",
    updatedAt: "2023-04-10T14:20:00Z"
  },
  {
    id: "cs3",
    userId: "user1",
    title: "Designing a Health & Wellness App",
    slug: "wellness-app-design",
    excerpt: "Creating an intuitive, motivating user experience for a new health and wellness tracking app",
    content: "Full case study content here...",
    coverImage: "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=1200&q=80",
    tags: ["UX/UI Design", "Mobile App", "Health & Wellness"],
    projectOverview: "WellnessPlus wanted to enter the health tracking market with a differentiated app focusing on holistic wellness rather than just fitness. The goal was to create an experience that would motivate users to build healthy habits across multiple dimensions of wellness.",
    tools: ["Figma", "Miro", "ProtoPie", "UserTesting"],
    featured: false,
    createdAt: "2022-12-10T09:30:00Z",
    updatedAt: "2023-01-25T11:45:00Z"
  }
];

// Mock Analytics Data
export const mockPortfolioAnalytics: PortfolioAnalytics = {
  id: "pa1",
  userId: "user1",
  totalVisits: 1245,
  uniqueVisitors: 843,
  averageTimeOnSite: 125, // in seconds
  popularPages: [
    {
      path: "/sarahdesigner",
      title: "Portfolio Home",
      views: 1245,
      uniqueVisitors: 843
    },
    {
      path: "/sarahdesigner/case-study/mobile-banking-redesign",
      title: "Mobile Banking Redesign",
      views: 658,
      uniqueVisitors: 412
    },
    {
      path: "/sarahdesigner/case-study/wellness-app-design",
      title: "Wellness App Design",
      views: 421,
      uniqueVisitors: 289
    },
    {
      path: "/sarahdesigner/about",
      title: "About Sarah",
      views: 312,
      uniqueVisitors: 245
    }
  ],
  visitsOverTime: [
    { date: "2023-04-01", value: 42 },
    { date: "2023-04-08", value: 53 },
    { date: "2023-04-15", value: 49 },
    { date: "2023-04-22", value: 67 },
    { date: "2023-04-29", value: 83 },
    { date: "2023-05-06", value: 95 },
    { date: "2023-05-13", value: 110 },
    { date: "2023-05-20", value: 123 }
  ],
  lastUpdated: "2023-05-25T12:00:00Z"
};

export const mockCaseStudyAnalytics: CaseStudyAnalytics[] = [
  {
    id: "csa1",
    caseStudyId: "cs1",
    userId: "user1",
    views: 658,
    uniqueVisitors: 412,
    averageTimeOnPage: 245, // in seconds
    clicks: 89, // external links or calls to action
    clicksOverTime: [
      { date: "2023-04-01", value: 3 },
      { date: "2023-04-08", value: 5 },
      { date: "2023-04-15", value: 8 },
      { date: "2023-04-22", value: 7 },
      { date: "2023-04-29", value: 10 },
      { date: "2023-05-06", value: 12 },
      { date: "2023-05-13", value: 15 },
      { date: "2023-05-20", value: 18 }
    ],
    viewsOverTime: [
      { date: "2023-04-01", value: 25 },
      { date: "2023-04-08", value: 32 },
      { date: "2023-04-15", value: 28 },
      { date: "2023-04-22", value: 42 },
      { date: "2023-04-29", value: 51 },
      { date: "2023-05-06", value: 63 },
      { date: "2023-05-13", value: 72 },
      { date: "2023-05-20", value: 84 }
    ],
    lastUpdated: "2023-05-25T12:00:00Z"
  },
  {
    id: "csa3",
    caseStudyId: "cs3",
    userId: "user1",
    views: 421,
    uniqueVisitors: 289,
    averageTimeOnPage: 192, // in seconds
    clicks: 53, // external links or calls to action
    clicksOverTime: [
      { date: "2023-04-01", value: 2 },
      { date: "2023-04-08", value: 3 },
      { date: "2023-04-15", value: 5 },
      { date: "2023-04-22", value: 4 },
      { date: "2023-04-29", value: 7 },
      { date: "2023-05-06", value: 8 },
      { date: "2023-05-13", value: 9 },
      { date: "2023-05-20", value: 12 }
    ],
    viewsOverTime: [
      { date: "2023-04-01", value: 15 },
      { date: "2023-04-08", value: 19 },
      { date: "2023-04-15", value: 22 },
      { date: "2023-04-22", value: 27 },
      { date: "2023-04-29", value: 35 },
      { date: "2023-05-06", value: 41 },
      { date: "2023-05-13", value: 48 },
      { date: "2023-05-20", value: 53 }
    ],
    lastUpdated: "2023-05-25T12:00:00Z"
  }
];

// Helper functions to get mock data
export const getUserByUsername = (username: string): User | undefined => {
  return mockUsers.find(user => user.username === username);
};

export const getCaseStudiesByUserId = (userId: string): CaseStudy[] => {
  return mockCaseStudies.filter(caseStudy => caseStudy.userId === userId);
};

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return mockCaseStudies.find(caseStudy => caseStudy.slug === slug);
};

export const getPortfolioByUserId = (userId: string): Portfolio | undefined => {
  return mockPortfolios.find(portfolio => portfolio.userId === userId);
};
