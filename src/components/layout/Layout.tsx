
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { DealProvider } from '@/contexts/DealContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();
  
  return (
    <NotificationProvider currentUser={user}>
      <DealProvider currentUser={user}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </DealProvider>
    </NotificationProvider>
  );
};

export default Layout;
