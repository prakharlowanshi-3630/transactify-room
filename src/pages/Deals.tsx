
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDeal } from '@/contexts/DealContext';
import DealList from '@/components/deals/DealList';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Deals = () => {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const { deals, loading: dealsLoading } = useDeal();
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">All Deals</h1>
        
        {user?.role === 'buyer' && (
          <Button asChild>
            <Link to="/deals/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Deal
            </Link>
          </Button>
        )}
      </div>
      
      <DealList deals={deals} />
    </div>
  );
};

export default Deals;
