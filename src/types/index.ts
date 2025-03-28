
export type UserRole = 'buyer' | 'seller';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type DealStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Deal {
  id: string;
  title: string;
  description: string;
  initialPrice: number;
  currentPrice: number;
  status: DealStatus;
  buyerId: string;
  sellerId?: string;
  createdAt: string;
  updatedAt: string;
  documents: Document[];
  messages: Message[];
  buyer?: User;
  seller?: User;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: string;
  dealId: string;
  url: string;
  createdAt: string;
  accessControl: string[]; // Array of user IDs who can access this document
}

export interface Message {
  id: string;
  dealId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
  sender?: User;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'new_deal' | 'new_message' | 'deal_update' | 'document_upload';
  content: string;
  dealId?: string;
  read: boolean;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface DealFormData {
  title: string;
  description: string;
  initialPrice: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: UserRole;
}

export interface AnalyticsData {
  totalDeals: number;
  completedDeals: number;
  pendingDeals: number;
  inProgressDeals: number;
  cancelledDeals: number;
  totalUsers: number;
  buyersCount: number;
  sellersCount: number;
  messagesSent: number;
  documentsUploaded: number;
  monthlyDeals: {
    month: string;
    count: number;
  }[];
}
