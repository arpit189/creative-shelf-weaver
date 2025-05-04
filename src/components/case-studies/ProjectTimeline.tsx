
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Trash2, Plus } from 'lucide-react';

interface TimelineStep {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface ProjectTimelineProps {
  steps: TimelineStep[];
  onChange: (steps: TimelineStep[]) => void;
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ steps = [], onChange }) => {
  const [newStep, setNewStep] = useState<Omit<TimelineStep, 'id'>>({
    title: '',
    date: '',
    description: ''
  });

  const handleAddStep = () => {
    if (!newStep.title || !newStep.date) return;

    const step = {
      ...newStep,
      id: `step-${Date.now()}`
    };

    onChange([...steps, step]);
    setNewStep({ title: '', date: '', description: '' });
  };

  const handleDelete = (id: string) => {
    onChange(steps.filter(step => step.id !== id));
  };

  const handleStepChange = (id: string, field: keyof TimelineStep, value: string) => {
    onChange(
      steps.map(step => 
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="border p-4 rounded-md space-y-4">
        <h3 className="text-lg font-medium">Add Timeline Step</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="step-title">Step Title</Label>
            <Input 
              id="step-title"
              placeholder="e.g., Research Phase"
              value={newStep.title}
              onChange={(e) => setNewStep({...newStep, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="step-date">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="step-date"
                type="date"
                className="pl-10"
                value={newStep.date}
                onChange={(e) => setNewStep({...newStep, date: e.target.value})}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="step-description">Description</Label>
          <Textarea 
            id="step-description"
            placeholder="Describe what happened during this step"
            value={newStep.description}
            onChange={(e) => setNewStep({...newStep, description: e.target.value})}
            rows={3}
          />
        </div>
        <Button 
          onClick={handleAddStep}
          disabled={!newStep.title || !newStep.date}
          className="w-full md:w-auto"
        >
          <Plus className="mr-1 h-4 w-4" /> Add Step to Timeline
        </Button>
      </div>

      {/* Timeline Preview */}
      {steps.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Project Timeline</h3>
          <div className="relative space-y-8">
            {/* Line */}
            <div className="absolute left-0 md:left-1/2 h-full w-px bg-border -translate-x-1/2 z-0"></div>
            
            {/* Steps */}
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`relative z-10 flex flex-col md:flex-row gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2 relative">
                  {/* Dot */}
                  <div className="absolute top-6 left-0 md:left-auto md:right-0 transform translate-x-0 md:translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-primary bg-background"></div>
                </div>
                <Card className="md:w-1/2">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-base">{step.title}</h4>
                      <div className="flex gap-2">
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {new Date(step.date).toLocaleDateString()}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => handleDelete(step.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProjectTimeline;
