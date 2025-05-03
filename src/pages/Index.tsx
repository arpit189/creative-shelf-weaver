
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { mockCaseStudies } from '@/data/mockData';
import CaseStudyCard from '@/components/portfolio/CaseStudyCard';

const Index = () => {
  // Get the featured case studies
  const featuredCaseStudies = mockCaseStudies.filter(cs => cs.featured).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6 animate-fade-in">
              Build your creative portfolio that stands out
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              ProjectShelf helps designers, developers, and writers create beautiful portfolios
              with dynamic case studies that showcase their best work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/register">
                <Button size="lg" className="px-8">Get Started</Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="px-8">Explore Examples</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Create. Showcase. Analyze.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build a professional portfolio and track its performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card p-8 rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
              </div>
              <h3 className="heading-sm mb-2">Portfolio Builder</h3>
              <p className="text-muted-foreground">
                Create case studies with project overviews, media galleries, development timelines, and outcomes.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                </svg>
              </div>
              <h3 className="heading-sm mb-2">Theme Engine</h3>
              <p className="text-muted-foreground">
                Select from beautiful themes with real-time preview to find the perfect look for your portfolio.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="heading-sm mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Track portfolio traffic, engagement metrics, and visitor interest per case study.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Featured Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore some of the amazing case studies created on ProjectShelf
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCaseStudies.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy.id}
                id={caseStudy.id}
                title={caseStudy.title}
                excerpt={caseStudy.excerpt}
                coverImage={caseStudy.coverImage}
                tags={caseStudy.tags}
                createdAt={caseStudy.createdAt}
                slug={caseStudy.slug}
                username={mockCaseStudies.find(cs => cs.id === caseStudy.id)?.userId === 'user1' ? 'sarahdesigner' : 'mikecoder'}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/explore">
              <Button variant="outline" size="lg">View More Case Studies</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-10 md:p-16 text-white text-center">
            <h2 className="heading-lg mb-6 text-white">Ready to showcase your work?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of creatives who are building stunning portfolios and growing their careers with ProjectShelf.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8">
                Create Your Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
