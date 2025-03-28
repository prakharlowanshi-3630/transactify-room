
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, MessageSquare, FileText, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-dealBlue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Secure Business Transactions Platform
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            TransactifyRoom is the virtual deal room where buyers and sellers negotiate deals in real-time, 
            upload documents, and securely finalize transactions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-dealBlue hover:bg-gray-100">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-dealBlue-dark">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-dealBlue-light/20 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-dealBlue-light" />
              </div>
              <h3 className="text-xl font-semibold mb-3">User Management</h3>
              <p className="text-gray-600">
                Secure JWT-based authentication with role-based access for buyers and sellers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-dealBlue-light/20 p-4 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-dealBlue-light" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Deals</h3>
              <p className="text-gray-600">
                Create and negotiate deals with real-time price updates and status tracking.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-dealBlue-light/20 p-4 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-dealBlue-light" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Chat</h3>
              <p className="text-gray-600">
                Instant messaging between buyers and sellers with typing indicators.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-dealBlue-light/20 p-4 rounded-full mb-4">
                <FileText className="h-8 w-8 text-dealBlue-light" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Document Sharing</h3>
              <p className="text-gray-600">
                Secure document upload with granular access control for sensitive files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-dealBlue-light inline-flex justify-center items-center w-12 h-12 rounded-full text-white text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
              <p className="text-gray-600">
                Sign up as a buyer or seller to access the platform's features.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-dealBlue-light inline-flex justify-center items-center w-12 h-12 rounded-full text-white text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Initiate or Join Deals</h3>
              <p className="text-gray-600">
                Create new deals or participate in existing ones with secure negotiation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-dealBlue-light inline-flex justify-center items-center w-12 h-12 rounded-full text-white text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Finalize Transactions</h3>
              <p className="text-gray-600">
                Complete deals with document signing and secure payment processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dealBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Join TransactifyRoom today and experience secure, efficient business transactions.
          </p>
          <Button size="lg" asChild className="bg-white text-dealBlue hover:bg-gray-100">
            <Link to="/register">Sign Up Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
