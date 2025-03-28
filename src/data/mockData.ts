
import { Deal, Message, User, Document, Notification, AnalyticsData } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Buyer',
    email: 'john@example.com',
    role: 'buyer',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'user2',
    name: 'Sarah Seller',
    email: 'sarah@example.com',
    role: 'seller',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 'user3',
    name: 'David Buyer',
    email: 'david@example.com',
    role: 'buyer',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 'user4',
    name: 'Emma Seller',
    email: 'emma@example.com',
    role: 'seller',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  }
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: 'doc1',
    name: 'Contract Agreement.pdf',
    type: 'application/pdf',
    size: 1024 * 1024 * 2.3, // 2.3MB
    uploadedBy: 'user1',
    dealId: 'deal1',
    url: '#',
    createdAt: new Date(2023, 5, 15).toISOString(),
    accessControl: ['user1', 'user2'],
  },
  {
    id: 'doc2',
    name: 'Financial Report.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 1024 * 1024 * 1.5, // 1.5MB
    uploadedBy: 'user2',
    dealId: 'deal1',
    url: '#',
    createdAt: new Date(2023, 5, 16).toISOString(),
    accessControl: ['user1', 'user2'],
  },
  {
    id: 'doc3',
    name: 'Product Specifications.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 1024 * 1024 * 0.8, // 0.8MB
    uploadedBy: 'user3',
    dealId: 'deal2',
    url: '#',
    createdAt: new Date(2023, 6, 5).toISOString(),
    accessControl: ['user3', 'user4'],
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg1',
    dealId: 'deal1',
    senderId: 'user1',
    content: 'Hello, I am interested in making a deal.',
    timestamp: new Date(2023, 5, 15, 10, 30).toISOString(),
    read: true,
    sender: mockUsers[0],
  },
  {
    id: 'msg2',
    dealId: 'deal1',
    senderId: 'user2',
    content: 'Great! Let me know your offer.',
    timestamp: new Date(2023, 5, 15, 10, 35).toISOString(),
    read: true,
    sender: mockUsers[1],
  },
  {
    id: 'msg3',
    dealId: 'deal1',
    senderId: 'user1',
    content: 'I think $45,000 is a fair price considering the market.',
    timestamp: new Date(2023, 5, 15, 10, 40).toISOString(),
    read: true,
    sender: mockUsers[0],
  },
  {
    id: 'msg4',
    dealId: 'deal1',
    senderId: 'user2',
    content: 'I was thinking more along the lines of $50,000.',
    timestamp: new Date(2023, 5, 15, 10, 45).toISOString(),
    read: false,
    sender: mockUsers[1],
  },
  {
    id: 'msg5',
    dealId: 'deal2',
    senderId: 'user3',
    content: 'Hi, I would like to discuss the software licensing deal.',
    timestamp: new Date(2023, 6, 5, 9, 0).toISOString(),
    read: true,
    sender: mockUsers[2],
  },
  {
    id: 'msg6',
    dealId: 'deal2',
    senderId: 'user4',
    content: 'Hello! Yes, I can offer you a good price for bulk licenses.',
    timestamp: new Date(2023, 6, 5, 9, 15).toISOString(),
    read: true,
    sender: mockUsers[3],
  },
];

// Mock Deals
export const mockDeals: Deal[] = [
  {
    id: 'deal1',
    title: 'Office Equipment Acquisition',
    description: 'Purchase of 20 high-end workstations for the new office space',
    initialPrice: 50000,
    currentPrice: 47500,
    status: 'in_progress',
    buyerId: 'user1',
    sellerId: 'user2',
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2023, 5, 16).toISOString(),
    documents: mockDocuments.filter(doc => doc.dealId === 'deal1'),
    messages: mockMessages.filter(msg => msg.dealId === 'deal1'),
    buyer: mockUsers.find(user => user.id === 'user1'),
    seller: mockUsers.find(user => user.id === 'user2'),
  },
  {
    id: 'deal2',
    title: 'Software Licensing Agreement',
    description: 'Enterprise license for design software for 50 users',
    initialPrice: 25000,
    currentPrice: 25000,
    status: 'pending',
    buyerId: 'user3',
    sellerId: 'user4',
    createdAt: new Date(2023, 6, 5).toISOString(),
    updatedAt: new Date(2023, 6, 5).toISOString(),
    documents: mockDocuments.filter(doc => doc.dealId === 'deal2'),
    messages: mockMessages.filter(msg => msg.dealId === 'deal2'),
    buyer: mockUsers.find(user => user.id === 'user3'),
    seller: mockUsers.find(user => user.id === 'user4'),
  },
  {
    id: 'deal3',
    title: 'Marketing Campaign Partnership',
    description: 'Joint marketing campaign for product launch',
    initialPrice: 35000,
    currentPrice: 32000,
    status: 'completed',
    buyerId: 'user1',
    sellerId: 'user4',
    createdAt: new Date(2023, 4, 10).toISOString(),
    updatedAt: new Date(2023, 4, 25).toISOString(),
    documents: [],
    messages: [],
    buyer: mockUsers.find(user => user.id === 'user1'),
    seller: mockUsers.find(user => user.id === 'user4'),
  },
  {
    id: 'deal4',
    title: 'Consulting Services Contract',
    description: 'IT infrastructure assessment and recommendations',
    initialPrice: 18000,
    currentPrice: 18000,
    status: 'cancelled',
    buyerId: 'user3',
    sellerId: 'user2',
    createdAt: new Date(2023, 3, 1).toISOString(),
    updatedAt: new Date(2023, 3, 15).toISOString(),
    documents: [],
    messages: [],
    buyer: mockUsers.find(user => user.id === 'user3'),
    seller: mockUsers.find(user => user.id === 'user2'),
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'user1',
    type: 'new_message',
    content: 'Sarah Seller sent you a message',
    dealId: 'deal1',
    read: false,
    createdAt: new Date(2023, 5, 15, 10, 45).toISOString(),
  },
  {
    id: 'notif2',
    userId: 'user2',
    type: 'deal_update',
    content: 'Deal "Office Equipment Acquisition" status changed to In Progress',
    dealId: 'deal1',
    read: true,
    createdAt: new Date(2023, 5, 16).toISOString(),
  },
  {
    id: 'notif3',
    userId: 'user3',
    type: 'document_upload',
    content: 'Emma Seller uploaded a new document',
    dealId: 'deal2',
    read: false,
    createdAt: new Date(2023, 6, 5).toISOString(),
  },
  {
    id: 'notif4',
    userId: 'user4',
    type: 'new_deal',
    content: 'David Buyer initiated a new deal "Software Licensing Agreement"',
    dealId: 'deal2',
    read: true,
    createdAt: new Date(2023, 6, 5).toISOString(),
  },
];

// Mock Analytics Data
export const mockAnalytics: AnalyticsData = {
  totalDeals: 4,
  completedDeals: 1,
  pendingDeals: 1,
  inProgressDeals: 1,
  cancelledDeals: 1,
  totalUsers: 4,
  buyersCount: 2,
  sellersCount: 2,
  messagesSent: 6,
  documentsUploaded: 3,
  monthlyDeals: [
    { month: 'Jan', count: 0 },
    { month: 'Feb', count: 0 },
    { month: 'Mar', count: 0 },
    { month: 'Apr', count: 1 },
    { month: 'May', count: 1 },
    { month: 'Jun', count: 2 },
    { month: 'Jul', count: 0 },
    { month: 'Aug', count: 0 },
    { month: 'Sep', count: 0 },
    { month: 'Oct', count: 0 },
    { month: 'Nov', count: 0 },
    { month: 'Dec', count: 0 },
  ],
};

export const getCurrentUser = (): User => {
  return mockUsers[0]; // For development, default to first user
};
