
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import CaseStudyCard from '@/components/portfolio/CaseStudyCard';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { getUserByUsername, getCaseStudiesByUserId, getPortfolioByUserId } from '@/data/mockData';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockUsers } from '@/data/mockData'; // Import mockUsers to use as fallback

const UserPortfolio = () => {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  const { setTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Handle the username from the URL
  // If it includes "-at-" it's likely an email format
  const formattedUsername = username?.includes('-at-') 
    ? username.replace('-at-', '@').replace(/-/g, '.') 
    : username;
  
  // Always default to demo user if no username is provided or if the username doesn't match any user
  const safeUsername = formattedUsername || 'demo';
  
  // Get the user data based on the username - fallback to first demo user if not found
  // Check if the user matches by username, email, or id
  const portfolioUser = getUserByUsername(safeUsername) || 
                        mockUsers.find(u => u.email === safeUsername) || 
                        mockUsers[0]; // Use first mock user as fallback
  
  const isOwner = currentUser?.id === portfolioUser?.id || 
                 currentUser?.email === portfolioUser?.email;
  
  useEffect(() => {
    // Always get a portfolio, either the real one or the demo
    const portfolio = getPortfolioByUserId(portfolioUser.id);
    
    // Set theme based on portfolio settings
    if (portfolio) {
      setTheme(portfolio.themeId as 'minimal' | 'bold');
    }
    
    setLoading(false);
  }, [safeUsername, portfolioUser, setTheme]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading portfolio...</div>
      </div>
    );
  }
  
  // Get portfolio and case studies
  const portfolio = getPortfolioByUserId(portfolioUser.id);
  const caseStudies = getCaseStudiesByUserId(portfolioUser.id);
  
  // Format display username - remove email formatting for display if needed
  const displayUsername = portfolioUser.username || 
                         (portfolioUser.email ? portfolioUser.email.split('@')[0] : 'Demo User');
  
  return (
    <Layout hideFooter>
      {/* Admin toolbar for owner */}
      {isOwner && (
        <div className="bg-secondary py-2 px-4">
          <div className="container-custom flex justify-between items-center">
            <p className="text-sm">You are viewing your public portfolio</p>
            <div className="flex space-x-4">
              <Link to="/dashboard/portfolio">
                <Button variant="outline" size="sm">
                  Edit Portfolio
                </Button>
              </Link>
              <Link to="/dashboard/case-studies">
                <Button variant="outline" size="sm">
                  Manage Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {portfolioUser.avatar && (
                <div className="shrink-0">
                  <img 
                    src={portfolioUser.avatar} 
                    alt={portfolioUser.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
                  />
                </div>
              )}
              
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{portfolioUser.name || displayUsername}</h1>
                <p className="text-xl text-muted-foreground mb-6">{portfolio?.description || "Designer & Developer"}</p>
                
                <div className="flex flex-wrap gap-2">
                  {portfolio?.skills?.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Featured Case Studies</h2>
            
            {caseStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {caseStudies.map((caseStudy) => (
                  <CaseStudyCard
                    key={caseStudy.id}
                    id={caseStudy.id}
                    title={caseStudy.title}
                    excerpt={caseStudy.excerpt}
                    coverImage={caseStudy.coverImage}
                    tags={caseStudy.tags}
                    createdAt={caseStudy.createdAt}
                    slug={caseStudy.slug}
                    username={username || displayUsername}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">No case studies yet.</p>
                  
                  {isOwner && (
                    <div className="mt-4">
                      <Link to="/dashboard/case-studies/new">
                        <Button>Create Your First Case Study</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">About Me</h2>
            
            <div className="prose max-w-none">
              <p className="text-lg mb-6">{portfolioUser.bio || "Welcome to my portfolio showcase. I'm passionate about creating amazing work and sharing it with the world."}</p>
              
              {portfolioUser.location && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Location</h3>
                  <p>{portfolioUser.location}</p>
                </div>
              )}
              
              {portfolio?.contact?.email && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Contact</h3>
                  <p>
                    <a 
                      href={`mailto:${portfolio.contact.email}`}
                      className="text-primary hover:underline"
                    >
                      {portfolio.contact.email}
                    </a>
                  </p>
                </div>
              )}
              
              {(portfolioUser.website || portfolioUser.social) && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Connect</h3>
                  <div className="flex flex-wrap gap-4">
                    {portfolioUser.website && (
                      <a 
                        href={portfolioUser.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Website
                      </a>
                    )}
                    {portfolioUser.social?.twitter && (
                      <a 
                        href={`https://twitter.com/${portfolioUser.social.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Twitter
                      </a>
                    )}
                    {portfolioUser.social?.linkedin && (
                      <a 
                        href={`https://linkedin.com/in/${portfolioUser.social.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {portfolioUser.social?.github && (
                      <a 
                        href={`https://github.com/${portfolioUser.social.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {portfolioUser.social?.dribbble && (
                      <a 
                        href={`https://dribbble.com/${portfolioUser.social.dribbble}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Dribbble
                      </a>
                    )}
                    {portfolioUser.social?.behance && (
                      <a 
                        href={`https://behance.net/${portfolioUser.social.behance}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Behance
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container-custom">
          <div className="text-center text-sm text-muted-foreground">
            <p>Portfolio powered by ProjectShelf</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default UserPortfolio;
