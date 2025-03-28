
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DealForm from '@/components/deals/DealForm';

const NewDeal = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated or not a buyer
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (user?.role !== 'buyer') {
        navigate('/dashboard');
      }
    }
  }, [loading, isAuthenticated, user, navigate]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dealBlue"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Deal</h1>
        <p className="text-muted-foreground">
          Fill in the details to start a new business transaction
        </p>
      </div>
      
      <DealForm />
    </div>
  );
};

export default NewDeal;
