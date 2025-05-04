
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';

interface Metric {
  id: string;
  label: string;
  value: string;
  format?: string;
}

interface ProjectMetricsProps {
  metrics: Metric[];
  onChange: (metrics: Metric[]) => void;
}

const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ metrics = [], onChange }) => {
  const [newMetric, setNewMetric] = useState<Omit<Metric, 'id'>>({
    label: '',
    value: '',
    format: '',
  });

  const handleAddMetric = () => {
    if (!newMetric.label || !newMetric.value) return;

    const metric = {
      ...newMetric,
      id: `metric-${Date.now()}`
    };

    onChange([...metrics, metric]);
    setNewMetric({ label: '', value: '', format: '' });
  };

  const handleDeleteMetric = (id: string) => {
    onChange(metrics.filter(metric => metric.id !== id));
  };

  const handleMetricChange = (id: string, field: keyof Metric, value: string) => {
    onChange(
      metrics.map(metric => 
        metric.id === id ? { ...metric, [field]: value } : metric
      )
    );
  };

  const formatOptions = [
    { value: '', label: 'None' },
    { value: '%', label: 'Percentage' },
    { value: '$', label: 'Currency ($)' },
    { value: '€', label: 'Currency (€)' },
    { value: 'x', label: 'Multiplier (e.g. 2x)' },
  ];

  return (
    <div className="space-y-6">
      <div className="border p-4 rounded-md space-y-4">
        <h3 className="text-lg font-medium">Add Project Outcome</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="metric-label">Metric Label</Label>
            <Input 
              id="metric-label"
              placeholder="e.g., Conversion Rate"
              value={newMetric.label}
              onChange={(e) => setNewMetric({...newMetric, label: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metric-value">Value</Label>
            <div className="flex gap-2">
              <Input 
                id="metric-value"
                placeholder="e.g., 24"
                value={newMetric.value}
                onChange={(e) => setNewMetric({...newMetric, value: e.target.value})}
              />
              <select
                className="bg-background border border-input rounded-md px-3"
                value={newMetric.format}
                onChange={(e) => setNewMetric({...newMetric, format: e.target.value})}
              >
                {formatOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Button 
          onClick={handleAddMetric}
          disabled={!newMetric.label || !newMetric.value}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-1 h-4 w-4" /> Add Metric
        </Button>
      </div>

      {/* Metrics Display */}
      {metrics.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Project Outcomes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm text-muted-foreground">{metric.label}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0" 
                      onClick={() => handleDeleteMetric(metric.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="text-2xl font-bold">{metric.format === '$' || metric.format === '€' ? `${metric.format}${metric.value}` : `${metric.value}${metric.format === 'x' ? 'x' : metric.format}`}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectMetrics;
