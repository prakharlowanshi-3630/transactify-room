
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types';
import ChatMessage from './ChatMessage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useDeal } from '@/contexts/DealContext';
import { useAuth } from '@/contexts/AuthContext';

interface ChatInterfaceProps {
  dealId: string;
  messages: Message[];
}

const TypingIndicator = () => (
  <div className="typing-indicator ml-10">
    <span></span>
    <span></span>
    <span></span>
  </div>
);

const ChatInterface = ({ dealId, messages }: ChatInterfaceProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useDeal();
  const { user } = useAuth();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Simulate typing indicator
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.senderId !== user?.id) {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [messages, user?.id]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user) {
      return;
    }
    
    try {
      await sendMessage(dealId, user.id, newMessage);
      setNewMessage('');
      
      // Simulate the other user typing
      setTimeout(() => {
        setIsTyping(true);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
