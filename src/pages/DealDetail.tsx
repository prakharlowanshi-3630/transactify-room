
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDeal } from '@/contexts/DealContext';
import { mockUsers } from '@/data/mockData';
import { User } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ChatInterface from '@/components/chat/ChatInterface';
import DocumentUpload from '@/components/documents/DocumentUpload';
import DocumentList from '@/components/documents/DocumentList';
import DealStatusComponent from '@/components/deals/DealStatus';
import PriceNegotiation from '@/components/deals/PriceNegotiation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DealDetail = () => {
  const { dealId } = useParams<{ dealId: string }>();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const { dealById, loading: dealLoading } = useDeal();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);
  
  if (authLoading || dealLoading || !dealId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dealBlue"></div>
      </div>
    );
  }
  
  const deal = dealById(dealId);
  
  if (!deal) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Deal Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The deal you are looking for does not exist or you don't have access to it.
        </p>
        <Button asChild>
          <Link to="/deals">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Deals
          </Link>
        </Button>
      </div>
    );
  }
  
  // Get the other party in the deal (buyer or seller)
  const otherUser = user?.id === deal.buyerId 
    ? mockUsers.find(u => u.id === deal.sellerId) 
    : mockUsers.find(u => u.id === deal.buyerId);
  
  // Create a map of users for document list
  const usersMap: { [key: string]: User } = {};
  mockUsers.forEach(user => {
    usersMap[user.id] = user;
  });
  
  const handleDocumentUploadComplete = () => {
    // Switch to documents tab after upload
    setActiveTab('documents');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" asChild size="sm" className="mb-4">
          <Link to="/deals">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Deals
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold">{deal.title}</h1>
        <p className="text-muted-foreground">{deal.description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="space-y-6">
            <DealStatusComponent deal={deal} />
            <PriceNegotiation deal={deal} />
            
            {/* Document Upload */}
            {deal.status !== 'completed' && deal.status !== 'cancelled' && (
              <DocumentUpload 
                dealId={deal.id} 
                otherUser={otherUser} 
                onUploadComplete={handleDocumentUploadComplete} 
              />
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Initial Price</p>
                      <p className="font-medium">${deal.initialPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Price</p>
                      <p className="font-medium">${deal.currentPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Buyer</p>
                      <p className="font-medium">{deal.buyer?.name || 'Unknown'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Seller</p>
                      <p className="font-medium">{deal.seller?.name || 'Not assigned'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Messages</p>
                      <p className="font-medium">{deal.messages.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Documents</p>
                      <p className="font-medium">{deal.documents.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="chat" className="mt-6">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle>Chat with {otherUser?.name || 'Counterparty'}</CardTitle>
                  <CardDescription>
                    Discuss deal details and negotiate in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ChatInterface dealId={deal.id} messages={deal.messages} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deal Documents</CardTitle>
                  <CardDescription>
                    View and manage documents related to this deal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DocumentList documents={deal.documents} users={usersMap} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DealDetail;
