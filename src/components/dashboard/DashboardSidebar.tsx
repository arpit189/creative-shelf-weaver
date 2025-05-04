
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  PieChart,
  Settings, 
  Eye,
  Plus
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: JSX.Element;
}

const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Format username for URL - convert email format to valid URL
  const username = user?.username ? user.username : 
                  user?.email ? user.email.replace('@', '-at-').replace(/\./g, '-') : 
                  'demo';

  const navItems: NavItem[] = [
    {
      title: 'Overview',
      href: '/dashboard',
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Portfolio',
      href: '/dashboard/portfolio',
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Case Studies',
      href: '/dashboard/case-studies',
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: <PieChart className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="w-64 h-screen border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <Link to="/" className="font-serif text-lg font-bold">
          ProjectShelf
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-6 px-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center py-2 px-3 text-sm rounded-md transition-colors",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary text-foreground"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
        
        <div className="mt-8">
          <h3 className="text-xs uppercase text-muted-foreground font-medium mb-2 px-3">Quick Actions</h3>
          <div className="space-y-1">
            <Link
              to="/dashboard/case-studies/new"
              className="flex items-center py-2 px-3 text-sm rounded-md transition-colors hover:bg-secondary text-foreground"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Case Study
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-border">
        <Link to={`/${username}`}>
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            View Portfolio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
