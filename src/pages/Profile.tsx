
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Profile = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);
  
  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dealBlue"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <p className="text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-muted-foreground">Email</div>
                    <div className="col-span-2">{user.email}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Account Information</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-muted-foreground">User ID</div>
                    <div className="col-span-2">{user.id}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-muted-foreground">Role</div>
                    <div className="col-span-2 capitalize">{user.role}</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="destructive" className="w-full" onClick={() => {
                  logout();
                  navigate('/');
                }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
