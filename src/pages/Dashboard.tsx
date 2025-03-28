
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDeal } from '@/contexts/DealContext';
import DealList from '@/components/deals/DealList';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const { userDeals, loading: dealsLoading } = useDeal();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);
  
  if (authLoading || dealsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dealBlue"></div>
      </div>
    );
  }
  
  // Group deals by status
  const inProgressDeals = userDeals.filter(deal => deal.status === 'in_progress');
  const pendingDeals = userDeals.filter(deal => deal.status === 'pending');
  const completedDeals = userDeals.filter(deal => deal.status === 'completed');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
          <p className="text-muted-foreground">
            {user?.role === 'buyer' 
              ? 'Manage your purchases and negotiations'
              : 'Manage your sales and client interactions'}
          </p>
        </div>
        
        {user?.role === 'buyer' && (
          <Button asChild>
            <Link to="/deals/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Deal
            </Link>
          </Button>
        )}
      </div>
      
      <div className="space-y-10">
        {inProgressDeals.length > 0 && (
          <DealList deals={inProgressDeals} title="In Progress Deals" />
        )}
        
        {pendingDeals.length > 0 && (
          <DealList deals={pendingDeals} title="Pending Deals" />
        )}
        
        {completedDeals.length > 0 && (
          <DealList deals={completedDeals} title="Completed Deals" />
        )}
        
        {userDeals.length === 0 && (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-medium mb-2">No Deals Yet</h3>
            <p className="text-muted-foreground mb-6">
              {user?.role === 'buyer' 
                ? 'Start by creating your first deal'
                : 'You will see deals here once buyers invite you to participate'}
            </p>
            
            {user?.role === 'buyer' && (
              <Button asChild>
                <Link to="/deals/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Deal
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
