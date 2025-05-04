
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Trash2, Upload, Video } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

interface MediaGalleryProps {
  media: MediaItem[];
  onChange: (media: MediaItem[]) => void;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media = [], onChange }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // In a real app, we would upload to a server here
    // For now, we'll create object URLs for the local files
    const newMedia = Array.from(files).map(file => ({
      id: `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'image' as const,
      url: URL.createObjectURL(file),
      caption: caption || file.name
    }));

    onChange([...media, ...newMedia]);
    setCaption('');
  };

  const handleAddVideo = () => {
    if (!videoUrl) return;

    // Basic validation for video URLs
    if (!videoUrl.includes('youtube.com') && !videoUrl.includes('vimeo.com')) {
      alert('Please enter a valid YouTube or Vimeo URL');
      return;
    }

    const newVideo = {
      id: `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'video' as const,
      url: videoUrl,
      caption
    };

    onChange([...media, newVideo]);
    setVideoUrl('');
    setCaption('');
  };

  const handleDelete = (id: string) => {
    onChange(media.filter(item => item.id !== id));
  };

  const handleCaptionChange = (id: string, newCaption: string) => {
    onChange(
      media.map(item => 
        item.id === id ? { ...item, caption: newCaption } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Upload Section */}
        <div className="space-y-2">
          <Label htmlFor="image-upload">Upload Images</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop images here or click to browse
            </p>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              Select Images
            </Button>
          </div>
        </div>

        {/* Video Link Section */}
        <div className="space-y-2">
          <Label htmlFor="video-url">Add Video (YouTube or Vimeo)</Label>
          <div className="flex space-x-2">
            <Input
              id="video-url"
              placeholder="Paste YouTube or Vimeo URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <Button onClick={handleAddVideo}>
              <Video className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
          <div className="h-[2.5rem]">
            <Input
              placeholder="Optional caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Gallery Preview */}
      {media.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Media Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {media.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                {item.type === 'image' ? (
                  <div className="aspect-video relative group">
                    <img
                      src={item.url}
                      alt={item.caption || 'Image'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-black/10 flex items-center justify-center relative group">
                    <Video className="h-12 w-12 text-muted-foreground" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                )}
                <div className="p-2">
                  <Input
                    placeholder="Caption"
                    value={item.caption || ''}
                    onChange={(e) => handleCaptionChange(item.id, e.target.value)}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
