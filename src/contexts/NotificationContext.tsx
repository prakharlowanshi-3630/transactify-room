
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Notification, User } from '@/types';
import { mockNotifications } from '@/data/mockData';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  loading: boolean;
  error: string | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ 
  children, 
  currentUser 
}: { 
  children: ReactNode; 
  currentUser: User | null;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load notifications for current user
    if (currentUser) {
      try {
        const userNotifications = mockNotifications.filter(
          notification => notification.userId === currentUser.id
        );
        setNotifications(userNotifications);
        setLoading(false);
      } catch (err) {
        setError('Failed to load notifications');
        setLoading(false);
      }
    } else {
      setNotifications([]);
      setLoading(false);
    }
  }, [currentUser]);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAsRead = (notificationId: string): void => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
    
    // In a real app, this would also update the backend
    const index = mockNotifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      mockNotifications[index].read = true;
    }
  };

  const markAllAsRead = (): void => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    // In a real app, this would also update the backend
    mockNotifications.forEach(notification => {
      if (currentUser && notification.userId === currentUser.id) {
        notification.read = true;
      }
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        loading,
        error,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
