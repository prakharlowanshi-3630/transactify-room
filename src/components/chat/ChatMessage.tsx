
import { Message } from '@/types';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { user } = useAuth();
  const isCurrentUser = message.senderId === user?.id;
  
  return (
    <div
      className={cn(
        "flex w-max max-w-[80%] mb-4",
        isCurrentUser ? "ml-auto" : "mr-auto"
      )}
    >
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={message.sender?.avatar} />
          <AvatarFallback>
            {message.sender?.name.substring(0, 2).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className="flex flex-col">
        <div
          className={cn(
            "rounded-lg px-4 py-2 text-sm",
            isCurrentUser
              ? "bg-dealBlue-light text-white"
              : "bg-muted"
          )}
        >
          {message.content}
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {format(new Date(message.timestamp), 'h:mm a')}
        </span>
      </div>
      
      {isCurrentUser && (
        <Avatar className="h-8 w-8 ml-2">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>
            {user?.name.substring(0, 2).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
