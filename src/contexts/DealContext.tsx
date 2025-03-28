
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Deal, DealStatus, DealFormData, User, Message, Document } from '@/types';
import { mockDeals, mockMessages, mockDocuments } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface DealContextType {
  deals: Deal[];
  userDeals: Deal[];
  dealById: (id: string) => Deal | undefined;
  createDeal: (data: DealFormData, userId: string) => Promise<Deal>;
  updateDealStatus: (dealId: string, status: DealStatus) => Promise<Deal>;
  updateDealPrice: (dealId: string, newPrice: number) => Promise<Deal>;
  sendMessage: (dealId: string, senderId: string, content: string) => Promise<Message>;
  uploadDocument: (dealId: string, file: File, uploaderId: string, accessControl: string[]) => Promise<Document>;
  loading: boolean;
  error: string | null;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export function DealProvider({ children, currentUser }: { children: ReactNode; currentUser: User | null }) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load deals
    try {
      setDeals(mockDeals);
      setLoading(false);
    } catch (err) {
      setError('Failed to load deals');
      setLoading(false);
    }
  }, []);

  const userDeals = currentUser 
    ? deals.filter(deal => 
        deal.buyerId === currentUser.id || deal.sellerId === currentUser.id
      )
    : [];

  const dealById = (id: string): Deal | undefined => {
    return deals.find(deal => deal.id === id);
  };

  const createDeal = async (data: DealFormData, userId: string): Promise<Deal> => {
    setLoading(true);
    
    try {
      // Generate a new deal ID
      const dealId = `deal${deals.length + 1}`;
      
      // Create new deal object
      const newDeal: Deal = {
        id: dealId,
        title: data.title,
        description: data.description,
        initialPrice: data.initialPrice,
        currentPrice: data.initialPrice,
        status: 'pending',
        buyerId: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        documents: [],
        messages: [],
      };
      
      // Add to deals state
      setDeals(prev => [...prev, newDeal]);
      
      setLoading(false);
      
      toast({
        title: "Deal created",
        description: "Your deal has been successfully created",
      });
      
      return newDeal;
    } catch (err) {
      setError('Failed to create deal');
      setLoading(false);
      
      toast({
        title: "Error creating deal",
        description: "There was a problem creating your deal",
        variant: "destructive",
      });
      
      throw err;
    }
  };

  const updateDealStatus = async (dealId: string, status: DealStatus): Promise<Deal> => {
    setLoading(true);
    
    try {
      // Find the deal to update
      const dealIndex = deals.findIndex(d => d.id === dealId);
      
      if (dealIndex === -1) {
        throw new Error('Deal not found');
      }
      
      // Create updated deal object
      const updatedDeal = {
        ...deals[dealIndex],
        status,
        updatedAt: new Date().toISOString(),
      };
      
      // Update deals state
      const updatedDeals = [...deals];
      updatedDeals[dealIndex] = updatedDeal;
      setDeals(updatedDeals);
      
      setLoading(false);
      
      toast({
        title: "Deal status updated",
        description: `The deal status has been changed to ${status.replace('_', ' ')}`,
      });
      
      return updatedDeal;
    } catch (err) {
      setError('Failed to update deal status');
      setLoading(false);
      
      toast({
        title: "Error updating deal",
        description: "There was a problem updating the deal status",
        variant: "destructive",
      });
      
      throw err;
    }
  };

  const updateDealPrice = async (dealId: string, newPrice: number): Promise<Deal> => {
    setLoading(true);
    
    try {
      // Find the deal to update
      const dealIndex = deals.findIndex(d => d.id === dealId);
      
      if (dealIndex === -1) {
        throw new Error('Deal not found');
      }
      
      // Create updated deal object
      const updatedDeal = {
        ...deals[dealIndex],
        currentPrice: newPrice,
        updatedAt: new Date().toISOString(),
      };
      
      // Update deals state
      const updatedDeals = [...deals];
      updatedDeals[dealIndex] = updatedDeal;
      setDeals(updatedDeals);
      
      setLoading(false);
      
      toast({
        title: "Price updated",
        description: `The deal price has been updated to $${newPrice.toLocaleString()}`,
      });
      
      return updatedDeal;
    } catch (err) {
      setError('Failed to update deal price');
      setLoading(false);
      
      toast({
        title: "Error updating price",
        description: "There was a problem updating the deal price",
        variant: "destructive",
      });
      
      throw err;
    }
  };

  const sendMessage = async (dealId: string, senderId: string, content: string): Promise<Message> => {
    setLoading(true);
    
    try {
      // Generate message ID
      const messageId = `msg${mockMessages.length + 1}`;
      
      // Create new message
      const newMessage: Message = {
        id: messageId,
        dealId,
        senderId,
        content,
        timestamp: new Date().toISOString(),
        read: false,
      };
      
      // Add to messages (in a real app, this would be handled by the backend)
      mockMessages.push(newMessage);
      
      // Update the deal's messages
      const dealIndex = deals.findIndex(d => d.id === dealId);
      
      if (dealIndex === -1) {
        throw new Error('Deal not found');
      }
      
      const updatedDeal = {
        ...deals[dealIndex],
        messages: [...deals[dealIndex].messages, newMessage],
        updatedAt: new Date().toISOString(),
      };
      
      const updatedDeals = [...deals];
      updatedDeals[dealIndex] = updatedDeal;
      setDeals(updatedDeals);
      
      setLoading(false);
      
      return newMessage;
    } catch (err) {
      setError('Failed to send message');
      setLoading(false);
      
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message",
        variant: "destructive",
      });
      
      throw err;
    }
  };

  const uploadDocument = async (
    dealId: string, 
    file: File, 
    uploaderId: string, 
    accessControl: string[]
  ): Promise<Document> => {
    setLoading(true);
    
    try {
      // Generate document ID
      const documentId = `doc${mockDocuments.length + 1}`;
      
      // Create new document (in a real app, this would involve file upload to cloud storage)
      const newDocument: Document = {
        id: documentId,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedBy: uploaderId,
        dealId,
        url: URL.createObjectURL(file), // In a real app, this would be a cloud storage URL
        createdAt: new Date().toISOString(),
        accessControl,
      };
      
      // Add to documents (in a real app, this would be handled by the backend)
      mockDocuments.push(newDocument);
      
      // Update the deal's documents
      const dealIndex = deals.findIndex(d => d.id === dealId);
      
      if (dealIndex === -1) {
        throw new Error('Deal not found');
      }
      
      const updatedDeal = {
        ...deals[dealIndex],
        documents: [...deals[dealIndex].documents, newDocument],
        updatedAt: new Date().toISOString(),
      };
      
      const updatedDeals = [...deals];
      updatedDeals[dealIndex] = updatedDeal;
      setDeals(updatedDeals);
      
      setLoading(false);
      
      toast({
        title: "Document uploaded",
        description: `${file.name} has been successfully uploaded`,
      });
      
      return newDocument;
    } catch (err) {
      setError('Failed to upload document');
      setLoading(false);
      
      toast({
        title: "Error uploading document",
        description: "There was a problem uploading your document",
        variant: "destructive",
      });
      
      throw err;
    }
  };

  return (
    <DealContext.Provider
      value={{
        deals,
        userDeals,
        dealById,
        createDeal,
        updateDealStatus,
        updateDealPrice,
        sendMessage,
        uploadDocument,
        loading,
        error,
      }}
    >
      {children}
    </DealContext.Provider>
  );
}

export function useDeal() {
  const context = useContext(DealContext);
  if (context === undefined) {
    throw new Error('useDeal must be used within a DealProvider');
  }
  return context;
}
