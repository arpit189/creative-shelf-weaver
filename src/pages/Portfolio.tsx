
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ThemePicker from '@/components/portfolio/ThemePicker';
import { useTheme } from '@/contexts/ThemeContext';
import { mockPortfolios } from '@/data/mockData';

interface SocialLink {
  name: string;
  value: string;
  placeholder: string;
  icon: JSX.Element;
}

const Portfolio = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const portfolio = mockPortfolios[0]; // Hardcoded for demo
  
  // Basic Info
  const [title, setTitle] = useState(portfolio.title);
  const [description, setDescription] = useState(portfolio.description || '');

  // Contact Info
  const [email, setEmail] = useState(portfolio.contact?.email || '');
  const [location, setLocation] = useState(portfolio.contact?.location || '');

  // Skills
  const [skills, setSkills] = useState(portfolio.skills?.join(', ') || '');

  // Social Links
  const socialLinks: SocialLink[] = [
    {
      name: 'twitter',
      value: portfolio.social?.twitter || '',
      placeholder: 'Twitter username',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path fill="currentColor" d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.093 4.093 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.615 11.615 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'linkedin',
      value: portfolio.social?.linkedin || '',
      placeholder: 'LinkedIn username',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'github',
      value: portfolio.social?.github || '',
      placeholder: 'GitHub username',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      name: 'dribbble',
      value: portfolio.social?.dribbble || '',
      placeholder: 'Dribbble username',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path fill="currentColor" d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
        </svg>
      ),
    },
    {
      name: 'behance',
      value: portfolio.social?.behance || '',
      placeholder: 'Behance username',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path fill="currentColor" d="M0 4.48v14.763h7.155c.645 0 1.262-.08 1.83-.251a4.73 4.73 0 001.575-.779c.448-.346.809-.79 1.058-1.333.25-.541.376-1.178.376-1.903 0-.813-.17-1.5-.512-2.065-.341-.563-.854-.963-1.534-1.358.506-.249.883-.587 1.119-1.025.238-.436.356-.969.356-1.599 0-.654-.097-1.17-.288-1.611a2.53 2.53 0 00-.816-1.035 3.237 3.237 0 00-1.29-.551A7.59 7.59 0 007.33 4.48H0zm15.997.232v1.402h5.995V4.712h-5.995zm-8.92 2.669c.76 0 1.327.061 1.705.226.374.169.554.52.554 1.085 0 .288-.055.522-.167.71a.995.995 0 01-.468.412 1.74 1.74 0 01-.683.185c-.257.015-.53.025-.823.025h-3.28V7.38h3.161zm9.201.49c-.783 0-1.495.121-2.132.368a4.73 4.73 0 00-1.68 1.052c-.47.455-.834 1.012-1.09 1.673-.255.661-.385 1.407-.385 2.232 0 .826.13 1.574.384 2.23.255.661.618 1.218 1.09 1.675a4.716 4.716 0 001.68 1.052c.637.249 1.35.369 2.134.369.968 0 1.793-.166 2.48-.498.683-.333 1.28-.9 1.79-1.704h-2.386c-.149.258-.448.462-.797.605-.348.142-.731.213-1.14.213-.612 0-1.123-.153-1.532-.465-.407-.312-.665-.85-.768-1.612h6.797c.016-.209.028-.367.032-.48.008-.112.01-.222.01-.324 0-.812-.115-1.555-.344-2.226a4.934 4.934 0 00-.984-1.704 4.409 4.409 0 00-1.549-1.095 5.21 5.21 0 00-2.038-.36zm.094 2.052c.551 0 1.01.151 1.375.466.366.315.6.784.707 1.414h-4.195c.045-.258.117-.494.213-.706a2.4 2.4 0 01.387-.563c.148-.158.34-.281.58-.376.241-.09.528-.133.864-.133l.069-.102zm-9.46.461h3.591c.323 0 .591.028.797.085a.913.913 0 01.492.307c.113.138.193.304.242.496.048.193.072.415.072.673 0 .497-.144.853-.433 1.073-.288.22-.703.33-1.244.33h-3.517v-2.963z" />
        </svg>
      ),
    },
  ];

  const [socials, setSocials] = useState<Record<string, string>>(
    socialLinks.reduce((acc, link) => ({
      ...acc,
      [link.name]: link.value,
    }), {})
  );

  const handleSocialChange = (name: string, value: string) => {
    setSocials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // In a real app, we would save to the API
    toast({
      title: "Portfolio updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <DashboardLayout title="Portfolio Settings">
      <Tabs defaultValue="content">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="content">Portfolio Content</TabsTrigger>
          <TabsTrigger value="design">Portfolio Design</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Portfolio Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Brief description of your expertise and work"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  placeholder="City, Country"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Your Skills</Label>
                <Textarea 
                  id="skills" 
                  value={skills} 
                  onChange={(e) => setSkills(e.target.value)} 
                  placeholder="Add skills separated by commas (e.g., UI Design, React, TypeScript)"
                />
                <p className="text-xs text-muted-foreground">
                  Separate skills with commas. These will be displayed as tags on your portfolio.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <div key={link.name} className="space-y-2">
                    <Label htmlFor={link.name} className="flex items-center gap-2">
                      {link.icon}
                      {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
                    </Label>
                    <Input
                      id={link.name}
                      value={socials[link.name] || ''}
                      onChange={(e) => handleSocialChange(link.name, e.target.value)}
                      placeholder={link.placeholder}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="design" className="space-y-6">
          <ThemePicker />
          
          <Card>
            <CardHeader>
              <CardTitle>Theme Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`border rounded-md p-6 theme-${theme}`}>
                <div className="max-w-3xl mx-auto">
                  <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold mb-2">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-xl font-medium mb-4">Featured Projects</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-4">
                        <div className="w-full h-32 bg-muted rounded-md mb-3"></div>
                        <h3 className="font-medium mb-1">Project Title</h3>
                        <p className="text-sm text-muted-foreground">Project description goes here.</p>
                      </div>
                      <div className="border rounded-md p-4">
                        <div className="w-full h-32 bg-muted rounded-md mb-3"></div>
                        <h3 className="font-medium mb-1">Project Title</h3>
                        <p className="text-sm text-muted-foreground">Project description goes here.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-xl font-medium mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.split(',').map((skill, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Portfolio;
