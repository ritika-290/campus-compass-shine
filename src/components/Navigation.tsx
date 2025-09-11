import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Heart, MessageCircle, Users, Shield, AlertTriangle, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Heart },
    { name: 'Mood Check-in', href: '/mood', icon: Brain },
    { name: 'AI Chatbot', href: '/chatbot', icon: MessageCircle },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Consent Ledger', href: '/ledger', icon: Shield },
    { name: 'Emergency SOS', href: '/sos', icon: AlertTriangle },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border shadow-gentle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-healing rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-healing bg-clip-text text-transparent">
                CampusMirror
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-gentle",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-gentle"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
            ) : user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm text-primary font-medium">
                    {user.email?.split('@')[0]}
                  </span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="border-primary/20">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-gentle",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-gentle"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* Auth Section - Mobile */}
            <div className="pt-4 border-t border-border">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse mx-auto" />
              ) : user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary font-medium">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="w-full justify-start text-primary hover:bg-primary/10"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full border-primary/20">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;