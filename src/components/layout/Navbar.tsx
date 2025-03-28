
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import NotificationsList from '../notifications/NotificationsList';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { unreadCount } = useNotification();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Deals', href: '/deals' },
    ...(user?.role === 'buyer' ? [{ title: 'New Deal', href: '/deals/new' }] : []),
    { title: 'Analytics', href: '/analytics' },
  ];

  return (
    <nav className="bg-dealBlue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">TransactifyRoom</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {isAuthenticated && navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-dealBlue-medium hover:bg-opacity-75"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              {isAuthenticated ? (
                <>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 bg-red-500">
                            {unreadCount}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <NotificationsList />
                    </SheetContent>
                  </Sheet>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar>
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback>{user?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                          <p className="text-xs leading-none text-muted-foreground capitalize mt-1">{user?.role}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer w-full flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dealBlue-dark">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated && navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-dealBlue-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Avatar>
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none">{user?.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-300 mt-1">{user?.email}</div>
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-auto relative">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 bg-red-500">
                            {unreadCount}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <NotificationsList />
                      <SheetClose className="mt-4" asChild>
                        <Button className="w-full">Close</Button>
                      </SheetClose>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-dealBlue-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-dealBlue-medium"
                  >
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-dealBlue-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-dealBlue-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
