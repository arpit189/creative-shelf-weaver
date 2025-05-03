
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CaseStudyCard from '@/components/portfolio/CaseStudyCard';
import { mockCaseStudies } from '@/data/mockData';

const CaseStudies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const userCaseStudies = mockCaseStudies.filter(cs => cs.userId === 'user1'); // Hardcoded for demo

  const featuredCaseStudies = userCaseStudies.filter(cs => cs.featured);
  const draftCaseStudies: typeof userCaseStudies = []; // In a real app, we would have draft case studies

  const filteredCaseStudies = userCaseStudies.filter(
    cs => cs.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          cs.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout title="Case Studies">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="w-full md:w-auto">
          <Input
            placeholder="Search case studies..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Link to="/dashboard/case-studies/new">
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            New Case Study
          </Button>
        </Link>
      </div>

      {searchTerm ? (
        <>
          <h2 className="text-xl font-medium mb-4">Search Results</h2>
          {filteredCaseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaseStudies.map((caseStudy) => (
                <CaseStudyCard
                  key={caseStudy.id}
                  id={caseStudy.id}
                  title={caseStudy.title}
                  excerpt={caseStudy.excerpt}
                  coverImage={caseStudy.coverImage}
                  tags={caseStudy.tags}
                  createdAt={caseStudy.createdAt}
                  slug={caseStudy.slug}
                  username="sarahdesigner" // Hardcoded for demo
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg mb-2">No case studies found matching "{searchTerm}"</p>
              <p className="text-muted-foreground">Try another search term or create a new case study</p>
            </div>
          )}
        </>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({userCaseStudies.length})</TabsTrigger>
            <TabsTrigger value="featured">Featured ({featuredCaseStudies.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({draftCaseStudies.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {userCaseStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userCaseStudies.map((caseStudy) => (
                  <CaseStudyCard
                    key={caseStudy.id}
                    id={caseStudy.id}
                    title={caseStudy.title}
                    excerpt={caseStudy.excerpt}
                    coverImage={caseStudy.coverImage}
                    tags={caseStudy.tags}
                    createdAt={caseStudy.createdAt}
                    slug={caseStudy.slug}
                    username="sarahdesigner" // Hardcoded for demo
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg mb-2">You don't have any case studies yet</p>
                <p className="text-muted-foreground mb-6">Create your first case study to showcase your work</p>
                <Link to="/dashboard/case-studies/new">
                  <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    Create Case Study
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="featured">
            {featuredCaseStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    username="sarahdesigner" // Hardcoded for demo
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg mb-2">No featured case studies</p>
                <p className="text-muted-foreground">Mark your best case studies as featured to showcase them prominently</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="drafts">
            {draftCaseStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {draftCaseStudies.map((caseStudy) => (
                  <CaseStudyCard
                    key={caseStudy.id}
                    id={caseStudy.id}
                    title={caseStudy.title}
                    excerpt={caseStudy.excerpt}
                    coverImage={caseStudy.coverImage}
                    tags={caseStudy.tags}
                    createdAt={caseStudy.createdAt}
                    slug={caseStudy.slug}
                    username="sarahdesigner" // Hardcoded for demo
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg mb-2">No draft case studies</p>
                <p className="text-muted-foreground">Drafts will appear here until they're published</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </DashboardLayout>
  );
};

export default CaseStudies;
