
import { useNotification } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { MessageSquare, Bell, RefreshCw, File } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'new_message':
      return <MessageSquare className="h-4 w-4" />;
    case 'new_deal':
      return <Bell className="h-4 w-4" />;
    case 'deal_update':
      return <RefreshCw className="h-4 w-4" />;
    case 'document_upload':
      return <File className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const NotificationsList = () => {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotification();

  if (notifications.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-muted-foreground">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Notifications</h3>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>
      <div className="space-y-2 max-h-[70vh] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border ${
              notification.read ? 'bg-card' : 'bg-accent/30'
            }`}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                <div className="bg-dealBlue-light bg-opacity-20 p-2 rounded-full text-dealBlue-light">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium">{notification.content}</p>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="h-6 px-2 text-xs"
                    >
                      Mark read
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(new Date(notification.createdAt), 'MMM d, h:mm a')}
                </p>
                {notification.dealId && (
                  <Link
                    to={`/deals/${notification.dealId}`}
                    className="text-xs text-dealBlue-light hover:underline inline-block mt-2"
                  >
                    View deal
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;
