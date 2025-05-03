
import React from 'react';
import { useParams } from 'react-router-dom';
import { getCaseStudyBySlug } from '@/data/mockData';

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string; username: string }>();
  const caseStudy = getCaseStudyBySlug(slug || '');
  
  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
          <p className="text-muted-foreground">
            The case study you're looking for doesn't exist or may have been moved.
          </p>
          <div className="mt-6">
            <a href="/" className="text-primary hover:underline">
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  const formattedDate = new Date(caseStudy.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative py-20">
        {caseStudy.coverImage && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img 
              src={caseStudy.coverImage} 
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`heading-xl mb-6 ${caseStudy.coverImage ? 'text-white' : ''}`}>
              {caseStudy.title}
            </h1>
            
            {caseStudy.tags && caseStudy.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {caseStudy.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-white/20 text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <p className={`text-xl ${caseStudy.coverImage ? 'text-white/90' : 'text-muted-foreground'}`}>
              {caseStudy.excerpt}
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Project Overview */}
          <section className="py-12 border-b">
            <h2 className="heading-md mb-6">Project Overview</h2>
            <p className="text-lg mb-6">{caseStudy.projectOverview}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Tools & Technologies</h3>
                {caseStudy.tools && (
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.tools.map((tool, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Project Details</h3>
                <p className="text-muted-foreground">Published on {formattedDate}</p>
              </div>
            </div>
          </section>
          
          {/* Gallery */}
          {caseStudy.gallery && caseStudy.gallery.length > 0 && (
            <section className="py-12 border-b">
              <h2 className="heading-md mb-6">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.gallery.map((image, index) => (
                  <div key={index} className="rounded-md overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${caseStudy.title} - Image ${index + 1}`}
                      className="w-full h-auto object-cover aspect-video"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Timeline */}
          {caseStudy.timeline && caseStudy.timeline.length > 0 && (
            <section className="py-12 border-b">
              <h2 className="heading-md mb-6">Project Timeline</h2>
              <div className="space-y-8">
                {caseStudy.timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-primary mt-1.5"></div>
                      {index < caseStudy.timeline!.length - 1 && (
                        <div className="absolute top-5 bottom-0 left-1.5 w-0.5 bg-border -mb-8"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Outcomes */}
          {caseStudy.outcomes && (
            <section className="py-12 border-b">
              <h2 className="heading-md mb-6">Outcomes</h2>
              
              {caseStudy.outcomes.metrics && caseStudy.outcomes.metrics.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-medium text-lg mb-4">Key Metrics</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseStudy.outcomes.metrics.map((metric, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {caseStudy.outcomes.testimonials && caseStudy.outcomes.testimonials.length > 0 && (
                <div>
                  <h3 className="font-medium text-lg mb-4">Testimonials</h3>
                  <div className="space-y-6">
                    {caseStudy.outcomes.testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-muted/30 border rounded-md p-6">
                        <p className="text-lg mb-4">"{testimonial.content}"</p>
                        <div className="flex items-center gap-3">
                          {testimonial.avatar && (
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.author}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium">{testimonial.author}</p>
                            {testimonial.position && (
                              <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
          
          {/* Call to Action */}
          <section className="py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="heading-sm mb-2">Interested in working together?</h2>
                <p className="text-muted-foreground">Let's discuss your next project!</p>
              </div>
              <a 
                href="mailto:hello@example.com"
                className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
