
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">TransactifyRoom</span>
            <span className="block text-dealBlue-light">Virtual Deal Room</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
            A secure platform for buyers and sellers to negotiate deals, exchange documents, and finalize transactions in real-time.
          </p>
          <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            {isAuthenticated ? (
              <Button asChild size="lg">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative w-full h-64 sm:h-72 md:h-96 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-6 bg-white rounded-lg shadow-lg w-4/5 max-w-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-2.5 bg-gray-200 rounded-full w-24"></div>
                  <div className="h-2.5 bg-dealBlue-light rounded-full w-12"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5 w-4/5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5 w-3/5"></div>
                <div className="mt-4 flex justify-between">
                  <div className="h-6 bg-dealBlue-light bg-opacity-20 rounded w-1/4"></div>
                  <div className="h-6 bg-green-100 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Key Features
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-dealBlue-light bg-opacity-10 p-3 rounded-full inline-flex mb-4">
                <svg className="h-6 w-6 text-dealBlue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Real-time Negotiation</h3>
              <p className="mt-2 text-base text-gray-500">
                Negotiate deal terms in real-time with instant messaging and price proposals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-dealBlue-light bg-opacity-10 p-3 rounded-full inline-flex mb-4">
                <svg className="h-6 w-6 text-dealBlue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Secure Document Sharing</h3>
              <p className="mt-2 text-base text-gray-500">
                Upload and share confidential documents with customizable access controls.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-dealBlue-light bg-opacity-10 p-3 rounded-full inline-flex mb-4">
                <svg className="h-6 w-6 text-dealBlue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Analytics & Insights</h3>
              <p className="mt-2 text-base text-gray-500">
                Track deal progress, performance metrics, and transaction history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
