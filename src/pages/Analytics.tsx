
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import { mockAnalytics } from '@/data/mockData';

const Analytics = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dealBlue"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <AnalyticsDashboard data={mockAnalytics} />
    </div>
  );
};

export default Analytics;
