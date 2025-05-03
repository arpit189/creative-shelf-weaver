
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';

const ThemePicker: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Choose Theme</h3>
      <RadioGroup
        value={theme}
        onValueChange={(value) => setTheme(value as 'minimal' | 'bold')}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="minimal" id="theme-minimal" />
            <Label htmlFor="theme-minimal">Minimal</Label>
          </div>
          <div className="mt-2 border rounded-md p-4 bg-white text-black">
            <div className="h-4 w-20 bg-gray-900 rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-10 bg-gray-100 rounded"></div>
              <div className="h-10 bg-gray-100 rounded"></div>
              <div className="h-10 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bold" id="theme-bold" />
            <Label htmlFor="theme-bold">Bold</Label>
          </div>
          <div className="mt-2 border rounded-md p-4 bg-white text-black">
            <div className="h-4 w-20 bg-blue-600 rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-10 bg-blue-100 rounded"></div>
              <div className="h-10 bg-blue-100 rounded"></div>
              <div className="h-10 bg-blue-100 rounded"></div>
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ThemePicker;
