
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dealBlue text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TransactifyRoom</h3>
            <p className="text-sm text-gray-300">
              Secure business transactions platform for buyers and sellers to negotiate deals in real-time.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-gray-300 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-sm text-gray-300 hover:text-white">
                  Deals
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-sm text-gray-300 hover:text-white">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-sm text-gray-300 hover:text-white">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-300 text-center">
            &copy; {currentYear} TransactifyRoom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
