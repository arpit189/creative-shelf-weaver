
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, UserPlus, User } from 'lucide-react';

interface NavbarProps {
  showLoginLinks?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showLoginLinks = true }) => {
  const { user, isAuthenticated, logout } = useAuth();
  
  // Make sure we have a valid username to use - convert email format to valid URL
  const username = user?.username ? user.username : 
                  user?.email ? user.email.replace('@', '-at-').replace(/\./g, '-') : 
                  'demo';

  return (
    <header className="border-b border-border">
      <div className="container-custom flex items-center justify-between h-16">
        <Link to="/" className="font-serif text-2xl font-bold">
          ProjectShelf
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/explore" className="text-sm font-medium hover:text-primary transition-colors">
            Explore
          </Link>
          <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              {showLoginLinks && (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
              <Link to={`/${username}`}>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  View Portfolio
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                Log Out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
