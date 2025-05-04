
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  title?: string;
  company?: string;
  content: string;
  avatar?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  onChange: (testimonials: Testimonial[]) => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials = [], onChange }) => {
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    name: '',
    title: '',
    company: '',
    content: '',
    avatar: '',
  });

  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.content) return;

    const testimonial = {
      ...newTestimonial,
      id: `testimonial-${Date.now()}`
    };

    onChange([...testimonials, testimonial]);
    setNewTestimonial({ name: '', title: '', company: '', content: '', avatar: '' });
  };

  const handleDeleteTestimonial = (id: string) => {
    onChange(testimonials.filter(testimonial => testimonial.id !== id));
  };

  const handleTestimonialChange = (id: string, field: keyof Testimonial, value: string) => {
    onChange(
      testimonials.map(testimonial => 
        testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="border p-4 rounded-md space-y-4">
        <h3 className="text-lg font-medium">Add Testimonial</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="testimonial-name">Name</Label>
            <Input 
              id="testimonial-name"
              placeholder="e.g., John Smith"
              value={newTestimonial.name}
              onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-title">Title/Position</Label>
            <Input 
              id="testimonial-title"
              placeholder="e.g., CEO"
              value={newTestimonial.title}
              onChange={(e) => setNewTestimonial({...newTestimonial, title: e.target.value})}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="testimonial-company">Company</Label>
            <Input 
              id="testimonial-company"
              placeholder="e.g., Acme Inc."
              value={newTestimonial.company}
              onChange={(e) => setNewTestimonial({...newTestimonial, company: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-avatar">Avatar URL (optional)</Label>
            <Input 
              id="testimonial-avatar"
              placeholder="https://..."
              value={newTestimonial.avatar}
              onChange={(e) => setNewTestimonial({...newTestimonial, avatar: e.target.value})}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="testimonial-content">Testimonial</Label>
          <Textarea 
            id="testimonial-content"
            placeholder="What did they say about your work?"
            value={newTestimonial.content}
            onChange={(e) => setNewTestimonial({...newTestimonial, content: e.target.value})}
            rows={4}
          />
        </div>
        
        <Button 
          onClick={handleAddTestimonial}
          disabled={!newTestimonial.name || !newTestimonial.content}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-1 h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      {/* Testimonials Display */}
      {testimonials.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Testimonials</h3>
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <Quote className="h-8 w-8 text-muted-foreground/40" />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  
                  <blockquote className="mt-2 text-base italic">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="mt-4 flex items-center gap-3">
                    {testimonial.avatar && (
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      {(testimonial.title || testimonial.company) && (
                        <div className="text-sm text-muted-foreground">
                          {testimonial.title}
                          {testimonial.title && testimonial.company ? ', ' : ''}
                          {testimonial.company}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
