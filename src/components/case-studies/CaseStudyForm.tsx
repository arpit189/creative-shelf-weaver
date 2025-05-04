
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { getCaseStudyById, mockCaseStudies } from '@/data/mockData';
import { CaseStudy } from '@/models/types';

interface TimelineItem {
  title: string;
  date: string;
  description: string;
}

interface TestimonialItem {
  author: string;
  position: string;
  content: string;
}

interface CaseStudyFormProps {
  editMode?: boolean;
  caseStudyId?: string;
  initialValues?: CaseStudy;
}

const CaseStudyForm: React.FC<CaseStudyFormProps> = ({ editMode = false, caseStudyId, initialValues }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Find case study for edit mode
  const caseStudyToEdit = initialValues || (editMode && caseStudyId ? 
    mockCaseStudies.find(cs => cs.id === caseStudyId) : undefined);

  // Basic info state
  const [title, setTitle] = useState(caseStudyToEdit?.title || '');
  const [slug, setSlug] = useState(caseStudyToEdit?.slug || '');
  const [excerpt, setExcerpt] = useState(caseStudyToEdit?.excerpt || '');
  const [coverImage, setCoverImage] = useState(caseStudyToEdit?.coverImage || '');
  const [projectOverview, setProjectOverview] = useState(caseStudyToEdit?.projectOverview || '');
  const [featured, setFeatured] = useState(caseStudyToEdit?.featured || false);
  
  // Tags state
  const [tagsInput, setTagsInput] = useState(caseStudyToEdit?.tags?.join(', ') || '');
  const [tools, setTools] = useState(caseStudyToEdit?.tools?.join(', ') || '');

  // Gallery state
  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    caseStudyToEdit?.gallery?.length ? caseStudyToEdit.gallery : ['']
  );

  // Timeline state
  const [timeline, setTimeline] = useState<TimelineItem[]>(
    caseStudyToEdit?.timeline?.length ? 
    caseStudyToEdit.timeline.map(item => ({
      title: item.title,
      date: item.date,
      description: item.description
    })) : 
    [{ title: '', date: '', description: '' }]
  );

  // Outcomes state
  const [metrics, setMetrics] = useState<string[]>(
    caseStudyToEdit?.outcomes?.metrics?.length ? 
    caseStudyToEdit.outcomes.metrics : 
    ['']
  );
  
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(
    caseStudyToEdit?.outcomes?.testimonials?.length ?
    caseStudyToEdit.outcomes.testimonials.map(item => ({
      author: item.author,
      position: item.position || '',
      content: item.content
    })) :
    [{ author: '', position: '', content: '' }]
  );

  // Handle gallery inputs
  const handleGalleryChange = (index: number, value: string) => {
    const updatedGallery = [...galleryUrls];
    updatedGallery[index] = value;
    setGalleryUrls(updatedGallery);
  };

  const addGalleryItem = () => {
    setGalleryUrls([...galleryUrls, '']);
  };

  const removeGalleryItem = (index: number) => {
    if (galleryUrls.length === 1) return;
    const updatedGallery = galleryUrls.filter((_, i) => i !== index);
    setGalleryUrls(updatedGallery);
  };

  // Handle timeline inputs
  const handleTimelineChange = (index: number, field: keyof TimelineItem, value: string) => {
    const updatedTimeline = [...timeline];
    updatedTimeline[index] = {
      ...updatedTimeline[index],
      [field]: value
    };
    setTimeline(updatedTimeline);
  };

  const addTimelineItem = () => {
    setTimeline([...timeline, { title: '', date: '', description: '' }]);
  };

  const removeTimelineItem = (index: number) => {
    if (timeline.length === 1) return;
    const updatedTimeline = timeline.filter((_, i) => i !== index);
    setTimeline(updatedTimeline);
  };

  // Handle metrics inputs
  const handleMetricChange = (index: number, value: string) => {
    const updatedMetrics = [...metrics];
    updatedMetrics[index] = value;
    setMetrics(updatedMetrics);
  };

  const addMetricItem = () => {
    setMetrics([...metrics, '']);
  };

  const removeMetricItem = (index: number) => {
    if (metrics.length === 1) return;
    const updatedMetrics = metrics.filter((_, i) => i !== index);
    setMetrics(updatedMetrics);
  };

  // Handle testimonials inputs
  const handleTestimonialChange = (index: number, field: keyof TestimonialItem, value: string) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value
    };
    setTestimonials(updatedTestimonials);
  };

  const addTestimonialItem = () => {
    setTestimonials([...testimonials, { author: '', position: '', content: '' }]);
  };

  const removeTestimonialItem = (index: number) => {
    if (testimonials.length === 1) return;
    const updatedTestimonials = testimonials.filter((_, i) => i !== index);
    setTestimonials(updatedTestimonials);
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!editMode || slug === '') {
      setSlug(generateSlug(newTitle));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would save to the backend API
    // For now, just show a success message and navigate back to case studies list
    toast({
      title: editMode ? "Case study updated" : "Case study created",
      description: `"${title}" has been ${editMode ? "updated" : "created"} successfully.`,
    });
    
    sonnerToast.success(
      editMode ? "Case study updated" : "Case study created", 
      {description: `"${title}" has been ${editMode ? "updated" : "created"} successfully.`}
    );

    navigate('/dashboard/case-studies');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Case Study Title</Label>
                    <Input 
                      id="title" 
                      value={title} 
                      onChange={handleTitleChange}
                      placeholder="Enter a descriptive title" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input 
                      id="slug" 
                      value={slug} 
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="url-friendly-slug" 
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This will be used in the URL: {user?.username}/{slug}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Short Description</Label>
                    <Textarea 
                      id="excerpt" 
                      value={excerpt} 
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Brief summary of the case study (1-2 sentences)" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input 
                      id="coverImage" 
                      value={coverImage} 
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://example.com/image.jpg" 
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter a URL for the cover image (recommended size: 1200x630px)
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input 
                      id="tags" 
                      value={tagsInput} 
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="UI Design, React, Mobile App, etc." 
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate tags with commas. These will help categorize your case study.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="featured" 
                        checked={featured} 
                        onCheckedChange={setFeatured}
                      />
                      <Label htmlFor="featured">
                        Feature this case study on your portfolio
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="projectOverview">Overview</Label>
                  <Textarea 
                    id="projectOverview" 
                    value={projectOverview} 
                    onChange={(e) => setProjectOverview(e.target.value)}
                    placeholder="Write a detailed description of the project, including goals, challenges, and your role." 
                    className="min-h-32"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Gallery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {galleryUrls.map((url, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`gallery-${index}`}>Image {index + 1}</Label>
                      <Input
                        id={`gallery-${index}`}
                        value={url}
                        onChange={(e) => handleGalleryChange(index, e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-8"
                      onClick={() => removeGalleryItem(index)}
                      disabled={galleryUrls.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addGalleryItem}
                  className="w-full"
                >
                  Add Image
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  Add images that showcase different aspects of your project. These will be displayed in a gallery on your case study page.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Timeline Entry {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTimelineItem(index)}
                        disabled={timeline.length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`timeline-title-${index}`}>Title</Label>
                      <Input
                        id={`timeline-title-${index}`}
                        value={item.title}
                        onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                        placeholder="Discovery Phase"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`timeline-date-${index}`}>Date</Label>
                      <Input
                        id={`timeline-date-${index}`}
                        value={item.date}
                        onChange={(e) => handleTimelineChange(index, 'date', e.target.value)}
                        placeholder="January 2025"
                        type="month"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`timeline-desc-${index}`}>Description</Label>
                      <Textarea
                        id={`timeline-desc-${index}`}
                        value={item.description}
                        onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                        placeholder="What happened during this phase of the project?"
                      />
                    </div>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTimelineItem}
                  className="w-full"
                >
                  Add Timeline Entry
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tools & Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tools">Tools Used</Label>
                  <Textarea 
                    id="tools" 
                    value={tools} 
                    onChange={(e) => setTools(e.target.value)}
                    placeholder="Figma, React, TypeScript, etc. (comma separated)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate tools and technologies with commas. These will be displayed as tags on your case study.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="outcomes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Input
                      value={metric}
                      onChange={(e) => handleMetricChange(index, e.target.value)}
                      placeholder={`Metric ${index + 1} (e.g. "Increased conversion rate by 25%")`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMetricItem(index)}
                      disabled={metrics.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addMetricItem}
                  className="w-full"
                >
                  Add Metric
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Testimonials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {testimonials.map((item, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Testimonial {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTestimonialItem(index)}
                        disabled={testimonials.length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`testimonial-content-${index}`}>Quote</Label>
                      <Textarea
                        id={`testimonial-content-${index}`}
                        value={item.content}
                        onChange={(e) => handleTestimonialChange(index, 'content', e.target.value)}
                        placeholder="The testimonial text goes here..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`testimonial-author-${index}`}>Author Name</Label>
                        <Input
                          id={`testimonial-author-${index}`}
                          value={item.author}
                          onChange={(e) => handleTestimonialChange(index, 'author', e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`testimonial-position-${index}`}>Position/Company</Label>
                        <Input
                          id={`testimonial-position-${index}`}
                          value={item.position}
                          onChange={(e) => handleTestimonialChange(index, 'position', e.target.value)}
                          placeholder="CEO, Company Name"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTestimonialItem}
                  className="w-full"
                >
                  Add Testimonial
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard/case-studies')}
          >
            Cancel
          </Button>
          <Button type="submit">
            {editMode ? 'Update Case Study' : 'Create Case Study'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CaseStudyForm;
