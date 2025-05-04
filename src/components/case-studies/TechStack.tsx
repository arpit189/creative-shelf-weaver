
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';

interface TechStackProps {
  technologies: string[];
  onChange: (technologies: string[]) => void;
}

const TechStack: React.FC<TechStackProps> = ({ technologies = [], onChange }) => {
  const [newTech, setNewTech] = useState('');
  
  // Common technologies that can be quickly added
  const commonTechs = [
    'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 
    'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Firebase', 'AWS',
    'Figma', 'Sketch', 'Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro',
    'Python', 'Django', 'Flask', 'Ruby', 'Ruby on Rails', 'PHP', 'Laravel'
  ];

  const handleAddTech = () => {
    if (!newTech.trim() || technologies.includes(newTech.trim())) {
      setNewTech('');
      return;
    }
    
    onChange([...technologies, newTech.trim()]);
    setNewTech('');
  };

  const handleQuickAdd = (tech: string) => {
    if (technologies.includes(tech)) return;
    onChange([...technologies, tech]);
  };

  const handleRemoveTech = (tech: string) => {
    onChange(technologies.filter(t => t !== tech));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add technology or tool"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTech()}
          />
          <Button onClick={handleAddTech}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        {/* Quick add common technologies */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Quick add:</p>
          <div className="flex flex-wrap gap-2">
            {commonTechs
              .filter(tech => !technologies.includes(tech))
              .slice(0, 10)  // Limit to first 10 not already selected
              .map(tech => (
                <Button 
                  key={tech} 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleQuickAdd(tech)}
                >
                  {tech}
                </Button>
              ))}
          </div>
        </div>
      </div>

      {/* Selected technologies list */}
      {technologies.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Selected Technologies & Tools:</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map(tech => (
              <div 
                key={tech}
                className="inline-flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1"
              >
                <span>{tech}</span>
                <button 
                  onClick={() => handleRemoveTech(tech)} 
                  className="ml-1 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStack;
